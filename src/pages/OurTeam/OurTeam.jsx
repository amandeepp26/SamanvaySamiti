import React, { useState, useEffect } from "react";

function OurTeam() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const mandalOrder = {
    "लाडशाखीय वाणी समाज मंडळ समन्वय समिती, मुंबई": 1,
    "लाडशाखीय वाणी समाज मंडळ समन्वय समिती (दक्षता संघ), मुंबई": 2,
    "लाडशाखीय वाणी समाज मंडळ समन्वय समिती (365 वैद्यकीय सेवा कोष), मुंबई": 3,
    "लाडशाखीय वाणी समाज जनसेवा मंडळ, ठाणे, ऐरोली, मुलुंड परिसर": 4,
    "लाडशाखीय वाणी समाज मंडळ, कल्याण": 4,
    "लाडशाखीय वाणी समाज मंडळ, डोंबिवली": 4,
    "लाडशाखीय वाणी समाज मंडळ, नवी मुंबई": 4,
    "लाडशाखीय वाणी समाज मंडळ, पनवेल": 4,
    "लाडशाखीय वाणी समाज मंडळ, पश्चिम उपनगरे": 4,
    "लाडशाखीय वाणी समाज मंडळ, पालघर, बोईसर, डहाणू": 4,
    "लाडशाखीय वाणी समाज मंडळ, बदलापूर": 4,
    "लाडशाखीय वाणी समाज मंडळ, विक्रोळी, घाटकोपर": 4,
    "लाडशाखीय वाणी समाज सेवा मंडळ, ऊल्हासनगर": 4,
    "लाडशाखीय वाणी समाज सेवा व उन्नती मंडळ, अंबरनाथ": 4,
    "अविष्कार महिला मंडळ, विक्रोळी, घाटकोपर": 5,
    "एकता महिला मंडळ, ऊल्हासनगर": 5,
    "चैतन्य महिला मंडळ, ठाणे, ऐरोली, मुलुंड परिसर": 5,
    "नवलाई लाडशाखीय वाणी महिला मंडळ, पश्चिम उपनगरे": 5,
    "प्रगती महिला मंडळ, कल्याण": 5,
    "मनस्वी महिला मंडळ, बदलापूर": 5,
    "संकल्प महिला मंडळ, नवी मुंबई": 5,
    "संस्कृती महिला मंडळ, अंबरनाथ": 5,
    "सक्षम महिला मंडळ, डोंबिवली": 5,
    "स्वामिनी महिला मंडळ, पनवेल": 5,
    "लाडशाखीय वाणी समाज मंडळ": 99,
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.welkinhawk.in.net/api/mandal`);

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();

      const sortedMandals = data.mandal.sort((a, b) => {
        return mandalOrder[a.mandal_name] - mandalOrder[b.mandal_name];
      });

      const customOrder = {
        अध्यक्ष: 1,
        उपाध्यक्ष: 2,
        "महा सचिव": 3,
        सरचिटणीस: 4,
        सचिव: 5,
        चिटणीस: 6,
        कोषाध्यक्ष: 7,
        "अंतर्गत हिशेब तपासणीस": 8,
        संघटक: 9,
        "महिला संघटक": 10,
        विश्वस्त: 11,
        सदस्य: 12,
      };

      const sortedUsers = sortedMandals.sort((a, b) => {
        return customOrder[a.designation] - customOrder[b.designation];
      });

      setUsers(sortedUsers);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const groupUsersByMandal = () => {
    const groupedUsers = {};

    users.forEach((user) => {
      const mandalName = user.mandal_name;

      if (!groupedUsers[mandalName]) {
        groupedUsers[mandalName] = [];
      }

      groupedUsers[mandalName].push(user);
    });

    return groupedUsers;
  };

  const renderUsersByMandal = () => {
    const groupedUsers = groupUsersByMandal();

    return Object.entries(groupedUsers).map(([mandal, userList]) => (
      <div key={mandal} className="mt-10 mx-10 sm:mx-20 ">
        <h2 className="flex font-bold text-xl mx-0 sm:mx-20">{mandal}</h2>
        <div className="flex flex-col md:flex-row flex-wrap mt-6 mx-0 sm:mx-20">
          {userList.map((item, index) => (
            <div
              key={index}
              className="w-100 sm:w-60 overflow-hidden shadow-lg m-2 bg-white rounded-lg p-2"
            >
              <img
                className="w-full h-48 object-contain"
                src={item.photo}
                alt={item.member_name}
                draggable={false}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-md mb-2">{item.member_name}</div>
                <p className="text-gray-700 text-md">{item.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center flex-col">
          Loading...
        </div>
      ) : (
        renderUsersByMandal()
      )}
    </>
  );
}

export default OurTeam;
