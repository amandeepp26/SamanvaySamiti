const Search = () => {
  return (
    <div
      className="flex flex-col lg:flex-row p-4 items-center py-20"
      style={{
        backgroundColor: "white",
        borderBottomWidth: 1,
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      }}
    >
      <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">I am</h1>
        <select className="p-2 border border-gray-300 rounded w-full">
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
      </div>
      <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">Looking for</h1>
        <select className="p-2 border border-gray-300 rounded w-full">
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
      </div>
      <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">Age</h1>
        <select className="p-2 border border-gray-300 rounded w-full">
          {/* Age options can be added here */}
          <option value="18-25">18 - 25</option>
          <option value="26-35">26 - 35</option>
          <option value="36-45">36 - 45</option>
          {/* Add more age ranges as needed */}
        </select>
      </div>
      <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">Location</h1>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder="Enter location"
        />
      </div>
      <div className="mb-4 lg:mb-0 lg:w-1/5 lg:mr-4">
        <h1 className="text-lg font-bold mb-2">City</h1>
        <select className="p-2 border border-gray-300 rounded w-full">
          <option value="man">Maharashtra</option>
          <option value="woman">Pune</option>
          <option value="man">Dehradun</option>
          <option value="woman">Chandigarh</option>
        </select>
      </div>
      <div className="lg:w-1/5">
        <button
          style={{ alignSelf: "center" }}
          className="bg-blue-500 text-white p-2 mt-8 rounded w-full"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
