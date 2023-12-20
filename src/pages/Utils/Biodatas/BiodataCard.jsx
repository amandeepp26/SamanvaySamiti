import PropTypes from "prop-types";
import { MdFavoriteBorder, MdOutlineEmail } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const BiodataCard = ({ item }) => {
  const {
    img,
    biodataId,
    type,
    permanentDivision,
    age,
    occupation,
    _id,
    isPro,
  } = item;

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 h-fit shadow-md hover:shadow-lg bg-white rounded-md">
        <Link to={`/biodata/${_id}`}>
          <div className="relative bg-white border border-gray-200 rounded-lg shadow ">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
                alt=""
              />
              {isPro === "Premium" && (
                <span className="absolute top-3 left-3 bg-yellow-600 rounded-full text-[12px] px-2 text-white">
                  Premium
                </span>
              )}
            </a>
            <div className="p-5 leading-1">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800">
                  {type}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`Age: ${age}`}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`Occupation: ${occupation}`}</p>

              <a
                href="#"
                className="bg-primary-normal hover:bg-primary-hover inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg"
              >
                View
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BiodataCard;

BiodataCard.propTypes = {
  item: PropTypes.object,
};
