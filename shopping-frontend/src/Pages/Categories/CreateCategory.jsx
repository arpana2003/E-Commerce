import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../Redux/Slices/CategorySlice";
import HomeLayout from "../../Layouts/HomeLayout";

function CreateCategory() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({
        ...formData,
        thumbnail: file,
        previewImage: reader.result,
      });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.category) {
      return alert("Category name is required.");
    }
  
    if (!formData.thumbnail) {
      return alert("Thumbnail is required.");
    }
  
    const data = new FormData();
    data.append("Category", formData.category);
    data.append("description", formData.description);
    data.append("thumbnail", formData.thumbnail);
  
    await dispatch(createCategory(data));
  
    setFormData({
      category: "",
      description: "",
      thumbnail: null,
      previewImage: "",
    });
  };
  

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center text-white px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Create New Category</h2>

          <div>
            <label className="block mb-1 font-semibold">Category Name</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter short description"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-2 py-1 bg-gray-700 text-white"
              required
            />
          </div>

          {formData.previewImage && (
            <img
              src={formData.previewImage}
              alt="preview"
              className="w-32 h-32 object-cover rounded-md mx-auto mt-2"
            />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded transition"
          >
            Create Category
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCategory;
