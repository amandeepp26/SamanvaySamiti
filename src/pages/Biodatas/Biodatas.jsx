import { useEffect, useState } from "react";
import useBiodatas from "../../hooks/useBiodatas";
import LoaderIcon from "../Utils/LoaderIcon";
import BiodataCard from "../Utils/Biodatas/BiodataCard";
import "./Biodatas.css";
import MultiRangeSlider from "multi-range-slider-react";
import useTotalBiodataForPagination from "../../hooks/useTotalBiodataForPagination";
import { Link } from "react-router-dom";

const Biodatas = () => {
  const [viewAll, setViewAll] = useState(null);
  const [typeValue, setTypeValue] = useState("");
  const [educationLevel, seteducationLevel] = useState("");
  const [gotra, setGotra] = useState("");
  const [divisionValue, setDivisionValue] = useState(null);
  const [isloading, setisloading] = useState(false);

  const [userId, setuserId] = useState("");

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
    fetchData();
  }, [typeValue, educationLevel, viewAll, gotra]); // Moved the fetchData call inside useEffect

  const fetchData = async () => {
    setisloading(true);
    try {
      // Prepare the request payload
      const requestBody = {
        minWeight: 0,
        maxWeight: 100,
        //  gender: typeValue,
      };

      if (typeValue) {
        requestBody.gender = typeValue;
      }
      // Add education_level_completed to the request payload if educationLevel has data
      if (educationLevel) {
        requestBody.education_level_completed = educationLevel;
      }
      if (gotra) {
        requestBody.gotra = gotra;
      }

      const response = await fetch(
        "https://api.welkinhawk.in.net/api/users/search-users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Response status:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Data:", result);
      setUsers(result.result);
      setisloading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setisloading(false);
    }
  };

  const handleEducationLevel = (e) => {
    seteducationLevel(e.target.value);
  };
  const handleGotraSelect = (e) => {
    setGotra(e.target.value);
  };
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
    seteducationLevel(null);
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
            View all Users
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

        {/* <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
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
        </div> */}

        <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
          <h3 className="pl-3 font-semibold text-gray-900">
            Search by User ID
          </h3>
          <div>
            <div className="mb-4 lg:mb-0 lg:w-full lg:mr-4 my-5">
              {/* <h1 className="text-lg font-bold mb-2">User Id</h1> */}
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
            <div className="lg:w-full">
              <Link to={`/biodata/${userId}`}>
                <button
                  disabled={!userId}
                  style={{ alignSelf: "center", backgroundColor: "#D10002" }}
                  className=" text-white p-2 mt-5 rounded w-full"
                >
                  Search
                </button>
              </Link>
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
                  value="उपवर"
                  name="filter"
                  onChange={(e) => setTypeValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="male"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  उपवर
                </label>
              </div>
            </li>
            <li className="w-full">
              <div onClick={handleTypeValue} className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  value="उपवधु"
                  name="filter"
                  onChange={(e) => setTypeValue(e.target.value)}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="female"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  उपवधु
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/* Filter by Education  */}

        <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
          <h3 className="mb-1 pl-3 font-semibold text-gray-900">
            Filter by Education
          </h3>
          <ul className="text-sm font-medium text-gray-900">
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="10th"
                  type="radio"
                  value="10th"
                  name="educationLevel"
                  onChange={handleEducationLevel}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="10th"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  10th
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="12th"
                  type="radio"
                  value="12th"
                  name="educationLevel"
                  onChange={handleEducationLevel}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="12th"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  12th
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="Diploma"
                  type="radio"
                  value="Diploma"
                  name="educationLevel"
                  onChange={handleEducationLevel}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Diploma"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Diploma
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="Graduate"
                  type="radio"
                  value="Graduate"
                  name="educationLevel"
                  onChange={handleEducationLevel}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Graduate"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Graduate
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="PostGraduate"
                  type="radio"
                  value="Post Graduate / Master"
                  name="educationLevel"
                  onChange={handleEducationLevel}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="PostGraduate"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Post Graduate / Master
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="Doctorate"
                  type="radio"
                  value="Doctorate"
                  name="educationLevel"
                  onChange={handleEducationLevel}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Doctorate"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Doctorate
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/* filter by Gotra */}
        <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
          <h3 className="mb-1 pl-3 font-semibold text-gray-900">
            Filter by Gotra
          </h3>
          <ul className="text-sm font-medium text-gray-900">
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="काश्यप"
                  type="radio"
                  value="10th"
                  name="Gotra"
                  onChange={handleGotraSelect}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="10th"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  काश्यप
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="खालप"
                  type="radio"
                  value="खालप"
                  name="Gotra"
                  onChange={handleGotraSelect}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="खालप"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  खालप
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="गहिलम"
                  type="radio"
                  value="गहिलम"
                  name="Gotra"
                  onChange={handleGotraSelect}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="Diploma"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  गहिलम
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="गौतम"
                  type="radio"
                  value="गौतम"
                  name="Gotra"
                  onChange={handleGotraSelect}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="गौतम"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  गौतम
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="मांडव"
                  type="radio"
                  value="मांडव"
                  name="Gotra"
                  onChange={handleGotraSelect}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="मांडव"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  मांडव
                </label>
              </div>
            </li>
            <li className="w-full">
              <div className="flex items-center">
                <input
                  id="लोकाक्ष"
                  type="radio"
                  value="लोकाक्ष"
                  name="Gotra"
                  onChange={handleGotraSelect}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                />
                <label
                  htmlFor="लोकाक्ष"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  लोकाक्ष
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

        {isloading || isBiodataLoading ? (
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
        {/* <div className="pt-3 pb-10 flex gap-5 justify-center">
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
        </div> */}
        {/* Pagination End */}
      </div>
    </div>
  );
};

export default Biodatas;
