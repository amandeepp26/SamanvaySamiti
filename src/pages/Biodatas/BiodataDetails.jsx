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
  const [isloading, setisloading] = useState(true);
  const [userData, setUserData] = useState(null);
  const handleStoreFavorite = useStoreFavorite();

  useEffect(() => {
    console.log("id issss-------->", id);
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `https://api.welkinhawk.in.net/api/users/user-detail/${id}`
      );

      console.log("response------>", response);
      if (!response.ok) {
        setisloading(false);
        setUserData(null);
      } else {
        const data = await response.json();
        console.log(data); // Log the fetched data
        setUserData(data.profile);
        setisloading(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    refetchTypeBiodatas();
  }, [singleBiodata?.type, refetchTypeBiodatas, refetchSelfUser]);

  if (isloading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center flex-col">
        Loading......
      </div>
    );
  }
  return (
    <div className="w-4/6 container mx-auto bg-white grid ">
      {/* Left Content */}
      {userData === null ? (
        <div className="w-full h-[70vh] flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold text-red-500">No user found!</h2>
          <p className="text-md text-gray-500">Check the user id</p>
        </div>
      ) : (
        <div className="border-b-2 lg:border-b-0  pb-8 col-span-3">
          <div>
            <div className="my-3 flex relative flex-col items-center justify-center rounded-sm bg-gradient-to-r from-pink-200 via-pink-400 to-red-400 h-80">
              <img
                className="w-48 h-48 rounded-full border border-4"
                src={userData?.personal_details?.photo[0]}
              />
              <p className="text-[28px] font-bold text-gray-800 pt-2">
                {" "}
                {userData?.personal_details?.fullname}
              </p>
              <p className="text-dark text-3xl font-bold py-1 px-10 rounded-tl-lg absolute top-5 left-2">
                {userData?.serial_no}
              </p>
              <div className="bg-blue-800 text-white font-bold py-1 px-10 rounded-tl-lg rounded-br-lg absolute top-5 right-5">
                {userData?.personal_details?.gotra}
              </div>
              <div
                className={`${
                  userData?.personal_details?.gender === "उपवर"
                    ? "bg-blue-200 text-dark"
                    : "bg-blue-400 text-white"
                } font-bold py-1 px-10 rounded-tr-lg rounded-bl-lg absolute top-[60px] right-5`}
              >
                {userData?.personal_details?.gender}
              </div>
            </div>
            <h1 className="font-bold text-3xl py-2 text-start">
              <span className="font-bold"></span>
            </h1>
            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
              वैयक्तिक माहिती
            </h1>
            {/* <p className="py-2 text-xl">
              Name :
              <span className="font-bold text-2xl">
                {" "}
                {userData?.personal_details?.fullname}
              </span>
            </p> */}

            <div className="grid grid-cols-2 gap-1">
              <p className="py-1">
                <span className="font-medium">जन्मनाव :</span>{" "}
                {userData?.personal_details?.birth_name}
              </p>
              <p className="py-1">
                <span className="font-medium">जन्मदिनांक :</span>{" "}
                {userData?.personal_details?.birth_date}
              </p>
              <p className="py-1">
                <span className="font-medium">जन्मवेळ :</span>{" "}
                {userData?.personal_details?.birth_time}
              </p>
              {/* <p className="py-1">
                <span className="font-medium">Day Of Birth :</span> Monday
              </p> */}

              <p className="py-1">
                <span className="font-medium">जन्मस्थान :</span>{" "}
                {userData?.personal_details?.birth_place}
              </p>

              {/* <p className="py-1">
                <span className="font-medium">Gotra :</span>{" "}
                {userData?.personal_details?.gotra}
              </p> */}
              <p className="py-1">
                <span className="font-medium">उंची :</span>{" "}
                {userData?.personal_details?.height}
              </p>
              <p className="py-1">
                <span className="font-medium">रक्त गट :</span>{" "}
                {userData?.personal_details?.blood_group}
              </p>
              <p className="py-1">
                <span className="font-medium">वजन :</span>{" "}
                {userData?.personal_details?.weight} किलो
              </p>
              <p className="py-1">
                <span className="font-medium">कुलदेवी :</span>{" "}
                {userData?.personal_details?.kuldevi}
              </p>
              {/* <p className="py-1">
                <span className="font-medium">Gender :</span>{" "}
                {userData?.personal_details?.gender}
              </p> */}
              {/* <p className="py-1">
            <span className="font-medium">Age :</span> {singleBiodata?.age}
          </p> */}
            </div>
            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
              शैक्षणिक/पदवी तपशील
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <p className="py-1">
                <span className="font-medium">शिक्षण पातळी पूर्ण : </span>
                {userData?.educational_details?.education_level}
              </p>
              <p className="py-1">
                <span className="font-medium">शैक्षणिक/पदवी तपशील : </span>
                {userData?.educational_details?.education_detail}
              </p>
              <p className="py-1">
                <span className="font-medium">विशेष शिक्षण : </span>
                {userData?.educational_details?.special_education}
              </p>
              <p className="py-1 ">
                <span className="font-medium">स्वतः बद्दल विशेष माहिती : </span>{" "}
                {userData?.professional_details?.special_information}
              </p>
            </div>
            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
              नोकरी/व्यावसायिक तपशील
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <p className="py-1 ">
                <span className="font-medium">नोकरी/व्यवसाय पद : </span>{" "}
                {userData?.professional_details?.profession}
              </p>
              <p className="py-1">
                <span className="font-medium">
                  कंपनी अथवा व्यवसायाचे नाव :{" "}
                </span>{" "}
                {userData?.professional_details?.company_name}
              </p>

              <p className="py-1">
                <span className="font-medium">नोकरी/व्यवसायाचा पत्ता :</span>{" "}
                {userData?.professional_details?.job_address}
              </p>
              <p className="py-1">
                <span className="font-medium">एकूण मासिक वेतन :</span>{" "}
                {userData?.professional_details?.monthly_income} (
                {userData?.professional_details.payment_currency})
              </p>
              <p className="py-1">
                <span className="font-medium">साप्ताहिक सुट्टी :</span>{" "}
                {userData?.professional_details?.weekly_holiday}
              </p>
            </div>
            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
              संपर्क
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <p className="py-1">
                <span className="font-medium">मोबाईल क्रमांक :</span>{" "}
                {userData?.contact_details?.mobile}
              </p>
              <p className="py-1">
                <span className="font-medium">दूरध्वनी क्रमांक :</span>{" "}
                {userData?.phone}
              </p>
              <p className="py-1">
                <span className="font-medium">ईमेल :</span> {userData?.email}
              </p>
              <p className="py-1">
                <span className="font-medium">सध्याचा राहण्याचा पत्ता :</span>{" "}
                {userData?.family_details.address}
              </p>
              <p className="py-1">
                <span className="font-medium">जोडीदाराबद्दल अपेक्षा :</span>{" "}
                {userData?.contact_details?.partner_expectations}
              </p>
            </div>
            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
              पालक
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <p className="py-1">
                <span className="font-medium">पालक / वडिलांचे पूर्ण नाव :</span>{" "}
                {userData?.family_details.fathers_name}
              </p>
              <p className="py-1">
                <span className="font-medium">पालकांचा व्यवसाय :</span>{" "}
                {userData?.family_details?.guardians_profession}
              </p>
              <p className="py-1">
                <span className="font-medium">नोकरी / पद :</span>{" "}
                {userData?.family_details?.designation}
              </p>
              <p className="py-1">
                <span className="font-medium">पालकांचा मोबाईल क्रमांक :</span>
                {userData?.family_details?.parents_phone}
              </p>

              {/* <p className="py-1">
                <span className="font-medium">Grand-parent's name :</span>
                {userData?.fathers_family_details?.grandfather_name}
              </p> */}
              <p className="py-1">
                <span className="font-medium">पालकांचा संपूर्ण पत्ता :</span>{" "}
                {userData?.family_details?.address}
              </p>
              <p className="py-1">
                <span className="font-medium">आईचे संपूर्ण नाव :</span>{" "}
                {userData?.family_details?.mothers_name}
              </p>
              <p className="py-1">
                <span className="font-medium">मोबाईल क्रमांक :</span>{" "}
                {userData?.family_details?.mothers_phone}
              </p>

              {/* {userData?.fathers_family_details?.kaka
                ?.filter(
                  (kakaName) => kakaName !== null && kakaName.trim() !== ""
                ) // Filter out null and empty strings
                .map((kakaName, index) => (
                  <p key={index} className="py-1">
                    {index === 0 && (
                      <span className="font-medium">Kaka : </span>
                    )}
                    • {kakaName}
                  </p>
                ))}
              {userData?.fathers_family_details?.fuva
                ?.filter(
                  (kakaName) => kakaName !== null && kakaName.trim() !== ""
                ) // Filter out null and empty strings
                .map((kakaName, index) => (
                  <p key={index} className="py-1">
                    {index === 0 && (
                      <span className="font-medium">Fuwa : </span>
                    )}
                    • {kakaName}
                  </p>
                ))}
              {userData?.fathers_family_details?.mama
                ?.filter(
                  (kakaName) => kakaName !== null && kakaName.trim() !== ""
                ) // Filter out null and empty strings
                .map((kakaName, index) => (
                  <p key={index} className="py-1">
                    {index === 0 && (
                      <span className="font-medium">Mama : </span>
                    )}
                    • {kakaName}
                  </p>
                ))}
              {userData?.fathers_family_details?.mavsa
                ?.filter(
                  (kakaName) => kakaName !== null && kakaName.trim() !== ""
                ) // Filter out null and empty strings
                .map((kakaName, index) => (
                  <p key={index} className="py-1">
                    {index === 0 && (
                      <span className="font-medium">Mausa : </span>
                    )}
                    • {kakaName}
                  </p>
                ))} */}
            </div>
          </div>

          <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            भाऊ
          </h1>
          <div className="grid grid-cols-2 gap-1">
            <p className="py-1">
              <span className="font-medium">बन्धु - विवाहित :</span>{" "}
              {userData?.brothers_details?.brother_married}
            </p>
            <p className="py-1">
              <span className="font-medium">बन्धु - अविवाहित :</span>{" "}
              {userData?.brothers_details?.brother_unmarried}
            </p>
            {userData?.brothers_details?.father_in_law_name_phone
              ?.filter(
                (kakaName) => kakaName !== null && kakaName.trim() !== ""
              ) // Filter out null and empty strings
              .map((kakaName, index) => (
                <p key={index} className="py-1">
                  {index === 0 && (
                    <span className="font-medium">
                      बंधूंच्या सासऱ्यांचे नाव आणि मोबाईल नंबर :{" "}
                    </span>
                  )}
                  • {kakaName}
                </p>
              ))}
            {/* <p className="py-1">
                <span className="font-medium">बंधूंच्या सासऱ्यांचे नाव आणि मोबाईल नंबर :</span>{" "}
                Ankush Singh
              </p>
              <p className="py-1">
                <span className="font-medium">Married Brother name :</span>{" "}
                Sanjay Singh
              </p> */}
          </div>
          <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            भगिनी
          </h1>
          <div className="grid grid-cols-2 gap-1">
            <p className="py-1">
              <span className="font-medium">भगिनी - विवाहित :</span>{" "}
              {userData?.sisters_details.sisters_married}
            </p>
            <p className="py-1">
              <span className="font-medium">भगिनी - अविवाहित :</span>{" "}
              {userData?.sisters_details.sisters_unmarried}
            </p>
            {userData?.sisters_details?.brothers_in_law_name_phone
              ?.filter(
                (kakaName) => kakaName !== null && kakaName.trim() !== ""
              ) // Filter out null and empty strings
              .map((kakaName, index) => (
                <p key={index} className="py-1">
                  {index === 0 && (
                    <span className="font-medium">
                      बहिण व यजमानांचे नाव आणि मोबाईल नंबर :{" "}
                    </span>
                  )}
                  • {kakaName}
                </p>
              ))}
            {/* <p className="py-1">
                <span className="font-medium">Married Sister name :</span>{" "}
                sjhdjsh jhdshjb
              </p>
              <p className="py-1">
                <span className="font-medium">Married Sister name :</span>{" "}
                dhudfd
              </p> */}
          </div>
          <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            आजोबा
          </h1>
          <div className="grid grid-cols-2 gap-1">
            <p className="py-1">
              <span className="font-medium">आजोबांचे नाव :</span>{" "}
              {userData?.fathers_family_details?.grandfather_name}
            </p>
            <p className="py-1">
              <span className="font-medium">आजोबांचे मूळ गाव :</span>{" "}
              {userData?.fathers_family_details?.grandfather_village}
            </p>
            {userData?.fathers_family_details?.kaka
              ?.filter(
                (kakaName) => kakaName !== null && kakaName.trim() !== ""
              ) // Filter out null and empty strings
              .map((kakaName, index) => (
                <p key={index} className="py-1">
                  {index === 0 && <span className="font-medium">काका : </span>}•{" "}
                  {kakaName}
                </p>
              ))}
            {userData?.fathers_family_details?.fuva
              ?.filter(
                (kakaName) => kakaName !== null && kakaName.trim() !== ""
              ) // Filter out null and empty strings
              .map((kakaName, index) => (
                <p key={index} className="py-1">
                  {index === 0 && <span className="font-medium">फुवा : </span>}•{" "}
                  {kakaName}
                </p>
              ))}
          </div>
          <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            आजोळ
          </h1>
          <div className="grid grid-cols-2 gap-1">
            <p className="py-1">
              <span className="font-medium">आजोबांचे नाव :</span>{" "}
              {userData?.mothers_family_details?.grandfather_name}
            </p>
            <p className="py-1">
              <span className="font-medium">आजोबांचे मूळ गाव :</span>{" "}
              {userData?.mothers_family_details?.grandfather_village}
            </p>
            {userData?.fathers_family_details?.mama
              ?.filter(
                (kakaName) => kakaName !== null && kakaName.trim() !== ""
              ) // Filter out null and empty strings
              .map((kakaName, index) => (
                <p key={index} className="py-1">
                  {index === 0 && <span className="font-medium">मामा : </span>}•{" "}
                  {kakaName}
                </p>
              ))}
            {userData?.fathers_family_details?.mavsa
              ?.filter(
                (kakaName) => kakaName !== null && kakaName.trim() !== ""
              ) // Filter out null and empty strings
              .map((kakaName, index) => (
                <p key={index} className="py-1">
                  {index === 0 && <span className="font-medium">मावसा : </span>}
                  • {kakaName}
                </p>
              ))}
          </div>
          {/* <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            Contact Info
          </h1> */}

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
              {/* <Link to={`/checkout/${singleBiodata?._id}`}>
                <button className="py-2 px-3 mt-5 text-sm rounded bg-primary-normal text-white">
                  Request for contact info
                </button>
              </Link> */}
            </>
          )}
        </div>
      )}

      {/* Right Image */}
    </div>
  );
};

export default BiodataDetails;
