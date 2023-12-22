import { useEffect, useState } from "react";
import useBiodatas from "../../hooks/useBiodatas";
import LoaderIcon from "../Utils/LoaderIcon";
import BiodataCard from "../Utils/Biodatas/BiodataCard";
import "./Biodatas.css";
import MultiRangeSlider from "multi-range-slider-react";
import useTotalBiodataForPagination from "../../hooks/useTotalBiodataForPagination";

const Biodatas = () => {
  const [viewAll, setViewAll] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [divisionValue, setDivisionValue] = useState(null);

  const [minMaxAutoRunStop, setMinMaxAutoRunStop] = useState(true);

  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  // --------------------------------- PAGINATION ------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const { totalBiodataForPagination } = useTotalBiodataForPagination();
  const [totalPaginationBiodata, setTotalPaginationBiodata] = useState(0);

  const numberOfPages = Math.ceil(totalPaginationBiodata / itemsPerPage);

  const [users, setUsers] = useState([]);
  const [biodatas, , isBiodataLoading] = useBiodatas(
    viewAll,
    typeValue,
    divisionValue,
    minValue,
    maxValue,
    currentPage,
    itemsPerPage
  );

  // const pages = [];
  // for (let i = 0; i < numberOfPages; i++) {
  //     pages.push(i + 1);
  // }
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

  useEffect(() => {
    setTotalPaginationBiodata(totalBiodataForPagination || 0);
  }, [totalBiodataForPagination]);
  const pages = [...Array(numberOfPages).keys()].map((page) => page + 1);

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  //-------------------------------- PAGINATION END --------------------------------------

  const handleViewAll = () => {
    setTypeValue(null);
    setDivisionValue(null);

    setMinValue(null);
    setMaxValue(null);
  };
  const handleTypeValue = () => {
    setViewAll(null);
    setDivisionValue(null);

    setMinValue(null);
    setMaxValue(null);
  };
  const handleDivisionValue = () => {
    setViewAll(null);
    setTypeValue(null);

    setMinValue(null);
    setMaxValue(null);
  };

  useEffect(() => {
    setMinMaxAutoRunStop(false);
  }, [viewAll, typeValue, divisionValue, minValue, maxValue]);

  const handleAgeInput = (e) => {
    setViewAll(null);
    setTypeValue(null);
    setDivisionValue(null);

    if ((!viewAll || !typeValue || !divisionValue) && !minMaxAutoRunStop) {
      setMinValue(e.minValue);
      setMaxValue(e.maxValue);
    }
  };

  return (
    <div className="container mx-auto px-5 grid lg:grid-cols-4 lg:gap-3">
      {/* Filter Section  */}
      <div className="border-b-2 lg:border-b-0 lg:border-r bg-[#ffffffc2]">
        {/* View All  */}

        <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-7">
          <h3 className="mb-1 pl-3 font-semibold text-gray-900">
            View all Biodata
          </h3>
          <ul className="text-sm font-medium text-gray-900">
            <li className="w-full">
              <div onClick={handleViewAll} className="flex items-center">
                <input
                  id="viewAll"
                  type="radio"
                  value="viewAll"
                  name="filter"
                  onChange={(e) => setViewAll(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="viewAll"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  View all
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/* Filter by age  */}

        <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
          <h3 className="pl-3 font-semibold text-gray-900">Filter by Age</h3>
          <div>
            <div className="range">
              <h1 className="flex justify-between font-medium text-sm max-w-[260px] mx-auto mb-5">
                <span>Min {minValue}</span> <span>TO</span>{" "}
                <span>Max {maxValue}</span>
              </h1>
              <MultiRangeSlider
                min={20}
                max={55}
                step={1}
                ruler={false}
                minValue={minValue}
                maxValue={maxValue}
                barInnerColor="#D10002"
                onChange={(e) => {
                  handleAgeInput(e);
                }}
                onClick={handleAgeInput}
              />
            </div>
          </div>
        </div>

        {/* Filter by Type  */}

        <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
          <h3 className="mb-1 pl-3 font-semibold text-gray-900">
            Filter by Type
          </h3>
          <ul className="text-sm font-medium text-gray-900">
            <li className="w-full">
              <div onClick={handleTypeValue} className="flex items-center">
                <input
                  id="male"
                  type="radio"
                  value="Male"
                  name="filter"
                  onChange={(e) => setTypeValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="male"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Male
                </label>
              </div>
            </li>
            <li className="w-full">
              <div onClick={handleTypeValue} className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  value="Female"
                  name="filter"
                  onChange={(e) => setTypeValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="female"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Female
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/* Filter by Division  */}

        <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
          <h3 className="mb-1 pl-3 font-semibold text-gray-900">
            Filter by Division
          </h3>
          <ul className="text-sm font-medium text-gray-900">
            <li className="w-full">
              <div onClick={handleDivisionValue} className="flex items-center">
                <input
                  id="Dhaka"
                  type="radio"
                  value="Dhaka"
                  name="filter"
                  onChange={(e) => setDivisionValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Dhaka"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Dhaka
                </label>
              </div>
            </li>
            <li className="w-full">
              <div onClick={handleDivisionValue} className="flex items-center">
                <input
                  id="Chattagram"
                  type="radio"
                  value="Chattagram"
                  name="filter"
                  onChange={(e) => setDivisionValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Chattagram"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Chattagram
                </label>
              </div>
            </li>
            <li className="w-full">
              <div onClick={handleDivisionValue} className="flex items-center">
                <input
                  id="Maymansign"
                  type="radio"
                  value="Maymansign"
                  name="filter"
                  onChange={(e) => setDivisionValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Maymansign"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Maymansign
                </label>
              </div>
            </li>
            <li className="w-full">
              <div onClick={handleDivisionValue} className="flex items-center">
                <input
                  id="Rangpur"
                  type="radio"
                  value="Rangpur"
                  name="filter"
                  onChange={(e) => setDivisionValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Rangpur"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Rangpur
                </label>
              </div>
            </li>
            <li className="w-full">
              <div onClick={handleDivisionValue} className="flex items-center">
                <input
                  id="Barisal"
                  type="radio"
                  value="Barisal"
                  name="filter"
                  onChange={(e) => setDivisionValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Barisal"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Barisal
                </label>
              </div>
            </li>
            <li className="w-full">
              <div onClick={handleDivisionValue} className="flex items-center">
                <input
                  id="Khulna"
                  type="radio"
                  value="Khulna"
                  name="filter"
                  onChange={(e) => setDivisionValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Khulna"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Khulna
                </label>
              </div>
            </li>
            <li className="w-full">
              <div onClick={handleDivisionValue} className="flex items-center">
                <input
                  id="Sylhet"
                  type="radio"
                  value="Sylhet"
                  name="filter"
                  onChange={(e) => setDivisionValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Sylhet"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Sylhet
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Content section  */}
      <div className="lg:col-span-3">
        {/* <h1 className="text-2xl text-left pt-5 flex gap-2 items-center">
                    <span> Total Biodatas </span>
                    {
                        isBiodataLoading ?
                            <div className="w-5 h-5 mt-1"><LoaderIcon /></div> :
                            biodatas?.length
                    }
                    <span> of </span>
                    {
                        isBiodataLoading ?
                            <div className="w-5 h-5 mt-1"><LoaderIcon /></div> :
                            <span> {currentPage * itemsPerPage} / {itemsPerPage} </span>
                    }
                </h1> */}

        {isBiodataLoading ? (
          <>
            <div className="h-96 w-full flex items-center justify-center">
              <LoaderIcon />
            </div>
          </>
        ) : (
          <>
            {users?.length <= 0 ? (
              <>
                <div className="h-96 w-full flex items-center justify-center">
                  <h2 className="text-2xl text-center">No Data Found !</h2>
                </div>
              </>
            ) : (
              <>
                <div className="custom-media-query grid grid-cols-1 lg:grid-cols-3 gap-4 py-6">
                  {users.map((item) => (
                    <BiodataCard key={item._id} item={item} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Pagination  */}
        <div className="pt-3 pb-10 flex gap-5 justify-center">
          <div>
            <button
              onClick={handlePrevPage}
              className="py-1 px-3 text-white rounded-full bg-gray-500 mx-2 hover:bg-primary-normal"
            >
              Prev
            </button>
            {pages.map((page) => (
              <button
                onClick={() => setCurrentPage(page)}
                key={page}
                className={`py-1 px-3 text-white rounded-full bg-gray-500 mx-2 ${
                  currentPage === page && "!bg-primary-normal"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className="py-1 px-3 text-white rounded-full bg-gray-500 mx-2 hover:bg-primary-normal"
            >
              Next
            </button>
          </div>
          <div>
            <select
              onChange={handleItemsPerPage}
              className="bg-primary-normal py-1 px-3 text-white rounded-md border-0 border-primary-normal"
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="18">18</option>
              <option value="24">24</option>
              <option value="30">30</option>
              <option value="36">36</option>
              <option value="42">42</option>
              <option value="48">48</option>
            </select>
          </div>
        </div>
        {/* Pagination End */}
      </div>
    </div>
  );
};

export default Biodatas;
