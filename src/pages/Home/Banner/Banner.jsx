import banner1 from "../../../assets/banners/homebanner.jpg";
import mobileBanner from "../../../assets/banners/mobile-banner.jpeg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.css";
const Banner = () => {
  return (
    <div className=" flex">
      <img src={mobileBanner} className="h-[full] w-[full] mobile-image" />
      <img src={banner1} className="h-[full] w-[full] desktop-image" />
    </div>
  );
};

export default Banner;

{
  /* {
        <Swiper
          pagination={{
            type: "fraction",
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="topBanner"
          navigation={true}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <div className="relative min-h-[400px] lg:min-h-full">
              <img
                className="h-[400px] lg:h-auto object-cover lg:w-full"
                src="../../../assets/banners/banner.jpeg"
                alt="banner"
              />
              <div className="absolute top-0 left-0 min-h-[400px] lg:min-h-full min-w-full bg-[#0000006b] flex items-center justify-center">
                <div className="text-left flex-1 max-w-5xl pl-5 md:pl-10 lg:pl-2">
                  <h1 className="text-3xl text-white font-medium">
                    Discover Love
                  </h1>
                  <p className="text-xl py-5 text-white">
                    {" "}
                    Find Your Perfect Match Today
                  </p>
                  <ButtonOutLine text="Browse Biodatas" link="/biodatas" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative min-h-[400px] lg:min-h-full">
              <img
                className="h-[400px] lg:h-auto object-cover lg:w-full"
                src={banner1}
                alt="banner"
              />
              <div className="absolute top-0 left-0 min-h-[400px] lg:min-h-full min-w-full bg-[#0000008b] flex items-center justify-center">
                <div className="text-left flex-1 max-w-5xl pl-5 md:pl-10 lg:pl-2">
                  <h1 className="text-3xl text-white font-medium">
                    Journey to Forever
                  </h1>
                  <p className="text-xl py-5 text-white">
                    {" "}
                    Start Your Matrimony Adventure
                  </p>
                  <ButtonOutLine text="Browse Biodatas" link="/biodatas" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative min-h-[400px] lg:min-h-full">
              <img
                className="h-[400px] lg:h-auto object-cover lg:w-full"
                src={banner2}
                alt="banner"
              />
              <div className="absolute top-0 left-0 min-h-[400px] lg:min-h-full min-w-full bg-[#0000006b] flex items-center justify-center">
                <div className="text-left flex-1 max-w-5xl pl-5 md:pl-10 lg:pl-2">
                  <h1 className="text-3xl text-white font-medium">
                    Unite Hearts
                  </h1>
                  <p className="text-xl py-5 text-white">
                    {" "}
                    Creating Lifelong Bonds
                  </p>
                  <ButtonOutLine text="Browse Biodatas" link="/biodatas" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative min-h-[400px] lg:min-h-full">
              <img
                className="h-[400px] lg:h-auto object-cover lg:w-full"
                src={banner3}
                alt="banner"
              />
              <div className="absolute top-0 left-0 min-h-[400px] lg:min-h-full min-w-full bg-[#0000006b] flex items-center justify-center">
                <div className="text-left flex-1 max-w-5xl pl-5 md:pl-10 lg:pl-2">
                  <h1 className="text-3xl text-white font-medium">
                    Bengali Bliss
                  </h1>
                  <p className="text-xl py-5 text-white">
                    {" "}
                    Connect, Communicate, Commit
                  </p>
                  <ButtonOutLine text="Browse Biodatas" link="/biodatas" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      } */
}
