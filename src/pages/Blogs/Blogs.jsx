import React from "react";
import RattingStar from "../Utils/Rattings/RattingStar";
import Logo from "../Utils/Logo";
import logo from "../../assets/logo/logo.png";
import { Link } from "react-router-dom";

const blogData = [
  {
    id: 1,
    imageUrl: "@assets/logo/logo.png",
    date: "लाडशाखीय वाणी समाजाची गोत्र, प्रवर व कुळे",
    rating: 3,
    description:
      "Celebrating Love Stories, Journeying Together Towards Everlasting Happiness",
  },
  // Add more blog data objects as needed
];

const Blogs = () => {
  return (
    <div className="flex flex-wrap  md:mx-10 lg:mx-20">
      {blogData.map((item) => (
        <Link to={`/blog-details`} className="w-full" >
        <div key={item.id} className="w-full sm:w-1/2  md:w-1/4 p-2">
          <div className="shadow-md hover:shadow-lg bg-white ">
            <div className="flex items-center">
              <img
                style={{ width: "250px", height: "240px" }}
                src={logo}
                alt="Logo"
              />
            </div>

            <div className="p-4 text-center">
              <p className="text-sm font-medium">{item.date}</p>
              {/* <div className="flex items-center justify-center pt-3 pb-2">
                <RattingStar ratingValue={item.rating} />
              </div> */}
              {/* <p className="text-sm mt-3">{item.description}</p> */}
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
