import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCategory } from "../Redux/Slices/CategorySlice";
import { getCategory } from "../Redux/Slices/CategorySlice.js";

function CategoryCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => state?.auth?.data?.role);

  async function handleDelete(e){
    e.preventDefault(); 
    await dispatch(removeCategory(data._id));
    await dispatch(getCategory());
  };

  return (
    <div
      onClick={() => navigate("/category/items", { state: { ...data } })}
      className="w-[22rem] h-[420px] bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-xl transition-all duration-300"
    >
      <img
        src={data?.thumbnail?.secure_url}
        alt="Category Thumbnail"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-purple-700 line-clamp-1">
          {data?.Category}
        </h2>
        <p className="text-gray-700 text-sm line-clamp-3">
          {data?.description}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-purple-600">Items:</span>{" "}
          {data?.items?.length}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-purple-600">Created By:</span>{" "}
          {data?.items?.[0]?.createdBy}
        </p>

        {role === "ADMIN" && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-between px-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
          >
            Remove Category
          </button>
          <button
            onClick={()=>{navigate("/category/item/create", { state: { ...data } })}}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md"
          >
            Create Item
          </button>
          <button
            onClick={()=>{navigate("/category/update", { state: { ...data } })}}
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded-md"
          >
            Update Category
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default CategoryCard;
