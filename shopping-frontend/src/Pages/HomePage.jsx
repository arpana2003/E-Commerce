import HomeLayout from "../Layouts/HomeLayout.jsx";
import carouselData from "../Constant/HomeCarouselData.js";
import CarouselSlideHome from "../Components/CarouselSlideHome.jsx";
import Front1 from "../assets/Images/Front1.jpg";
import Front2 from "../assets/Images/Front2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faCartShopping,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  return (
    <HomeLayout>
      <div className="carousel w-full h-[85vh] overflow-hidden ">
        {carouselData.map((element) => (
          <CarouselSlideHome
            key={element.slideNumber}
            image={element.image}
            title={element.title}
            description={element.description}
            slideNumber={element.slideNumber}
            totalSlides={carouselData.length}
          />
        ))}
      </div>

      <div className="flex flex-col bg-white relative">
        <div className="flex mx-8 gap-10 absolute -top-16 left-56">
          <div
            className="bg-cover bg-center px-56 py-32 relative rounded-lg"
            style={{ backgroundImage: `url(${Front2})` }}
          >
            <div className="absolute right-8 top-3">
              <h1 className="font-bold text-xl">STYLISH & AFFORDABLE</h1>
              <p className="text-l font-medium">LACE FRONTAL BAGS</p>
              <button className="bg-pink-500 border-x border-pink-500 text-white font-bold p-2 my-4 hover:text-black hover:bg-white hover: border-s-black hover:cursor-pointer transition-all duration-200 ease-in-out">
                SHOP NOW
              </button>
            </div>
          </div>
          <div
            className="bg-cover bg-center px-56 py-32 relative rounded-lg"
            style={{ backgroundImage: `url(${Front1})` }}
          >
            <div className="absolute right-8 top-3">
              <h1 className="font-bold text-xl">HOME APPLIANCES</h1>
              <h1 className="font-bold text-xl">& ACCESSORIES</h1>
              <button className="bg-pink-500 border-x border-pink-500 text-white font-bold p-2 my-4 hover:text-black hover:bg-white hover: border-s-black hover:cursor-pointer transition-all duration-200 ease-in-out">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        <div className="relative top-20 left-52 flex p-32 gap-10 ">
          <div className="bg-gray-400 border-l border-gray-500 p-4 flex text-black rounded-lg">
            <FontAwesomeIcon icon={faTruck} className="relative my-2 mx-4 top-2"  />
            <div>
              <p>Fast Worldwide Delivery</p>
              <p>-Within & Outside India</p>
            </div>
          </div>
          <div className="bg-gray-400 border-l border-gray-500 p-4 flex text-black rounded-lg">
            <FontAwesomeIcon icon={faCartShopping} className="relative my-2 mx-4 top-2" />
            <div>
            <p>Easy Shopping &</p>
            <p>Checkout</p>
            </div>
          </div>
          <div className="bg-gray-400 border-l border-gray-500 p-4 flex text-black rounded-lg">
            <FontAwesomeIcon icon={faClock} className="relative my-2 mx-4 top-2" />
            <div>
            <p>Delivery within 2-Days</p>
            <p>for orders in Prayagraj</p>
            </div>
          </div>
        </div>
      </div>

<div>
    Hello
</div>

    </HomeLayout>
  );
}

export default HomePage;
