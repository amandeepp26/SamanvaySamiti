import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";

import RattingStar from "../../Utils/Rattings/RattingStar";
import useStories from "../../../hooks/useStories";
import { useState } from "react";
import { useEffect } from "react";

const Slider = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [originalData, setOriginalData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const { stories } = useStories();

  useEffect(() => {
    if (!arraysAreEqual(originalData, stories)) {
      setOriginalData(stories);
    }
  }, [stories, originalData]);

  useEffect(() => {
    const calculateSortedData = () => {
      return [...originalData].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    };

    setSortedData(calculateSortedData());
  }, [sortOrder, originalData]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const arraysAreEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  return (
    <>
      {/* <div>
                <h2 className="text-center text-xl font-semibold">Sort By Date</h2>
                <div className="flex gap-4 justify-center pt-3 pb-10">
                    <label className="flex gap-1 font-medium hover:text-primary-normal cursor-pointer">
                        <input
                            type="radio"
                            className="cursor-pointer"
                            name="sortOrder"
                            value="asc"
                            checked={sortOrder === 'asc'}
                            onChange={handleSortChange}
                        />{' '}
                        Ascending
                    </label>
                    <label className="flex gap-1 font-medium hover:text-primary-normal cursor-pointer">
                        <input
                            type="radio"
                            className="cursor-pointer"
                            name="sortOrder"
                            value="desc"
                            checked={sortOrder === 'desc'}
                            onChange={handleSortChange}
                        />{' '}
                        Descending
                    </label>
                </div>
           </div> */}

      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="successStorySlider"
        // loop={true}
        autoplay={{
          delay: 2500,
        }}
        breakpoints={{
          425: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {sortedData?.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="shadow-md hover:shadow-lg bg-white m-1">
              <img
                className="w-full"
                src={item?.coupleImg}
                alt="Slider Image"
              />
              <div className="p-4 text-center">
                {/* <h2 className='text-lg font-medium'>{item?.selfName} & {item?.partnerName}</h2> */}
                <p className="text-sm font-medium">{item?.date}</p>
                <div className="flex items-center justify-center pt-3 pb-2">
                  <RattingStar ratingValue={`${item?.rating}`} />
                </div>
                <p className="text-sm mt-3">{item?.review}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* <SwiperSlide>
                    <div className='shadow-md hover:shadow-lg bg-white m-1'>
                        <img className='w-full' src={reviewImg} alt="Slider IMage" />
                        <div className='p-4 text-center'>
                            <h2 className='text-xl font-medium'>Kawser & Saba</h2>
                            <div className='flex items-center justify-center pt-3 pb-2'><RattingStar ratingValue="1" /></div>
                            <p className='text-sm mt-3'>We are thankful to bdmarriage.com for helping us to find each other. I was exiciting about the platform and its worked.</p>
                        </div>
                    </div>
                </SwiperSlide> */}
      </Swiper>
    </>
  );
};

export default Slider;
