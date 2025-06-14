import { Link } from "react-router-dom";
import Layout2 from "../Layouts/Layout2";
import { BsPersonCircle } from "react-icons/bs";
import LoginImage from "../assets/Images/Login.jpg"
import { useState } from "react";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import { createAccount } from "../Redux/Slices/AuthSlice.js";
function SignUp() {

  const [values , setValues] = useState({
    fullName: "",
    email: "",
    password:"" ,
    avatar: "",
  })

  const [previewImage, setPreviewImage] = useState();

  function handleInput(e){
    const [name, value]= e.target;
    setValues({...values, [name]:value});
  }

  function handleImage(e){
    e.preventDefault();
    const uploadImage= e.target.files[0];
    if(uploadImage){
      setValues({...values, avatar:uploadImage});

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function(){
        setPreviewImage(this.result);
      });

    }
  }

  async function handleSignup(event){
    event.preventDefault();
    if(!values.fullName || !values.email || !values.password || !values.avatar){
      toast.error("Please fill all the details");
      return;
    }

    if(values.fullName.length < 5){
      toast.error("Name should be at least 5 characters");
      return;
    }

    if (!isEmail(signupData.email)) {
      toast.error("Invalid format of email");
      return;
    }

    if (!isValidPassword(signupData.password)) {
      toast.error("Invalid format of password");
      return;
    }

    const formData= new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("avatar", values.avatar);

    try{
      const response = await dispatchEvent(createAccount(formData));

      if(response.meta.requestStatus === 'fulfilled'){
        Navigate('/');
      }else{
        toast.error("Failed to create account");
      }
    }catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }

    setValues({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");

  }
  
  return (
    <Layout2>
      <div className="flex overflow-x-auto items-center justify-center h-[70vh] bg-center bg-cover " style={{ backgroundImage: `url(${LoginImage}` }}>
        <form noValidate onSubmit={handleSignup} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 h-[70vh]">
          <h1 className="text-center text-2xl font-bold">REGISTRATION PAGE</h1>

          <label className="cursor-pointer" htmlFor="image">{previewImage ? (<img className="w-24 h-24 rounded-full m-auto"/>):(<BsPersonCircle className="w-24 h-24 rounded-full m-auto" />)}
          </label>
          <input onChange={handleImage} type="file" name="image" id="image" className="hidden" accept=".jpg, .jpeg , .png , .svg" />

          <label htmlFor="fullName" className="font-semibold">FullName</label>
          <input type="text" name="fullName" id="fullName" onChange={handleInput} value={values.fullName} placeholder="Enter your name...." className="bg-transparent px-2 py-1 border border-purple-600" />

          <label htmlFor="email" className="font-semibold">Email</label>
          <input type="text" name="email" id="email" onChange={handleInput} value={values.email} placeholder="Enter your email.." className="bg-transparent px-2 py-1 border border-purple-600"/>

          <label htmlFor="password" className="font-semibold">Password</label>
          <input type="text" name="password" id="password" onChange={handleInput} value={values.password} className="bg-transparent px-2 py-1 border border-purple-600" />

          <div className="justify-center items-center text-center">
            <button type="submit" className="bg-pink-600 hover:bg-pink-500 transition-all ease-out duration-300 rounded-lg p-2 font-semibold text-lg cursor-pointer m-2 ">Create Account</button>
            <p className="text-center">Account already created?{" "}<Link className="link text-accent cursor-pointer" to="/login">Login</Link> </p>
            
          </div>
        </form>
      </div>
    </Layout2>
  );
}

export default SignUp;
