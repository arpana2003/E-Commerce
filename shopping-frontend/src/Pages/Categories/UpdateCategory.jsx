import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../Redux/Slices/CategorySlice.js";
import { toast } from "react-hot-toast";

function UpdateCategory() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category_id = state?._id;

  const [categoryInput, setCategoryInput] = useState({
    title: category?.title || "",
    thumbnail: null,                        // Raw File
    previewImage: category?.thumbnail?.secure_url || "", // Preview URL
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setCategoryInput({
        ...categoryInput,
        previewImage: reader.result,
        thumbnail: file,
    })});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, thumbnail } = categoryInput;

    if (!title || !thumbnail) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);

    const res = await dispatch(updateCategory({ category_id, formData }));

    if (res?.payload?.success) {
      navigate("/categories");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Update Category</h2>

        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={categoryInput.title}
          onChange={(e) =>
            setCategoryInput({ ...categoryInput, title: e.target.value })
          }
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />

        <label className="block text-sm font-medium mb-1">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-4"
        />

        {categoryInput.previewImage && (
          <img
            src={categoryInput.previewImage}
            alt="Preview"
            className="w-full h-40 object-cover rounded mb-4"
          />
        )}

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded"
        >
          Update Category
        </button>
      </form>
    </div>
  );
}

export default UpdateCategory;
