import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import { BsPerson } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  async function handleLogout(e){
    e.preventDefault();
    await dispatch(logout());
    navigate("/");
  }

  return (
    <div className="bg-white">
      <div className=" flex flex-col ">
        <div className=" p-2 bg-black text-gray-400 justify-end ">
          <ul className="flex p-2 justify-end items-center gap-10 ">
           {isLoggedIn && <li className="hover:text-blue-400 hover:cursor-pointer">
              <Link to="/user/profile">MY ACCOUNT</Link>
            </li> }
            {isLoggedIn && <li className="hover:text-blue-400 hover:cursor-pointer">
              <Link to="/wish">WISHLIST</Link>
            </li>}
            {isLoggedIn && <li className="hover:text-blue-400 hover:cursor-pointer">
              <Link to="/orders">SHOPPING CART</Link>
            </li> }
            <li className="hover:text-blue-400 hover:cursor-pointer">
              <Link to="/checkout">CHECKOUT</Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-between items-center bg-black mt-0.5 p-5">
          <div className="text-center">
            <div className="text-center">
              <div className="text-center">
                <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-transparent bg-clip-text tracking-wide">
                  Kanha <span className="text-transparent">STORE</span>
                </h1>
                <p className="text-sm font-devanagari text-pink-600 italic ml-16">
                  राधारमण
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-start gap-8 px-36">
            <input
              type="text"
              className="bg-gray-100 px-14 py-2 rounded-lg text-pink-500 items-center justify-center"
              placeholder="Search"
            />
            <ul className="flex items-center gap-8">
              {isLoggedIn && (
                <li className="relative">
                  <details className="group">
                    <summary className="flex items-center cursor-pointer">
                      <BsPerson className="text-2xl text-pink-500 hover:text-white transition-all duration-300 ease-in-out" />
                    </summary>
                    <ul className="absolute bg-white shadow-lg rounded-md mt-2 right-0 w-48 p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <li>
                        <Link
                          to="/orders"
                          className="block py-2 px-4 hover:bg-gray-100"
                        >
                          Your Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/buy-again"
                          className="block py-2 px-4 hover:bg-gray-100"
                        >
                          Buy Again
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/user/profile"
                          className="block py-2 px-4 hover:bg-gray-100"
                        >
                          Your Account
                        </Link>
                      </li>
                      {role==="ADMIN" && <li>
                        <Link
                          to="/admin/dashboard"
                          className="block py-2 px-4 hover:bg-gray-100"
                        >
                          Admin Dashboard
                        </Link>
                      </li>}
                      {role==="ADMIN" && <li>
                        <Link
                          to="/category/create"
                          className="block py-2 px-4 hover:bg-gray-100"
                        >
                          Create Category
                        </Link>
                      </li>}
                      <li>
                        <Link
                          to="/wish"
                          className="block py-2 px-4 hover:bg-gray-100"
                        >
                          Your Lists
                        </Link>
                      </li>
                      <li onClick={()=>{handleLogout}} className="block py-2 px-4 hover:bg-gray-100">
                          Logout
                      </li>
                    </ul>
                  </details>
                </li>
              )}

              {!isLoggedIn && (
                <>
                  <li className="text-pink-500 hover:text-white transition-all duration-300 ease-in-out">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="text-pink-500 hover:text-white transition-all duration-300 ease-in-out">
                    <Link to="/signup">SignUp</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="flex bg-white justify-around ">
          <ul className="bg-pink-500 px-10 py-4">
            <li className="relative">
              <details className="group">
                <summary className="flex items-center cursor-pointer gap-6">
                  <h1 className="font-bold text-white">CATEGORIES</h1>
                  <FontAwesomeIcon
                    icon={faBars}
                    className="text-2xl text-white cursor-pointer"
                  />
                </summary>
                <ul className="absolute left-0 mt-2 w-60 bg-gray-400 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 text-white"
                    >
                      MEN'S CLOTHING
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 text-white"
                    >
                      WOMEN'S CLOTHING
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 text-white"
                    >
                      KID'S CLOTHING
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 text-white"
                    >
                      ACCESSORIES
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 text-white"
                    >
                      SHOES
                    </Link>
                  </li>
                  <li className="bg-gray-600">
                    <Link
                      to="/categories"
                      className="block px-4 py-6 text-s text-pink-500 hover:bg-gray-100"
                    >
                      ALL PRODUCTS
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          <div>
            <ul className="menu menu-horizontal gap-6 font-bold">
              <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                <Link to="/contact">CONTACT</Link>
              </li>
              <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                <Link to="/about">ABOUT</Link>
              </li>
              <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                <Link to="/guide">HOW TO ORDER</Link>
              </li>
              <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                <Link to="/location">STORE LOCATION</Link>
              </li>
            </ul>
          </div>

          <div className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faPhoneVolume}
              className="text-pink-500 text-xl px-4"
            />
            <h3 className="font-bold">Call Us : </h3>
            <span className="text-pink-500 font-semibold">+91 2222222222</span>
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
