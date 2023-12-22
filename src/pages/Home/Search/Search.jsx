import { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [userId, setuserId] = useState("");
  return (
    <div
      className="flex flex-col lg:flex-row p-4 sm:items-center py-20"
      style={{
        backgroundColor: "white",
        borderBottomWidth: 1,
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      }}
    >
      {/* <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">I am</h1>
        <select className="p-2 border border-gray-300 rounded w-full">
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
      </div> */}
      {/* <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">Looking for</h1>
        <select className="p-2 border border-gray-300 rounded w-full">
          <option value="man">वर</option>
          <option value="woman">वधु</option>
        </select>
      </div> */}
      {/* <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">Age</h1>
        <select className="p-2 border border-gray-300 rounded w-full">
          <option value="18-25">18 - 25</option>
          <option value="26-35">26 - 35</option>
          <option value="36-45">36 - 45</option>
        </select>
      </div> */}
      <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">User Id</h1>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder="Enter User Id"
          value={userId}
          onChange={(e) => {
            setuserId(e.target.value);
          }}
        />
      </div>
      {/* <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">City</h1>
        <select className="p-2 border border-gray-300 rounded w-full">
          <option value="man">Maharashtra</option>
          <option value="woman">Pune</option>
          <option value="man">Dehradun</option>
          <option value="woman">Chandigarh</option>
        </select>
      </div> */}
      <div className="lg:w-1/5">
        <Link to={`/biodata/${userId}`}>
          <button
            disabled={!userId}
            style={{ alignSelf: "center", backgroundColor: "#D10002" }}
            className=" text-white p-2 mt-8 rounded w-full"
          >
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Search;
