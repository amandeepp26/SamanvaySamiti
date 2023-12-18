import React from "react";
import RattingStar from "../Utils/Rattings/RattingStar";

const blogData = [
  {
    id: 1,
    imageUrl: "https://i.ibb.co/zGgyTR4/couple-Img.jpg",
    date: "25 Dec 2023",
    rating: 3,
    description:
      "Celebrating Love Stories, Journeying Together Towards Everlasting Happiness",
  },
  {
    id: 2,
    imageUrl: "https://i.ibb.co/98LyXRH/couple-Imge.jpg",
    date: "28 Dec 2023",
    rating: 4,
    description:
      "Exploring Beautiful Destinations Together, Journeying Together Towards Everlasting Happiness",
  },
  {
    id: 3,
    imageUrl: "https://i.ibb.co/xXBJK3b/couple-Imag.png",
    date: "1 Jan 2024",
    rating: 5,
    description: "A New Year, A New Chapter in Our Love Story",
  },
  {
    id: 4,
    imageUrl:
      "https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg",
    date: "5 Jan 2024",
    rating: 2,
    description: "Overcoming Challenges and Growing Stronger",
  },
  {
    id: 5,
    imageUrl: "https://i.ibb.co/xXBJK3b/couple-Imag.png",
    date: "1 Jan 2024",
    rating: 5,
    description: "A New Year, A New Chapter in Our Love Story",
  },
  {
    id: 6,
    imageUrl:
      "https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg",
    date: "5 Jan 2024",
    rating: 2,
    description: "Overcoming Challenges and Growing Stronger",
  },
  {
    id: 7,
    imageUrl: "https://i.ibb.co/xXBJK3b/couple-Imag.png",
    date: "1 Jan 2024",
    rating: 5,
    description: "A New Year, A New Chapter in Our Love Story",
  },
  {
    id: 8,
    imageUrl: "https://i.ibb.co/zGgyTR4/couple-Img.jpg",
    date: "25 Dec 2023",
    rating: 3,
    description:
      "Celebrating Love Stories, Journeying Together Towards Everlasting Happiness",
  },
  {
    id: 9,
    imageUrl: "https://i.ibb.co/98LyXRH/couple-Imge.jpg",
    date: "28 Dec 2023",
    rating: 4,
    description:
      "Exploring Beautiful Destinations Together, Journeying Together Towards Everlasting Happiness",
  },
  {
    id: 10,
    imageUrl: "https://i.ibb.co/xXBJK3b/couple-Imag.png",
    date: "1 Jan 2024",
    rating: 5,
    description: "A New Year, A New Chapter in Our Love Story",
  },
  {
    id: 11,
    imageUrl: "https://i.ibb.co/zGgyTR4/couple-Img.jpg",
    date: "25 Dec 2023",
    rating: 3,
    description:
      "Celebrating Love Stories, Journeying Together Towards Everlasting Happiness",
  },
  {
    id: 12,
    imageUrl: "https://i.ibb.co/xXBJK3b/couple-Img.jpg",
    date: "25 Dec 2023",
    rating: 3,
    description:
      "Celebrating Love Stories, Journeying Together Towards Everlasting Happiness",
  },
  {
    id: 13,
    imageUrl: "https://i.ibb.co/98LyXRH/couple-Imge.jpg",
    date: "28 Dec 2023",
    rating: 4,
    description:
      "Exploring Beautiful Destinations Together, Journeying Together Towards Everlasting Happiness",
  },
  {
    id: 14,
    imageUrl: "https://i.ibb.co/zGgyTR4/couple-Img.jpg",
    date: "25 Dec 2023",
    rating: 3,
    description:
      "Celebrating Love Stories, Journeying Together Towards Everlasting Happiness",
  },
  {
    id: 15,
    imageUrl: "https://i.ibb.co/98LyXRH/couple-Imge.jpg",
    date: "28 Dec 2023",
    rating: 4,
    description:
      "Exploring Beautiful Destinations Together, Journeying Together Towards Everlasting Happiness",
  },
  // Add more blog data objects as needed
];

const Blogs = () => {
  return (
    <div className="flex flex-wrap justify-center mx-20">
      {blogData.map((item) => (
        <div key={item.id} className="w-full sm:w-1/2  md:w-1/4 p-2">
          <div className="shadow-md hover:shadow-lg bg-white ">
            <img className="w-full" src={item.imageUrl} alt="Slider Image" />
            <div className="p-4 text-center">
              <p className="text-sm font-medium">{item.date}</p>
              <div className="flex items-center justify-center pt-3 pb-2">
                <RattingStar ratingValue={item.rating} />
              </div>
              <p className="text-sm mt-3">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
