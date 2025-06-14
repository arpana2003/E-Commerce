import AppError from "../middlewares/errorMiddleware.js";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import { razorpay } from "../server.js";

export const RazorpayKey = async (req, res, next) => {
  try {
    const key = process.env.RAZORPAY_KEY_ID;

    res.status(200).json({
      message: "Razorpaykey accessed successfully",
      success: true,
      key,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const createOrder = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("Unauthorized, please login"));
  }
  if (user.role === "ADMIN") {
    return next(new AppError("Admin cannot purchase a subscription", 400));
  }

  try {
    const subscription = await razorpay.subscriptions.create({
      plain_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOrder = async (req, res, next) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      itemId
    } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);
    const item = await Item.findById(itemId);

    if (!user) {
      return next(new AppError("Unauthorized, please login", 500));
    }
    if (!item) {
      return next(new AppError("Item with given Id do not exist", 500));
    }

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(
        new AppError("Payment not verified, please try again later", 500)
      );
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";
    user.orders.push({
        itemId: item._id,
        itemName: item.title,
        quantity:1,
        price:item.cost,
        status:"paid",
        paymentDate: new Date(),
        createdBy: item.createdBy,
    });
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const  cancelOrder= async (req,res,next) =>{
    try {
        const { id } = req.user;
        const {itemId} = req.body;
        const user = await User.findById(id);
    
        if (!user) {
          return next(new AppError("Unauthorized, please login", 500));
        }
    
        if (user.role === "ADMIN") {
          return next(new AppError("Admin cannot purchase a subscription", 400));
        }
    
        const subscriptionId = user.subscription.id;
    
        const subscription = razorpay.subscriptions.cancel(subscriptionId);
    
        user.subscription.status = subscription.status;
        user.orders = user.orders.filter(order => order.itemId.toString() !== itemId);
    
        await user.save();
      } catch (e) {
        return next(new AppError(e.message, 500));
      }
}

export const allPayments = async (req, res, next) => {
    try {
      const { count } = req.query;
  
      const subscriptions = await razorpay.subscriptions.all({
        count: count || 10,
      });
  
      res.status(200).json({
        success: true,
        message: "All payments",
        subscriptions,
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
};
