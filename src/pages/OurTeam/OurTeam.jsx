import React, { useState, useEffect } from "react";

function OurTeam() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.welkinhawk.in.net/api/mandal`);

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();

      const sortedUsers = data.mandal.sort((a, b) => {
        const designationOrder = {
          अध्यक्ष: 1,
          कोषाध्यक्ष: 2,
          महासचिव: 3,
          सचिव: 4,
          सदस्य: 5,
        };

        return (
          designationOrder[a.designation] - designationOrder[b.designation]
        );
      });

      setUsers(sortedUsers);
      setIsLoading(false); // Set loading to false after fetching and sorting
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
      <div key={mandal} className="mt-10 mx-auto max-w-screen-lg">
        <h2 className="flex font-bold text-xl">{mandal}</h2>
        <div className="flex flex-wrap mt-6">
          {userList.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 overflow-hidden shadow-lg m-2 bg-white rounded-lg p-2"
            >
              <img
                className="w-full h-48 object-contain"
                src={item.photo}
                alt={item.member_name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.member_name}</div>
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
