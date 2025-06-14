import { BsPersonCircle } from "react-icons/bs";
import Layout2 from "../../Layouts/Layout2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserData, updateprofile } from "../../Redux/Slices/AuthSlice";
import { toast } from "react-hot-toast";

function EditProfile() {
  const [inputData, setInputData] = useState({
    previewImage: "",
    fullName: "",
    avatar: "",
    address: "",
    gender: "",
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInput(e) {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  }

  function handleImage(e) {
    e.preventDefault();

    const uploadImage = e.target.files[0];

    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", async () => {
        setInputData({
          ...inputData,
          previewImage: fileReader.result,
          avatar: uploadImage,
        });
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (!inputData.fullName || !inputData.avatar || !inputData.address || !inputData.gender) {
      toast.error("All fields are mandatory");
      return;
    }
    if (inputData.fullName.length < 5) {
      toast.error("Name cannot be less than 5 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", inputData.fullName);
    formData.append("avatar", inputData.avatar);
    formData.append("address", inputData.address);
    formData.append("gender", inputData.gender);

    try {
      await dispatch(updateprofile([inputData.userId, formData]));
      await dispatch(getUserData());
      navigate("/user/profile");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  }

  return (
    <Layout2>
      <div className="h-[70vh] flex items-center justify-center p-4 bg-slate-200">
        <form
          noValidate
          onSubmit={handleUpdate}
          className="bg-white rounded-2xl p-6 w-full max-w-md space-y-6 shadow-[0px_0px_10px_rgba(0,0,0,0.5)]"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Edit Profile
          </h1>

          <div className="flex justify-center">
            <label
              htmlFor="image"
              className="cursor-pointer text-purple-500 hover:text-purple-700"
            >
              {inputData.previewImage ? (
                <img
                  className="w-28 h-28 rounded-full m-auto"
                  src={inputData.previewImage}
                  alt="Avatar Preview"
                />
              ) : (
                <BsPersonCircle size={80} />
              )}
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-600 font-semibold mb-1"
            >
              Full Name
            </label>
            <input
              onChange={handleInput}
              value={inputData.fullName}
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-gray-600 font-semibold mb-1"
            >
              Address
            </label>
            <input
              onChange={handleInput}
              value={inputData.address}
              type="text"
              name="address"
              id="address"
              placeholder="Enter your address"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-gray-600 font-semibold mb-1"
            >
              Gender
            </label>
            <select
              onChange={handleInput}
              value={inputData.gender}
              name="gender"
              id="gender"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md font-semibold transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </Layout2>
  );
}

export default EditProfile;
