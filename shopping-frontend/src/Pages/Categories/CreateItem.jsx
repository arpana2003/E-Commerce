import { useState } from "react";
import { useDispatch } from "react-redux";
import { createItem } from "../../Redux/Slices/CategorySlice.js";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";

function CreateItem() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const categoryId = state?._id;

  const [itemInput, setItemInput] = useState({
    title: "",
    description: "",
    cost: "",
    createdBy: "",
    itemImage: "",
    previewImage: "",
  });

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", async () => {
        setItemInput({
          ...itemInput,
          previewImage: reader.result,
          itemImage: file,     
        });
      });
    
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setItemInput({
      ...itemInput,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!categoryId) {
      toast.error("Category ID not found.");
      return;
    }

    const itemData = new FormData();
    itemData.append("title", itemInput.title);
    itemData.append("description", itemInput.description);
    itemData.append("cost", itemInput.cost);
    itemData.append("createdBy", itemInput.createdBy);
    itemData.append("itemImage", itemInput.itemImage);

    await dispatch(createItem([categoryId,itemData]));
    // Navigate("/")

    setItemInput({
      title: "",
      description: "",
      cost: "",
      createdBy: "",
      itemImage: "",
      previewImage: "",
    });
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center pt-10">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] md:w-[60%] bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
          <h1 className="text-2xl font-bold text-center text-purple-700">Create New Item</h1>

          <input
            type="text"
            name="title"
            placeholder="Item Title"
            value={itemInput.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Item Description"
            value={itemInput.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="number"
            name="cost"
            placeholder="Cost (in ₹)"
            value={itemInput.cost}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="createdBy"
            placeholder="Created By"
            value={itemInput.createdBy}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
            required
          />

          {itemInput.previewImage && (
            <img
              src={itemInput.previewImage}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-md mx-auto"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded"
          >
            Create Item
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateItem;
