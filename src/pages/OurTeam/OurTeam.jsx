import React from "react";

const Team = [
  {
    img: "https://i.pinimg.com/474x/2b/75/d3/2b75d34c20a5df0790666560022f14a4.jpg",
    name: "Alok",
    designation: "Designation: President",
  },
  {
    img: "https://www.shaadidukaan.com/vogue/wp-content/uploads/2020/01/redveds_photography.jpg",
    name: "Himanshi Rana",
    designation: "Designation: Sachiv",
  },
  {
    img: "https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2017/12/ODES685-325_Logo.jpg",
    name: "Aman",
    designation: "Designation: President",
  },

  {
    img: "https://wallpapercave.com/wp/wp8290529.jpg",
    name: "Sakshi",
    designation: "Designation: Sachiv",
  },
  {
    img: "https://i.pinimg.com/originals/09/be/97/09be9788f9bb96d4278a26ffe7e29a8a.jpg",
    name: "Kartik",
    designation: "Designation: President",
  },
  {
    img: "https://i.pinimg.com/474x/2b/75/d3/2b75d34c20a5df0790666560022f14a4.jpg",
    name: "Alok",
    designation: "Designation: President",
  },
  {
    img: "https://www.shaadidukaan.com/vogue/wp-content/uploads/2020/01/redveds_photography.jpg",
    name: "Himanshi Rana",
    designation: "Designation: Sachiv",
  },
  {
    img: "https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2017/12/ODES685-325_Logo.jpg",
    name: "Aman",
    designation: "Designation: President",
  },
  {
    img: "https://i.pinimg.com/474x/2b/75/d3/2b75d34c20a5df0790666560022f14a4.jpg",
    name: "Alok",
    designation: "Designation: President",
  },
  {
    img: "https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2017/12/ODES685-325_Logo.jpg",
    name: "Aman",
    designation: "Designation: President",
  },

  {
    img: "https://wallpapercave.com/wp/wp8290529.jpg",
    name: "Sakshi",
    designation: "Designation: Sachiv",
  },
];

function OurTeam() {
  return (
    <>
      {/* Haridwar Mandal */}
      <div className="mt-10 mx-auto max-w-screen-xl">
        <h2 className="font-bold text-xl ml-5 lg:ml-0 mb-4">Haridwar Mandal</h2>
        <div className="flex flex-wrap -m-2">
          {Team.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className="w-full mx-5 lg:mx-0 sm:w-1/2 md:w-1/4 lg:w-1/4 p-2"
            >
              <div className="overflow-hidden shadow-lg bg-white rounded-md">
                <img
                  className="w-full h-48 object-fit"
                  src={item.img}
                  alt={item.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <p className="text-gray-700 text-xs">{item.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dehradun Mandal */}
      <div className="mt-10 mx-auto max-w-screen-xl">
        <h2 className="font-bold text-xl ml-5 lg:ml-0 mb-4">Dehradun Mandal</h2>
        <div className="flex flex-wrap -m-2">
          {Team.slice(6, 10).map((item, index) => (
            <div
              key={index}
              className="w-full mx-5 lg:mx-0 sm:w-1/2 md:w-1/4 lg:w-1/4 p-2"
            >
              <div className="overflow-hidden shadow-lg bg-white rounded-md">
                <img className="w-full" src={item.img} alt={item.name} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <p className="text-gray-700 text-xs">{item.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OurTeam;
