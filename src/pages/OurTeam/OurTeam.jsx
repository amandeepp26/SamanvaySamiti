import React, { useState, useEffect } from "react";

function OurTeam() {
  const [users, setUsers] = useState([]);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.samanvaysamiti.com/api/mandal`);

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      console.log(data); // Log the fetched data
      setUsers(data.mandal);
      setisloading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Function to group users by mandal_name
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

  // Function to render users based on mandal_name
  const renderUsersByMandal = () => {
    const groupedUsers = groupUsersByMandal();

    return Object.entries(groupedUsers).map(([mandal, userList]) => (
      <div key={mandal} className="mt-10 mx-auto max-w-screen-lg">
        <h2 className="flex font-bold text-xl">{mandal}</h2>
        <div className="flex flex-wrap mt-6">
          {userList.map((item, index) => (
            <div
              key={index}
              className="w-full overflow-hidden shadow-lg m-2 bg-white rounded-lg sm:w-1/2 md:w-1/4 p-2"
            >
              <img
                className="w-full h-48 object-contain"
                src={item.photo}
                alt={item.member_name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.member_name}</div>
                <p className="text-gray-700 text-xs">{item.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return <>{isloading ? <div></div> : renderUsersByMandal()}</>;
}

export default OurTeam;
