import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/Login.jsx";
import Layout2 from "./Layouts/Layout2.jsx";
import SignUp from "./Pages/SignUp.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Profile from "./Pages/User/Profile.jsx";
import RequireAuth from "./Components/Auth/RequireAuth.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";
import Orders from "./Pages/User/Orders.jsx";
import Wishlist from "./Pages/User/WishList.jsx";
import ItemList from "./Pages/Categories/ItemList.jsx";
import UpdateCategory from "./Pages/Categories/UpdateCategory.jsx";
import CreateCategory from "./Pages/Categories/CreateCategory.jsx";
import CreateItem from "./Pages/Categories/CreateItem.jsx";
import NotFound from "./Pages/NotFound.jsx";
import CategoryList from "./Pages/Categories/CategoryList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/items/" element={< ItemList/>} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
        <Route path="/category/create" element={<CreateCategory />} />
        <Route path="/category/item/create" element={<CreateItem />} />
        {/* <Route path="/admin/dashboard" element={} /> */}
        {/* <Route path=" " element={} /> */}
      </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wish" element={<Wishlist />} />
          <Route path="/category/update" element={<UpdateCategory/>} />
        </Route>

        <Route path="*" element={<NotFound />} />


      </Routes>
    </>
  );
}

export default App;
