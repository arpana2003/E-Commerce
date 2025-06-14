import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import Layout2 from "../../Layouts/Layout2";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { removeFromWishlist } from "../../Redux/Slices/CategorySlice";
import toast from "react-hot-toast";

function Wishlist() {
  const wishlist = useSelector((state) => state?.auth?.data?.wishlist || []);
  const dispatch = useDispatch();

  async function handleRemoveFromWishlist(itemId) {
    try {
      await dispatch(removeFromWishlist(itemId));
      await dispatch(getUserData());
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  }
  
  return (
    <Layout2>
      <div className="min-h-[70vh] p-4 bg-pink-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Your Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">No items in your wishlist.</p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {wishlist.map((item, index) => (
              <div
                key={item._id}
                className="w-80 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  src={item?.itemImage?.secure_url}
                  alt={item?.itemName}
                  className="w-40 h-40 object-cover rounded-md"
                />

                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {item?.itemName}
                </h3>
                <p className="text-gray-600">Price: ₹{item?.price}</p>

                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="mt-4 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                >
                  Remove from Wishlist
                </button>

                <FaHeart
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="text-red-500 mt-2 cursor-pointer"
                  size={30}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout2>
  );
}

export default Wishlist;
