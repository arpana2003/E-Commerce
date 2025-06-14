import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    // console.log(name, value);
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid Email");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (e) {
      toast.error("Operation failed to send Email");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[71vh] bg-slate-100">
        <form onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-pink-400 shadow-[0_0_10px_black] w-[22rem] bg-pink-100"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input onChange={handleInputChange}
              value={userInput.name}
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              name="name"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input onChange={handleInputChange}
              value={userInput.email}
              type="email"
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea onChange={handleInputChange}
              value={userInput.message}
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              name="message"
              id="message"
              placeholder="Enter your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-400 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
