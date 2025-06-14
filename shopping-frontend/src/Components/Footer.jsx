import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const currentDate= new Date();
const year= currentDate.getFullYear();

const Footer = () => {
    return (
      <div class="bg-black text-white p-8">
          <div class="flex flex-row gap-8">
              <div class="flex flex-col space-y-8 w-1/4">
                  <div>
                      <h4 class="text-lg font-bold mb-4">Categories</h4>
                      <ul class="space-y-2 text-gray-400">
                          <li><a href="#" class="hover:text-white">Women</a></li>
                          <li><a href="#" class="hover:text-white">Men</a></li>
                          <li><a href="#" class="hover:text-white">Children</a></li>
                          <li><a href="#" class="hover:text-white">Accessories</a></li>
                      </ul>
                  </div>
              </div>
  
              <div class="flex flex-col space-y-8 w-1/4">
                  <div>
                      <h4 class="text-lg font-bold mb-4">Help</h4>
                      <ul class="space-y-2 text-gray-400">
                          <li><a href="#" class="hover:text-white">Track Order</a></li>
                          <li><a href="#" class="hover:text-white">Return</a></li>
                          <li><a href="#" class="hover:text-white">Shipping</a></li>
                          <li><a href="#" class="hover:text-white">FAQ'S</a></li>
                      </ul>
                  </div>
              </div>
  
              <div class="flex flex-col space-y-8 w-1/4">
                  <div>
                      <h4 class="text-lg font-bold mb-4">Get In Touch</h4>
                      <p class="text-gray-400 mb-4">Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+91) 1111 2222</p>
                      <ul class="flex space-x-4 text-gray-400">
                          <li><a href="#" class="hover:text-white"><BsFacebook /></a></li>
                          <li><a href="#" class="hover:text-white"><BsInstagram /></a></li>
                          <li><a href="#" class="hover:text-white"><BsTwitter /></a></li>
                      </ul>
                  </div>
              </div>
  
              <div class="flex flex-col space-y-8 w-1/4">
                  <div>
                      <h4 class="text-lg font-bold mb-4">NewsLetter</h4>
                      <input
                          type="email"
                          placeholder="Enter your email"
                          class="w-full p-2 rounded bg-gray-800 text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      />
                  </div>
              </div>
          </div>
  
          <div className="text-lg mt-8">
              Copyright {year} | All rights reserved
          </div>
      </div>
    );
  };
  

export default Footer
