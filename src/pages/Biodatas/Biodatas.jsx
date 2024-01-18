import { useEffect, useState } from "react";
import useBiodatas from "../../hooks/useBiodatas";
import LoaderIcon from "../Utils/LoaderIcon";
import BiodataCard from "../Utils/Biodatas/BiodataCard";
import "./Biodatas.css";
import MultiRangeSlider from "multi-range-slider-react";
import useTotalBiodataForPagination from "../../hooks/useTotalBiodataForPagination";
import { Link } from "react-router-dom";
import Select from "react-select";

const Biodatas = () => {
  const [viewAll, setViewAll] = useState(null);
  const [typeValue, setTypeValue] = useState(
    localStorage.getItem("user") === "उपवर" ? "उपवधु" : "उपवर"
  );
  const [searchBarClicked, setSearchBarClicked] = useState(false);
  const [isVisible, setisvisible] = useState(false);
  const [divisionValue, setDivisionValue] = useState(null);
  const [isloading, setisloading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [cityquery,setCityQuery] = useState('');
  const [selectedGotras, setSelectedGotras] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState([]);
  const [selectedEducations, setSelectedEducations] = useState([]);

  const [minMaxAutoRunStop, setMinMaxAutoRunStop] = useState(true);

  const [minValue, setMinValue] = useState(18);
  const [maxValue, setMaxValue] = useState(60);

  const [minWeightValue, setMinWeightValue] = useState(35);
  const [maxWeightValue, setMaxWeightValue] = useState(140);

    const [minHeightValue, setMinHeightValue] = useState(48);
    const [maxHeightValue, setMaxHeightValue] = useState(84);

    const [cities,setCities] = useState([]);
  // --------------------------------- PAGINATION ------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const { totalBiodataForPagination } = useTotalBiodataForPagination();
  const [totalPaginationBiodata, setTotalPaginationBiodata] = useState(0);

  const numberOfPages = Math.ceil(totalPaginationBiodata / itemsPerPage);

  const [users, setUsers] = useState([]);
  // const [biodatas, , isBiodataLoading] = useBiodatas(
  //   viewAll,
  //   typeValue,
  //   divisionValue,
  //   minValue,
  //   maxValue,
  //   currentPage,
  //   itemsPerPage
  // );

  // const pages = [];
  // for (let i = 0; i < numberOfPages; i++) {
  //     pages.push(i + 1);
  // }

    useEffect(() => {
        fetchData(); // Call when dependencies change after initial load
      
    }, [
      minValue,
      maxValue,
      minWeightValue,
      maxWeightValue,
      typeValue,
      selectedGotras,
      selectedEducations,
      selectedProfession,
      cityquery,
      viewAll
    ]);

  const myId = localStorage.getItem("userId");

  const fetchData = async () => {
    setisloading(true);
    try {
      // Prepare the request payload
      const requestBody = {
      };

      if (typeValue) {
        requestBody.gender = typeValue;
      }
      if (minWeightValue) {
        requestBody.minWeight = minWeightValue;
      }
      if (maxWeightValue) {
        requestBody.maxWeight = maxWeightValue;
      }

      // if (minHeightValue) {
      //   requestBody.minHeight = 48;
      // }
      // if (maxHeightValue) {
      //   requestBody.maxHeight = 84;
      // }
      if (minValue) {
        requestBody.minAge = minValue;
      }
      if (maxValue) {
        requestBody.maxAge = maxValue;
      }
      if (cityquery!=='') {
        requestBody.searchQuery = cityquery;
      }
      // Add education_level_completed to the request payload if educationLevel has data
      if (selectedEducations.length >0) {
        requestBody.education_level_completed = selectedEducations;
      }
      if (selectedGotras.length>0) {
        requestBody.gotra = selectedGotras;
      }
      if (selectedProfession.length > 0) {
        requestBody.profession = selectedProfession;
      }
      // if(cityquery){
      //   requestBody.location = cityquery;
      // }

      const response = await fetch(
        "https://api.welkinhawk.in.net/api/users/search-users",
        // "http://localhost:8000/api/users/search-users",
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
      // Sort users based on serial_no
       const filteredUsers = result.result.filter((user) => user._id !== myId);
       // Sort users based on serial_no
       const sortedUsers = filteredUsers.sort((a, b) =>
         a.serial_no.localeCompare(b.serial_no)
       );

       setUsers(sortedUsers);
      setisloading(false);
    } catch (error) {
    console.error("Error fetching data:", error.message);
  } finally {
    setisloading(false);
  }

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

  const handleViewAll = (e) => {
    setViewAll(e);
    setCityQuery('')
    setTypeValue(null);
    setSelectedEducations([]);
    setSelectedGotras([]);
    setSelectedProfession([])
    setMinHeightValue(null);
    setMaxHeightValue(null);
    setMinWeightValue(35);
    setMaxWeightValue(140);
    setSearchQuery('');
    setMinValue(18);
    setMaxValue(60);
  };
  const handleTypeValue = () => {
    setViewAll(null);
  };

  useEffect(() => {
    setMinMaxAutoRunStop(false);
  }, [viewAll, typeValue, divisionValue, minValue, maxValue]);

  const handleAgeInput = (e) => {
    setViewAll(null);
    if ((!viewAll) && !minMaxAutoRunStop) {
      setMinValue(e.minValue);
      setMaxValue(e.maxValue);
    }
  };

  useEffect(()=>{

  },[searchBarClicked])
    const fetchCity = async (e) => {
      try {
        const response = await fetch(
          `https://api.welkinhawk.in.net/api/users/get-city?q=${e}`
          // `http://localhost:8000/api/users/get-city?q=${e}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const result = await response.json();
        if(result.status){
        setCities(result.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const handleWeightInput = (e) => {
      setViewAll(null);
      if ((!viewAll) && !minMaxAutoRunStop) {
        setMinWeightValue(e.minValue);
        setMaxWeightValue(e.maxValue);
      }
    };

        const handleHeightInput = (e) => {
          setViewAll(null);
          if (
            (!viewAll) &&
            !minMaxAutoRunStop
          ) {
            setMinHeightValue(e.minValue);
            setMaxHeightValue(e.maxValue);
          }
        };

         const formatHeight = (heightInInches) => {
           const feet = Math.floor(heightInInches / 12);
           const inches = heightInInches % 12;
           return `${feet}'${inches < 10 ? "0" : ""}${inches}"`;
         };
//  className = "container w-[120%] grid lg:grid-cols-4 lg:gap-2";
  return (
    <div className="grid px-5 lg:gap-2 lg:grid-cols-6 ">
      {/* Filter Section  */}
      <div className="border-b-2 lg:border-b-0 lg:border-r bg-[#ffffffc2] ">
        {/* View All  */}

        <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
          <h3 className="pl-3 font-semibold text-gray-900">Search </h3>
          <div>
            <div
              onClick={() => setSearchBarClicked(!searchBarClicked)}
              className="mb-4 lg:mb-0 lg:w-full lg:mr-4 my-5"
            >
              <input
                type="text"
                className="p-2 border text-sm border-gray-300 rounded w-full"
                placeholder="Enter city, user name or serial no.."
                value={cityquery}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setCityQuery(inputValue);
                  // Check length for string
                  if (inputValue.length >= 2) {
                    fetchCity(inputValue);
                    setisvisible(true);
                  } else {
                    setisvisible(false);
                  }
                }}
              />
            </div>
          </div>
          <div className="background-white pt-3" style={{ zIndex: 999 }}>
            <ul>
              {cities?.map((city, index) => (
                <li
                  className="py-1 cursor-pointer"
                  key={index}
                  onClick={() => {
                    setCityQuery(city), setViewAll(null), setisvisible(false);
                  }}
                >
                  {" "}
                  🔍 {city}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* {searchBarClicked && ( */}
        <div className={`lg:block ${searchBarClicked ? "" : "hidden"}`}>
          <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-7">
            {/* <h3 className="mb-1 pl-3 font-semibold text-gray-900">
            Show all profiles
          </h3> */}
            <ul className="text-sm font-medium text-gray-900">
              <li className="w-full">
                <div className="flex items-center">
                  <input
                    id="viewAll"
                    type="radio"
                    value="viewAll"
                    checked={viewAll}
                    name="filter"
                    onChange={(e) => handleViewAll(e.target.value)}
                    className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-primary-normal cursor-pointer"
                  />
                  <label
                    htmlFor="viewAll"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Show all profiles
                  </label>
                </div>
              </li>
            </ul>
          </div>

          {/* Filter by Type  */}
          <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
            <h3 className="mb-1 pl-3 font-semibold text-gray-900">
              Filter by उपवर/उपवधु
            </h3>
            <ul className="text-sm font-medium text-gray-900">
              <li className="w-full">
                <div
                  onClick={() => handleTypeValue()}
                  className="flex items-center"
                >
                  <input
                    id="male"
                    type="radio"
                    value="उपवर"
                    name="filter"
                    checked={typeValue === "उपवर"}
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
                <div
                  onClick={() => handleTypeValue()}
                  className="flex items-center"
                >
                  <input
                    id="female"
                    type="radio"
                    value="उपवधु"
                    name="filter"
                    checked={typeValue === "उपवधु"}
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
          {/* Filter by Gotra  */}
          <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
            <h3 className="mb-1 pl-3 font-semibold text-gray-900">
              Filter by Gotra
            </h3>
            <Select
              isMulti
              options={[
                { value: "काश्यप", label: "काश्यप" },
                { value: "खालप", label: "खालप" },
                { value: "गहिलम", label: "गहिलम" },
                { value: "गौतम", label: "गौतम" },
                { value: "मांडव", label: "मांडव" },
                { value: "लोकाक्ष", label: "लोकाक्ष" },
              ]}
              onChange={(selectedOptions) => {
                setSelectedGotras(
                  selectedOptions.map((option) => option.label)
                );
                setViewAll(null);
              }}
              value={selectedGotras.map((label) => ({ label, value: label }))}
            />
          </div>

          {/* Filter by Education */}
          <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
            <h3 className="mb-1 pl-3 font-semibold text-gray-900">
              Filter by Education
            </h3>
            <Select
              isMulti
              options={[
                { value: "10th", label: "10th" },
                { value: "12th", label: "12th" },
                { value: "Diploma", label: "Diploma" },
                { value: "Graduate", label: "Graduate" },
                { value: "PostGraduate", label: "Post Graduate / Master" },
                { value: "Doctorate", label: "Doctorate" },
              ]}
              onChange={(selectedOptions) => {
                setSelectedEducations(
                  selectedOptions.map((option) => option.label)
                );
                setViewAll(null);
              }}
              value={selectedEducations.map((label) => ({
                label,
                value: label,
              }))}
            />
          </div>

          {/* Filter by Profession  */}
          <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
            <h3 className="mb-1 pl-3 font-semibold text-gray-900">
              Filter by Profession
            </h3>
            <Select
              isMulti
              options={[
                { value: "सरकारी नोकरी", label: "सरकारी नोकरी" },
                { value: "खाजगी नोकरी", label: "खाजगी नोकरी" },
                { value: "व्यवसाय मालक", label: "व्यवसाय मालक" },
                {
                  value: "स्वयंरोजगार व्यावसायिक",
                  label: "स्वयंरोजगार व्यावसायिक",
                },
              ]}
              onChange={(selectedOptions) => {
                setSelectedProfession(
                  selectedOptions.map((option) => option.label)
                );
                setViewAll(null);
              }}
              value={selectedProfession.map((label) => ({
                label,
                value: label,
              }))}
            />
          </div>

          {/* Filter by Height  */}

          {/* <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
            <h3 className="pl-3 font-semibold text-gray-900">
              Filter by Height
            </h3>
            <div>
              <div className="range">
                <h1 className="flex justify-between font-medium text-sm max-w-[260px] mx-auto mb-5">
                  <span>Min {formatHeight(minHeightValue)}</span>{" "}
                  <span>TO</span>{" "}
                  <span>Max {formatHeight(maxHeightValue)}</span>
                </h1>
                <MultiRangeSlider
                  min={48} // 4ft in inches
                  max={84} // 7ft in inches
                  ruler={false}
                  step={1}
                  minValue={minHeightValue}
                  maxValue={maxHeightValue}
                  onChange={(e) => handleHeightInput(e)}
                />
              </div>
            </div>
          </div> */}
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
                  min={18}
                  max={60}
                  step={1}
                  ruler={false}
                  minValue={minValue}
                  maxValue={maxValue}
                  barInnerColor="#D10002"
                  onChange={(e) => {
                    handleAgeInput(e);
                  }}
                  // onClick={()=>handleAgeInput}
                />
              </div>
            </div>
          </div>

          {/* Filter by Weight  */}
          <div className="m-3 p-2 bg-white border border-gray-200 rounded-sm mt-5">
            <h3 className="pl-3 font-semibold text-gray-900">
              Filter by Weight
            </h3>
            <div>
              <div className="range">
                <h1 className="flex justify-between font-medium text-sm max-w-[260px] mx-auto mb-5">
                  <span>Min {minWeightValue}</span> <span>TO</span>{" "}
                  <span>Max {maxWeightValue}</span>
                </h1>
                <MultiRangeSlider
                  min={35}
                  max={140}
                  step={1}
                  ruler={false}
                  minValue={minWeightValue}
                  maxValue={maxWeightValue}
                  barInnerColor="#D10002"
                  onChange={(e) => {
                    handleWeightInput(e);
                  }}
                  // onClick={handleWeightInput}
                />
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>

      {/* Content section  */}
      <div className="lg:col-span-5 overflow-auto">
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

        {isloading ? (
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
                <h2 className="text-xl text-center mt-3">
                  Total:{" "}
                  <span className="font-medium" style={{ color: "#D10002" }}>
                    {users?.length}
                  </span>{" "}
                  profiles found
                </h2>
                <div className="custom-media-query grid grid-cols-1 lg:grid-cols-4 gap-4 py-6">
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
