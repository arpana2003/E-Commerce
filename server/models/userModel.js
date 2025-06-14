import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      minLength: [5, "Name must be at least 5 characters long"],
      maxLength: [50, "Name should be less than 50 characters"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    address:{
      type: String,
    },
    gender:{
      type: String,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
      id: { type: String, default: null },
      status: { type: String, default: "inactive" },
    },
    wishlistItems: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        itemName: {
          type: String,
          required: true,
        },
        cost: {
          type: Number,
          required: true,
        },
        itemImage: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
        createdBy: {
          type: String,
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        }
      }],
    orders: [
      {
        itemId: String,
        itemName: String,
        itemImage: {
          public_id: String,
          secure_url: String,
        },
        quantity: Number,
        price: Number,
        status: { type: String, enum: ["paid", "ordered"], default: "paid" },
        paymentDate: Date,
        createdBy: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Methods for the User schema
userSchema.methods = {
  // Generate JWT Token
  generateJWTToken: function () {
    console.log(process.env.JWT_SECRET);

    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
  // Compare password with hashed password
  comparePassword: async function (plainTextPassword) {
    try {
      return await bcrypt.compare(plainTextPassword, this.password);
    } catch (err) {
      throw new Error("Error comparing passwords");
    }
  },
  //ResetToken for password
  generatePasswordResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now
  },
};

const User = model("User", userSchema);

export default User;
