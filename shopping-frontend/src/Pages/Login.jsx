import { Link, useNavigate } from "react-router-dom";
import Layout2 from "../Layouts/Layout2.jsx";
import LoginImage from "../assets/Images/Login.jpg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice.js";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    address: "",  // Added state for address
    gender: "",   // Added state for gender
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInput(e) {
    const { name, value } = e.target;  // Corrected destructuring
    setValues({ ...values, [name]: value });
  }

  async function handleLogin(event) {
    event.preventDefault();

    // Add validation for address and gender
    if (!values.email || !values.password || !values.address || !values.gender) {
      toast.error("Please fill all the details");
      return;
    }

    await dispatch(login(values));

    // Assuming the response is correct (this logic may change based on your API response)
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/");
    }

    setValues({
      email: "",
      password: "",
      address: "",
      gender: "",
    });
  }

  return (
    <Layout2>
      <div
        className="flex overflow-x-auto items-center justify-center h-[70vh] bg-center bg-cover"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <form onSubmit={handleLogin} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 h-[70vh]">
          <h1 className="text-center text-2xl font-bold">LOGIN PAGE</h1>

          <label htmlFor="email" className="font-semibold">Email</label>
          <input 
            onChange={handleInput}
            className="bg-transparent px-2 py-1 border border-purple-600"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email" 
            value={values.email}
            required
          />

          <label htmlFor="password" className="font-semibold">Password</label>
          <input 
            onChange={handleInput}
            type="password"
            name="password"
            id="password" 
            value={values.password}
            className="bg-transparent px-2 py-1 border border-purple-600"
            required
          />

          <label htmlFor="address" className="font-semibold">Address</label>
          <input 
            onChange={handleInput}
            type="text"
            name="address"
            id="address" 
            value={values.address}
            className="bg-transparent px-2 py-1 border border-purple-600"
            required
          />

          <label htmlFor="gender" className="font-semibold">Gender</label>
          <select 
            onChange={handleInput}
            name="gender"
            id="gender" 
            value={values.gender}
            className="bg-transparent px-2 py-1 border border-purple-600"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <div className="justify-center items-center text-center">
            <button 
              className="bg-pink-600 hover:bg-pink-500 transition-all ease-out duration-300 rounded-lg px-4 py-2 font-semibold text-lg cursor-pointer m-2"
              type="submit"
            >
              Login
            </button>

            <p className="text-center">
              Don't have an account?{" "}
              <Link className="link text-accent cursor-pointer" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout2>
  );
}

export default Login;
