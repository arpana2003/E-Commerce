import { useDispatch, useSelector } from "react-redux";
import Layout2 from "../../Layouts/Layout2.jsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
  const user = useSelector((state) => state?.auth?.data);

  return (
    <Layout2>
      <div className="h-[70vh] bg-slate-300 p-4 flex items-center justify-center ">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-[0px_0px_10px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center text-center">
            <img
              src={user?.avatar?.secure_url}
              alt="#"
              className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-black text-4xl font-bold mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.fullName}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            <p className="text-sm mt-1 text-purple-600 font-semibold">
              {user?.role}
            </p>
            {user?.address && (
              <p className="text-sm mt-2 text-gray-600">
                <strong>Address:</strong> {user?.address}
              </p>
            )}
            {user?.gender && (
              <p className="text-sm mt-1 text-gray-600">
                <strong>Gender:</strong> {user?.gender}
              </p>
            )}
            <div className="mt-6 w-full space-y-2 flex flex-col">
              <Link to="/user/editprofile" className="w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition">
                <button>Edit Profile</button>
              </Link>
              <Link to="/changepassword" className="w-full py-2 rounded-lg bg-pink-400 hover:bg-pink-500 text-white font-semibold transition">
                <button>Change Password</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
}

export default Profile;
