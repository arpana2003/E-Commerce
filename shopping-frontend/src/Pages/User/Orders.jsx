import { useNavigate } from "react-router-dom";
import Layout2 from "../../Layouts/Layout2";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function Orders() {
    const orders = useSelector((state) => state?.auth?.data?.orders || []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

   async function handleCancel(data) {
        //await dispatch(getOrders(data));
        await dispatch(getUserData());
    }

  return (
    <Layout2>
      <div className="min-h-[70vh] p-4 bg-pink-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Your Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {orders.map((order, index) => (
              <div
                key={index}
                className="w-80 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  src={order?.itemImage?.secure_url}
                  alt={order?.itemName}
                  className="w-40 h-40 object-cover rounded-md"
                />

                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {order?.itemName}
                </h3>
                <p className="text-gray-600">Quantity: {order?.quantity}</p>
                <p className="text-gray-600">Price: ₹{order?.price}</p>
                <p
                  className={`text-sm font-semibold mt-1 ${
                    order?.status === "paid"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  Status: {order?.status}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Payment Date: {order?.paymentDate}
                </p>

                <button
                  onClick={() => handleCancel(order.itemId)}
                  className="mt-4 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                >
                  Cancel Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout2>
  );
}

export default Orders;
