import { Link, useParams } from "react-router-dom";
import LoaderIcon from "../Utils/LoaderIcon";
import { useEffect, useState } from "react";
import useTypeBiodatas from "../../hooks/useTypeBiodatas";
import useSingleBiodataById from "../../hooks/useSingleBiodataById";
import { MdFavoriteBorder } from "react-icons/md";
import useStoreFavorite from "../../hooks/useStoreFavorite";
import useSelfUser from "../../hooks/useSelfUser";
import BiodataCard from "../Utils/Biodatas/BiodataCard";

const BiodataDetails = () => {
  const { id } = useParams();
  const [singleBiodata, , isSingleBiodataLoading] = useSingleBiodataById(id);
  const [typeBiodatas, refetchTypeBiodatas, isTypeBiodataLoading] =
    useTypeBiodatas(singleBiodata?.type);

  const { selfUser, refetchSelfUser } = useSelfUser();
  const [userData, setUserData] = useState(null);
  const handleStoreFavorite = useStoreFavorite();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const userId = 230002;
      const response = await fetch(
        `https://api.samanvaysamiti.com/api/users/user-detail/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      console.log(data); // Log the fetched data
      setUserData(data.profile);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    refetchTypeBiodatas();
  }, [singleBiodata?.type, refetchTypeBiodatas, refetchSelfUser]);

  return (
    <div className="w-4/6 container mx-auto bg-white px-5 grid lg:grid-cols-4 lg:gap-3">
      {/* Left Content */}
      <div className="border-b-2 lg:border-b-0  pb-8 col-span-3">
        <div className="p-5 ">
          <h1 className="font-bold text-3xl py-2 text-start">
            <span className="font-bold"></span> #{userData?.serial_no}
          </h1>

          <p className="py-2 text-xl">
            Name :
            <span className="font-bold text-2xl">
              {" "}
              {userData?.personal_details?.fullname}
            </span>
          </p>

          <p className="py-1">
            <span className="font-medium">Birth Name :</span>{" "}
            {userData?.personal_details?.birth_name}
          </p>
          <div className="grid grid-cols-2 gap-1">
            <p className="py-1">
              <span className="font-medium">Date Of Birth :</span>{" "}
              {userData?.personal_details?.birth_date}
            </p>
            <p className="py-1">
              <span className="font-medium">Birth Time :</span>{" "}
              {userData?.personal_details?.birth_time}
            </p>
            <p className="py-1">
              <span className="font-medium">Day Of Birth :</span> Monday
            </p>

            <p className="py-1">
              <span className="font-medium">Place of Birth :</span>{" "}
              {userData?.personal_details?.birth_place}
            </p>

            <p className="py-1">
              <span className="font-medium">Gotra :</span>{" "}
              {userData?.personal_details?.gotra}
            </p>
            <p className="py-1">
              <span className="font-medium">Height :</span>{" "}
              {userData?.personal_details?.height}
            </p>

            <p className="py-1">
              <span className="font-medium">Kuldevi :</span>{" "}
              {userData?.personal_details?.kuldevi}
            </p>

            <p className="py-1">
              <span className="font-medium">Blood Group :</span>{" "}
              {userData?.personal_details?.blood_group}
            </p>

            <p className="py-1">
              <span className="font-medium">Education :</span>
              {userData?.educational_details?.education_level}
            </p>
            <p className="py-1">
              <span className="font-medium">Special education :</span>
              {userData?.educational_details?.special_education}
            </p>
            <p className="py-1">
              <span className="font-medium">Office Address :</span>{" "}
              {userData?.professional_details?.job_address}
            </p>
            {/* <p className="py-1">
            <span className="font-medium">Age :</span> {singleBiodata?.age}
          </p> */}

            <p className="py-1">
              <span className="font-medium">Gender :</span>{" "}
              {userData?.personal_details?.gender}
            </p>
            <p className="py-1 ">
              <span className="font-medium">Occupation :</span>{" "}
              {userData?.professional_details?.profession}
            </p>
            <p className="py-1">
              <span className="font-medium">Religion :</span>{" "}
              {singleBiodata?.religion}
            </p>
            <p className="py-1">
              <span className="font-medium">Monthly Income :</span>{" "}
              {userData?.professional_details?.monthly_income}
            </p>
            <p className="py-1">
              <span className="font-medium">Weekly Holiday:</span>{" "}
              {userData?.professional_details?.weekly_holiday}
            </p>
            <p className="py-1">
              <span className="font-medium">Weight :</span>{" "}
              {singleBiodata?.weight} kg
            </p>
            <p className="py-1">
              <span className="font-medium">Mobile no. :</span> +91 8755255090
            </p>
            <p className="py-1">
              <span className="font-medium">Email :</span> xyz@gmail.com
            </p>
            <p className="py-1">
              <span className="font-medium">Permanent Address :</span>{" "}
              dbhsdbsbduysh sbbhsufhbs hjsbfhhsifbs
            </p>
            <p className="py-1">
              <span className="font-medium">Expectations :</span> Educated,
              Desciplined
            </p>
            <p className="py-1">
              <span className="font-medium">Guardian name :</span>{" "}
              {singleBiodata?.fathersName}
            </p>
            <p className="py-1">
              <span className="font-medium">Guardian occupation :</span>{" "}
              Shopkeeper
            </p>
            <p className="py-1">
              <span className="font-medium">Guardian Address :</span> sjdjsh
              fdnfuekj fkjenkfjne febfkje
            </p>
            <p className="py-1">
              <span className="font-medium">Mother's name :</span> Mrs. Sanjana
            </p>
            <p className="py-1">
              <span className="font-medium">Grand-parent's name :</span> Mr.
              gvghvgh bhbvh
            </p>
            <p className="py-1">
              <span className="font-medium">Kaka :</span> Shopkeeper
            </p>
            <p className="py-1">
              <span className="font-medium">Fuwa :</span> Shopkeeper
            </p>
            <p className="py-1">
              <span className="font-medium">Mama :</span> Shopkeeper
            </p>
            <p className="py-1">
              <span className="font-medium">Mausa:</span> Shopkeeper
            </p>
          </div>

          <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            Brothers
          </h1>
          <div className="grid grid-cols-2 gap-1">
            <p className="py-1">
              <span className="font-medium">Married :</span> 2
            </p>
            <p className="py-1">
              <span className="font-medium">Unmarried :</span> 0
            </p>
            <p className="py-1">
              <span className="font-medium">Married Brother name :</span> Ankush
              Singh
            </p>
            <p className="py-1">
              <span className="font-medium">Married Brother name :</span> Sanjay
              Singh
            </p>
          </div>
          <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            Sisters
          </h1>
          <div className="grid grid-cols-2 gap-1">
            <p className="py-1">
              <span className="font-medium">Married :</span> 2
            </p>
            <p className="py-1">
              <span className="font-medium">Unmarried :</span> 0
            </p>
            <p className="py-1">
              <span className="font-medium">Married Sister name :</span> sjhdjsh
              jhdshjb
            </p>
            <p className="py-1">
              <span className="font-medium">Married Sister name :</span> dhudfd
            </p>
          </div>

          <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            Contact Info
          </h1>

          {selfUser.isPro === "Premium" ? (
            <>
              <p className="py-1">
                <span className="font-medium">Name :</span>{" "}
                {singleBiodata?.name}
              </p>
              <p className="py-1">
                <span className="font-medium">Mobile :</span>{" "}
                {singleBiodata?.mobile}
              </p>
              <p className="py-1">
                <span className="font-medium">Email :</span>{" "}
                {singleBiodata?.email}
              </p>
            </>
          ) : (
            <>
              <Link to={`/checkout/${singleBiodata?._id}`}>
                <button className="py-2 px-3 mt-5 text-sm rounded bg-primary-normal text-white">
                  Request for contact info
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden lg:block col-span-1">
        <div className="p-1">
          <div className="w-50  mx-auto relative mt-10">
            <img
              className="w-[80%] h-48 object-cover"
              // src={singleBiodata?.img}
              src="https://media.istockphoto.com/id/1308542628/photo/young-business-woman-stock-photo.jpg?s=612x612&w=0&k=20&c=ujynGrSE0kxNnz2FpAg76saIuq_BAvqF6qnAUUyoiGs="
              alt={singleBiodata?.name}
            />
            {/* <div className="group absolute top-3 right-1">
              <button
                onClick={() => handleStoreFavorite(singleBiodata)}
                className="md:block mr-3 p-2 rounded-full text-primary-normal text-lg border border-primary-normal hover:bg-primary-normal hover:text-white"
              >
                <MdFavoriteBorder />
              </button>
              <div className="absolute hidden bg-gray-800 text-white text-xs p-1 rounded-md -mt-[66px] -ml-3 group-hover:block">
                Favorite
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
