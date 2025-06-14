import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, removeFromWishlist } from "../Redux/Slices/CategorySlice";
import { addtoWishlist } from "../Redux/Slices/CategorySlice.js";
import { removeItemfromCategory } from "../Redux/Slices/CategorySlice"; 

function ItemCard({ item, categoryId }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.auth.data?.wishlist || []);
  const role = useSelector((state) => state.auth.data?.role);

  const isWishlisted = wishlist?.some((wish) => wish.itemId === item._id);

  async function handleWishlistClick() {
    if (isWishlisted) {
      await dispatch(removeFromWishlist(item._id));
    } else {
      await dispatch(addtoWishlist(item));
    }
  }

  async function handleRemoveItem(e) {
    e.preventDefault();
    await dispatch(removeItemfromCategory([categoryId, item._id]));
    await dispatch(getCategory());
  }

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center text-black relative group">
      <FaHeart
        className={`absolute top-3 right-3 text-2xl cursor-pointer transition ${
          isWishlisted ? "text-red-500" : "text-gray-400"
        }`}
        onClick={handleWishlistClick}
      />

      <img
        src={item?.itemImage?.secure_url}
        alt={item?.title}
        className="w-40 h-40 object-cover rounded-md"
      />

      <h3 className="mt-4 text-xl font-semibold text-gray-800 line-clamp-1">
        {item?.title}
      </h3>
      <p className="text-gray-600 line-clamp-2 text-sm">{item?.description}</p>
      <p className="text-purple-700 font-semibold mt-2">₹{item?.cost}</p>
      <p className="text-sm text-gray-500">By: {item?.createdBy}</p>

      {role === "ADMIN" && (
        <button
          onClick={handleRemoveItem}
          className="absolute bottom-3 right-3 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all"
        >
          Remove Item
        </button>
      )}
    </div>
  );
}

export default ItemCard;
