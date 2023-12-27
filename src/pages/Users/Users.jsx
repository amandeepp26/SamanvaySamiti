import React, { useState, useEffect } from "react";
import BiodataCard from "../Utils/Biodatas/BiodataCard";
import LoaderIcon from "../Utils/LoaderIcon";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.welkinhawk.in.net/api/users/search-users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ minWeight: 0, maxWeight: 100 }),
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Data:", result);
        setUsers(result.result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Moved the fetchData call inside useEffect

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center flex-col">
          <LoaderIcon />
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:mx-20 lg:grid-cols-4 gap-4 gap-y-5 items-center justify-between">
          {users.map((key) => {
            return <BiodataCard item={key} />;
          })}
        </div>
      )}
    </>
  );
}

export default Users;
