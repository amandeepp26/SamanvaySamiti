import PropTypes from "prop-types";
import { MdFavoriteBorder, MdOutlineEmail } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ribbonImage from "../../../assets/img/ribbon.png";
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
      <div className="flex flex-wrap mx-5 mt-5 gap-2">
        <Link to={`/biodata/${item.serial_no}`} className="w-full md:w-4/6">
          <div className="relative bg-white border border-gray-200 rounded-lg shadow">
            <a
              href="#"
              className="block w-full h-60 overflow-hidden rounded-t-lg"
            >
              <img
                className="w-full h-72 object-cover"
                src={item?.personal_details?.photo[0]}
                alt=""
              />
            </a>
            {/* {isPro === "Premium" && (
        <span className="absolute top-3 left-3 bg-yellow-600 rounded-full text-[12px] px-2 text-white">
          Premium
        </span>
      )} */}
            <div className="p-5 leading-1">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800">
                  {type}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item?.personal_details?.fullname}`}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item?.personal_details?.gotra}`}</p>

              {/* Ribbon background for Gotra */}
              <div className="absolute bottom-0 right-3 py-5 px-2 rounded-md">
                <img src={ribbonImage} className="w-20 h-10 " />
                <p className="font-normal text-white">
                  {`${item?.personal_details?.gotra}`}
                </p>
              </div>
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
