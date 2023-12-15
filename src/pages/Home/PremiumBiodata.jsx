import { useState } from "react";
import usePremumBiodatas from "../../hooks/usePremumBiodatas";
import { useEffect } from "react";
import BiodataCard from "../Utils/Biodatas/BiodataCard";

const PremiumBiodata = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [originalData, setOriginalData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [filterData, isLoadingPremiumBiodata] = usePremumBiodatas();

  useEffect(() => {
    if (!arraysAreEqual(originalData, filterData)) {
      setOriginalData(filterData);
    }
  }, [filterData, originalData]);

  useEffect(() => {
    sortData();
  }, [sortOrder, originalData]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortData = () => {
    const newData = [...originalData].sort((a, b) => {
      const valueA = parseInt(a.age);
      const valueB = parseInt(b.age);

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    setSortedData(newData);
  };

  const arraysAreEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  return (
    <>
      <div>
        <h2 className="text-center text-xl font-semibold">Sort By Age</h2>
        <div className="flex gap-4 justify-center pt-3 pb-10">
          <label className="flex gap-1 font-medium hover:text-primary-normal cursor-pointer">
            <input
              type="radio"
              className="cursor-pointer"
              name="sortOrder"
              value="asc"
              checked={sortOrder === "asc"}
              onChange={handleSortChange}
            />{" "}
            Ascending
          </label>
          <label className="flex gap-1 font-medium hover:text-primary-normal cursor-pointer">
            <input
              type="radio"
              className="cursor-pointer"
              name="sortOrder"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={handleSortChange}
            />{" "}
            Descending
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 gap-y-5 items-center justify-between">
        {isLoadingPremiumBiodata
          ? "loading..."
          : sortedData?.map((item) => (
              <BiodataCard key={item._id} item={item} />
            ))}
      </div>
    </>
  );
};

export default PremiumBiodata;
