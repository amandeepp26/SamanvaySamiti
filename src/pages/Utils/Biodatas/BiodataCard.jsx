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
      <div className="flex flex-col md:flex-row gap-2 h-[300px] shadow-md hover:shadow-lg bg-white rounded-md border border-[#9b59d91c] hover:border-[#9b59d952] ">
        <div className="mt-4 md:mt-0 relative inline-block w-[full] h-[full]">
          <Link to={`/biodata/${_id}`}>
            <img
              className="full opacity-80"
              src={
                "https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
              }
              alt="profile image"
            />
            {isPro === "Premium" && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "2px 5px",
                  borderRadius: "0px 0px 0px 8px",
                  fontSize: "11px",
                }}
                className="bg-primary-normal text-white"
              >
                Premium
              </span>
            )}
            <div
              className="absolute bottom-0 left-0 right-0 text-white p-2"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here
              }}
            >
              <p className="text-lg font-bold">{type}</p>
              <p>{`Age: ${age}`}</p>
              <p>{`Occupation: ${occupation}`}</p>
            </div>
          </Link>
        </div>
        {/* <div className="flex gap-3 items-center justify-center md:flex-col">
          <div className="relative group">
            <button className="md:block mr-3 p-2 rounded-full text-primary-normal text-lg border border-primary-normal hover:bg-primary-normal hover:text-white">
              <MdFavoriteBorder />
            </button>
            <div className="absolute hidden bg-gray-800 text-white text-xs p-1 rounded-md -mt-[66px] -ml-3 group-hover:block">
              Favorite
            </div>
          </div>

          <div className="relative group">
            <button className="md:block mr-3 p-2 rounded-full text-primary-normal text-lg border border-primary-normal hover:bg-primary-normal hover:text-white">
              <MdOutlineEmail />
            </button>
            <div className="absolute hidden bg-gray-800 text-white text-xs p-1 rounded-md -mt-[66px] -ml-3 group-hover:block">
              Contact
            </div>
          </div>

          <div className="relative group">
            <button className="md:block mr-3 p-2 rounded-full text-primary-normal text-lg border border-primary-normal hover:bg-primary-normal hover:text-white">
              <IoChatbubblesOutline />
            </button>
            <div className="absolute hidden bg-gray-800 text-white text-xs p-1 rounded-md -mt-[66px] -ml-0 group-hover:block">
              Chat
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BiodataCard;

BiodataCard.propTypes = {
  item: PropTypes.object,
};
