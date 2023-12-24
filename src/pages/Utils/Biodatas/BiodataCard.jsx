import PropTypes from "prop-types";
import { MdFavoriteBorder, MdOutlineEmail } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import premium from "../../../assets/img/premium.png";

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
      <div className="flex flex-col mx-3 mt-5 md:flex-row gap-2 shadow-md hover:shadow-lg bg-white rounded-md">
        <Link to={`/biodata/${item.serial_no}`} className="w-full">
          <div className="relative bg-white border border-gray-200 rounded-lg shadow">
            <a
              href="#"
              className="block w-full h-[300px] overflow-hidden rounded-t-lg"
            >
              <img
                className="w-full h-fit object-cover"
                src={item?.personal_details?.photo[0]}
                alt=""
                draggable={false}
              />
            </a>
            {item?.featured && (
              <img
                src={premium}
                className="w-[40px] absolute top-0 left-0 h-[40px]"
              />
              // <span className="absolute top-3 left-3 bg-yellow-600 rounded-full text-[12px] px-2 text-white">
              //   Premium
              // </span>
            )}
            <div className="p-3 leading-1">
              <h4 className="font-semibold text-md">{item.serial_no}</h4>
              <p className="mb-3 font-semibold text-gray-700 w-[250px] dark:text-gray-400">{`${item?.personal_details?.fullname}`}</p>
              {item?.professional_details?.work_city && (
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item?.professional_details?.work_city}`}</p>
              )}
              <div>
                <div className="bg-red-600 text-white font-bold py-1 px-2 rounded-tl-lg rounded-br-lg absolute bottom-5 right-3">
                  {item?.personal_details?.gotra}
                </div>
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
