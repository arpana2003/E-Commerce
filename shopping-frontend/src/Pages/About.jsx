import HomeLayout from "../Layouts/HomeLayout";
import About1 from "../assets/Images/About1.jpg";
import About3 from "../assets/Images/About3.jpg";
import About5 from "../assets/Images/About5.jpg";

function About() {
  return (
    <HomeLayout>
      <div className="flex h-[50vh] w-[100vw] bg-pink-100 ">
        <div className="h-[30vh] w-[50vw] px-16">
          <h1 className="text-3xl font-bold px-16 mt-8 leading-snug">
            Kahna Store powers over 1,70,000
          </h1>
          <h1 className="text-3xl font-bold px-16 leading-snug">businesses worldwide</h1>
          <p className="text-xl font-medium text-gray-400 px-16 mt-2 leading-snug">
            The all-in-one commerce platform to start , run, and
            <br /> grow the business
          </p>
          <div className="px-36 py-10">
            <p className="text-2xl font-bold font-serif">
              <span className="text-4xl">“</span>
              <span className="text-lg font-semibold">
                Click by click, your world arrives,
                <br />
                In every box, a dream survives.
              </span>
              <span className="text-4xl">”</span>
            </p>
          </div>
        </div>
        <div
          className="h-[40vh] w-[40vw] rounded-sm bg-cover bg-center relative mt-4"
          style={{ backgroundImage: `url(${About1}` }}
        >
          <img
            src={About3}
            alt="Asthetics"
            className="h-[40vh] w-[25vw] absolute right-[-15%] top-44 rounded-lg"
          />
        </div>
      </div>
      <div className="flex">
      <div
          className="h-[60vh] w-[20vw] rounded-sm bg-cover bg-center relative m-4"
          style={{ backgroundImage: `url(${About5}` }}
        ></div>
        <div className="bg-red-400 h-[30vh] w-[60vw] absolute right-[10%] bottom-[-34%] rounded-lg text-white px-10 py-6 shadow-lg">
  <h1 className="text-3xl font-bold font-serif mb-3">Our Story</h1>
  <p className="text-lg font-medium leading-relaxed">
    Founded in the heart of Prayagraj, India, <span className="font-semibold">Kanha Store</span> began as a small local initiative with a big dream — to bring quality products to every doorstep. What started as a neighborhood shop has now grown into a trusted e-commerce platform that blends tradition with technology. At Kanha Store, we believe in delivering value, trust, and a seamless shopping experience across India.
  </p>
</div>

      </div>
    </HomeLayout>
  );
}

export default About;
