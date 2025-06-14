function CarouselSlideHome({ image, title, description, slideNumber, totalSlides }) {
    return (
      <div
        id={`slide${slideNumber}`}
        className="carousel-item relative w-full h-[60vh]"
      >
        {/* Background image fills entire slide */}
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-[100vw] h-[80vh] object-center object-cover z-0"
        />
  
        {/* Overlay content on top-left */}
        <div className="absolute top-0 left-40 z-10 h-full flex items-center px-10">
          <div className="bg-black bg-opacity-50 text-white p-6 rounded max-w-lg">
            <h3 className="text-3xl font-bold mb-2">{title}</h3>
            <p className="text-lg mb-4">{description}</p>
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-gray-300 transition">
              SHOP NOW
            </button>
          </div>
        </div>
  
        {/* Arrows for navigation */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between z-10">
          <a
            href={`#slide${slideNumber === 1 ? totalSlides : slideNumber - 1}`}
            className="btn btn-circle"
          >
            ❮
          </a>
          <a
            href={`#slide${(slideNumber % totalSlides) + 1}`}
            className="btn btn-circle"
          >
            ❯
          </a>
        </div>
      </div>
    );
  }
  
  export default CarouselSlideHome;
  