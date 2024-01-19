import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderIcon from "../../Utils/LoaderIcon";
import Swal from "sweetalert2";
import useSelfUser from "../../../hooks/useSelfUser";
import useSelfBiodata from "../../../hooks/useSelfBiodata";
import { useEffect, useState } from "react";
import { formatBirthDate } from "../../../Utils/FormatDate";
import { FaEnvelope, FaMobileAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [userData, setData] = useState(null);
  const [isloading, setisloading] = useState(true);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    getProfile();
  }, []);
const navigate = useNavigate();
  const getProfile = async () => {
    try {
      const response = await fetch(
        `https://api.welkinhawk.in.net/api/users/get-profile`,
        // "http://localhost:8000/api/users/get-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add other headers if needed
          },
        }
      );

      console.log("response------>", response);

      if (!response.ok) {
        setisloading(false);
        setData(null);
            // Check if the response status is not ok (e.g., 401 Unauthorized)
            if (response.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("isLoggedIn");
              navigate("/login");
            } 
      } else {
        const data = await response.json();
        console.log(data); // Log the fetched data
        setData(data.profile);
        setisloading(false);
      }
      if(response.error==='Unauthorized'){
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // const handleRequestForPro = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to make premium biodata",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes Please",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosSecure
  //         .put(`/request/user/to-pro/${user?.email}`)
  //         .then((res) => {
  //           if (
  //             res.data.resultForUser.modifiedCount > 0 &&
  //             res.data.resultForBiodata.modifiedCount > 0
  //           ) {
  //             Swal.fire({
  //               position: "center",
  //               icon: "success",
  //               title: `Request send for admin approve`,
  //               showConfirmButton: false,
  //               timer: 3000,
  //             });
  //           }
  //           refetchSelfUser();
  //           refetchSelfBiodata();
  //         })
  //         .catch((error) => {
  //           if (error.message) {
  //             Swal.fire({
  //               position: "center",
  //               icon: "warning",
  //               title: error.message,
  //               showConfirmButton: false,
  //               timer: 3000,
  //             });
  //           }
  //           refetchSelfUser();
  //           refetchSelfBiodata();
  //         });
  //     }
  //   });
  // };

  return (
    <div className="container mx-auto px-2 flex justify-center my-4">
      <div className="w-full shadow p-5 pb-6  mt-5">
        {isloading ? (
          <div className="flex justify-center items-center h-96">
            <div>
              {" "}
              <LoaderIcon />{" "}
            </div>
          </div>
        ) : (
          <>
            {userData ? (
              <>
                <div className="border-b-2 lg:border-b-0  pb-8 col-span-3">
                  <div>
                    <div className="my-2 flex relative flex-col items-center justify-center rounded-sm bg-gradient-to-r from-pink-200 via-pink-400 to-red-400 h-80">
                      <img
                        onClick={() => setIsImageModalOpen(true)}
                        className="w-32 h-32 mt-10 sm:mt-0 sm:w-48 sm:h-48 rounded-full border border-4"
                        src={userData?.personal_details?.photo[0]}
                        draggable={false}
                      />
                      <p className="text-[18px] sm:text-[28px] font-bold text-gray-800 pt-2">
                        {" "}
                        {userData?.personal_details?.fullname}
                      </p>
                      <p className="text-dark text-xl sm:text-3xl font-bold py-1 px-10 rounded-tl-lg absolute top-5 left-2">
                        {userData?.serial_no}
                      </p>
                      <div className="bg-blue-800 text-xs sm:text-lg text-white font-bold py-1 px-5 sm:px-10 rounded-tl-lg rounded-br-lg absolute top-5 right-5">
                        {userData?.personal_details?.gotra}
                      </div>
                      <div
                        className={`${
                          userData?.personal_details?.gender === "उपवर"
                            ? "bg-blue-200 text-dark"
                            : "bg-blue-400 text-white"
                        } text-xs sm:text-lg  font-bold py-1 px-5 sm:px-10 rounded-tr-lg rounded-bl-lg absolute top-[60px] right-5`}
                      >
                        {userData?.personal_details?.gender}
                      </div>
                    </div>
                    {/* <h1 className="font-bold text-3xl py-2 text-start">
              <span className="font-bold"></span>
            </h1> */}
                    <h1 className="text-base px-5 font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
                      वैयक्तिक माहिती
                    </h1>
                    <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
                      <p className="py-1">
                        <span className="font-medium">जन्मनाव :</span>{" "}
                        {userData?.personal_details?.birth_name}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">जन्मदिनांक : वेळ:</span>{" "}
                        {formatBirthDate(
                          userData?.personal_details?.birth_date
                        )}{" "}
                        : {userData?.personal_details?.birth_time}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">जन्मस्थान :</span>{" "}
                        {userData?.personal_details?.birth_place}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">रक्त गट :</span>{" "}
                        {userData?.personal_details?.blood_group}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">उंची :</span>{" "}
                        {userData?.personal_details?.height} (
                        {userData?.personal_details?.height_cm} cm)
                      </p>

                      <p className="py-1">
                        <span className="font-medium">वजन :</span>{" "}
                        {userData?.personal_details?.weight} किलो
                      </p>
                      <p className="py-1">
                        <span className="font-medium">कुलदेवी :</span>{" "}
                        {userData?.personal_details?.kuldevi}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">
                          सगोत्र विवाहास आपली मान्यता आहे का ? :
                        </span>{" "}
                        {userData?.contact_details?.consanguineous_marriage}
                      </p>
                    </div>

                    <div className="gap-1 py-1">
                      <p className="py-2 mx-5">
                        <span className="font-medium">
                          जोडीदाराबद्दल अपेक्षा :
                        </span>{" "}
                        {userData?.contact_details?.partner_expectations}
                      </p>
                      <p className="py-2 mx-5">
                        <span className="font-medium">
                          सध्याचा राहण्याचा पत्ता :
                        </span>{" "}
                        {userData?.contact_details?.current_address}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
                      <div>
                        <h1 className="text-base -mx-5 px-5 font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
                          शैक्षणिक/पदवी तपशील
                        </h1>
                        <div className="grid grid-cols-1 gap-1">
                          <p className="py-1">
                            <span className="font-medium">
                              शिक्षण पातळी पूर्ण :{" "}
                            </span>
                            {userData?.educational_details?.education_level}
                          </p>
                          <p className="py-1">
                            <span className="font-medium">पदवी : </span>
                            {userData?.educational_details?.education_detail}
                          </p>
                          <p className="py-1">
                            <span className="font-medium">विशेष शिक्षण : </span>
                            {userData?.educational_details?.special_education}
                          </p>
                          <p className="py-1 ">
                            <span className="font-medium">
                              स्वतः बद्दल विशेष माहिती :{" "}
                            </span>{" "}
                            {userData?.educational_details?.special_information}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
                          नोकरी/व्यावसायिक तपशील ({" "}
                          {userData?.professional_details?.profession})
                        </h1>
                        <div className="grid grid-cols-1 gap-1">
                          <p className="py-1">
                            <span className="font-medium">
                              कंपनी अथवा व्यवसायाचे नाव :{" "}
                            </span>{" "}
                            {userData?.professional_details?.company_name}
                          </p>
                          <p className="py-1 ">
                            <span className="font-medium">पद : </span>{" "}
                            {userData?.professional_details?.job_title}
                          </p>
                          <p className="py-1">
                            <span className="font-medium">
                              एकूण मासिक वेतन :
                            </span>{" "}
                            {userData?.professional_details?.monthly_income} (
                            {userData?.professional_details?.payment_currency})
                          </p>
                          <p className="py-1">
                            <span className="font-medium">
                              साप्ताहिक सुट्टी :
                            </span>{" "}
                            {userData.professional_details?.weekly_holiday
                              ?.split(",")
                              ?.map((day) => day.trim())
                              ?.join(", ")}
                          </p>
                          <p className="py-1">
                            <span className="font-medium">पत्ता :</span>{" "}
                            {userData?.professional_details?.job_address}
                          </p>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-base px-5 font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
                      संपर्क
                    </h1>
                    <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
                      <p className="py-1">
                        <span className="font-medium">मोबाईल क्रमांक :</span>{" "}
                        {userData?.phone}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">दूरध्वनी क्रमांक :</span>{" "}
                        {userData?.contact_details?.telephone}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">व्हॉट्सऐप :</span>{" "}
                        {userData?.contact_details?.whatsapp}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">ईमेल :</span>{" "}
                        {userData?.email}
                      </p>
                    </div>
                    <h1 className="text-base px-5 font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
                      कौटुंबिक परिचय
                    </h1>
                    <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
                      <p className="py-1">
                        <span className="font-medium">
                          {userData?.family_details?.guardian} :
                        </span>{" "}
                        {userData?.family_details.father.salutation}{" "}
                        {userData?.family_details.father.name}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">मोबाईल क्रमांक :</span>
                        {userData?.family_details?.father.mobile}
                      </p>
                      <p className="py-1">
                        <span className="font-medium"> व्यवसाय :</span>{" "}
                        {userData?.family_details?.guardians_profession}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">नोकरी / पद :</span>{" "}
                        {userData?.family_details?.designation}
                      </p>

                      <p className="py-1">
                        <span className="font-medium">आई :</span>{" "}
                        {userData?.family_details.mother.salutation}{" "}
                        {userData?.family_details?.mother.name}
                      </p>
                      <p className="py-1">
                        <span className="font-medium">मोबाईल क्रमांक :</span>{" "}
                        {userData?.family_details?.mother.mobile}
                      </p>
                    </div>
                    <p className="py-1 mx-5 mt-3">
                      <span className="font-medium">पत्ता :</span>{" "}
                      {userData?.family_details?.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
                    <div>
                      <h1 className="text-base font-medium -mx-5 px-5 text-primary-normal border-t border-b py-2 mt-6 mb-2">
                        बन्धु (अविवाहित :{" "}
                        {userData?.brothers_details.brother_unmarried} / विवाहित
                        :{userData?.brothers_details.brother_married})
                      </h1>
                      {/* <div className="grid grid-cols-1  sm:grid-cols-2 gap-1">
                        <p className="py-1">
                          <span className="font-medium">विवाहित :</span>{" "}
                          {userData?.brothers_details?.brother_married}
                        </p>
                        <p className="py-1">
                          <span className="font-medium">अविवाहित :</span>{" "}
                          {userData?.brothers_details?.brother_unmarried}
                        </p>
                      </div> */}
                      {userData?.brothers_details?.father_in_law?.length >
                        0 && (
                        <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                          {userData?.brothers_details?.father_in_law?.map(
                            (item, index) => (
                              <div key={index} className="py-1">
                                {index === 0 && (
                                  <p className="font-medium">
                                    बंधूंच्या सासऱ्यांचे नाव आणि मोबाईल नंबर :{" "}
                                  </p>
                                )}
                                <div className="mt-3">
                                  <p>
                                    • {item.salutation} {item.name},{" "}
                                    {item.address}{" "}
                                  </p>
                                  <p className="mt-2">
                                    {item.mobile} {item.email}
                                  </p>
                                </div>
                              </div>
                              // <div key={index} className="py-1">
                              //   {index === 0 && (
                              //     <p className="font-medium py-2">
                              //       बंधूंच्या सासऱ्यांचे नाव आणि मोबाईल नंबर :{" "}
                              //     </p>
                              //   )}
                              //   <div className="flex py-3 items-center">
                              //     <p>
                              //       • {item.salutation} {item.name} -{item.address}
                              //     </p>
                              //     <div className="flex gap-3 mx-2 items-center">
                              //       <a
                              //         onClick={() => phoneIconClicked()}
                              //         className="bg-blue-800  hover:bg-primary-hover hover:text-white p-[6px] text-white rounded-full"
                              //       >
                              //         <FaMobileAlt size={18} />
                              //       </a>
                              //       <a
                              //         onClick={() => whatsappIconClicked()}
                              //         className=" bg-[#25D366] hover:border-primary-hover hover:bg-primary-hover hover:text-white p-[4px] text-white rounded-full"
                              //       >
                              //         <FaWhatsapp size={20} />
                              //       </a>
                              //       <a
                              //         onClick={() => emailIconClicked()}
                              //         className="bg-red-600 border-white-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white text-white p-[6px] text-primary-normal rounded-full"
                              //       >
                              //         <FaEnvelope size={18} />
                              //       </a>
                              //       {userData?.contact_details?.mobile && (
                              //         <a
                              //           onClick={() => telephoneIconClicked()}
                              //           className="bg-gray-600 border-white-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white text-white p-[6px] text-primary-normal rounded-full"
                              //         >
                              //           <FaPhoneAlt size={15} />
                              //         </a>
                              //       )}
                              //     </div>
                              //   </div>
                              // </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
                        भगिनी (अविवाहित :{" "}
                        {userData?.sisters_details.sisters_unmarried} / विवाहित
                        :{userData?.sisters_details.sisters_married})
                      </h1>
                      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        <p className="py-1">
                          <span className="font-medium">विवाहित :</span>{" "}
                          {userData?.sisters_details.sisters_married}
                        </p>
                        <p className="py-1">
                          <span className="font-medium">अविवाहित :</span>{" "}
                          {userData?.sisters_details.sisters_unmarried}
                        </p>
                      </div> */}
                      {userData?.sisters_details?.brother_in_law?.length >
                        0 && (
                        <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                          {userData?.sisters_details?.brother_in_law?.map(
                            (item, index) => (
                              <div key={index} className="py-1">
                                {index === 0 && (
                                  <p className="font-medium">
                                    बहिण व यजमानांचे नाव आणि मोबाईल नंबर :{" "}
                                  </p>
                                )}
                                <div className="mt-3">
                                  <p>
                                    • {item.salutation} {item.name},{" "}
                                    {item.address}{" "}
                                  </p>
                                  <p className="mt-2">
                                    {item.mobile} {item.email}
                                  </p>
                                </div>
                              </div>
                              // <p key={index} className="py-1">
                              //   {index === 0 && (
                              //     <p className="font-medium py-2">
                              //       बहिण व यजमानांचे नाव आणि मोबाईल नंबर :{" "}
                              //     </p>
                              //   )}
                              //   <p>
                              //     • {item.salutation} {item.name} {item.address}{" "}
                              //   </p>
                              // </p>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <h1 className="text-base px-5 font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
                    आजोबा
                  </h1>
                  <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
                    <div>
                      <p className="py-1">
                        <span className="font-medium">आजोबांचे नाव :</span>{" "}
                        {
                          userData?.fathers_family_details?.grandfather
                            ?.salutation
                        }{" "}
                        {userData?.fathers_family_details?.grandfather?.name}
                      </p>

                      <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                        {userData?.fathers_family_details?.kaka?.map(
                          (item, index) => (
                            <div key={index} className="py-1">
                              {index === 0 && (
                                <p className="font-medium">काका : </p>
                              )}
                              <div className="mt-3">
                                <p>
                                  • {item.salutation} {item.name},{" "}
                                  {item.address}{" "}
                                </p>
                                <p className="mt-2">
                                  {item.mobile} {item.email}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="py-1">
                        <span className="font-medium">आजोबांचे मूळ गाव :</span>{" "}
                        {userData?.fathers_family_details?.grandfather?.address}
                      </p>

                      <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                        {userData?.fathers_family_details?.fuva?.map(
                          (item, index) => (
                            <div key={index} className="py-1">
                              {index === 0 && (
                                <p className="font-medium">फुवा : </p>
                              )}
                              <div className="mt-3 ">
                                <p>
                                  • {item.salutation} {item.name},{" "}
                                  {item.address}{" "}
                                </p>
                                <p className="mt-2">
                                  {item.mobile} {item.email}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <h1 className="text-base px-5 font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
                    आजोळ
                  </h1>
                  <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
                    <div>
                      <p className="py-1">
                        <span className="font-medium">आजोबांचे नाव :</span>{" "}
                        {
                          userData?.mothers_family_details?.grandfather
                            ?.salutation
                        }{" "}
                        {userData?.mothers_family_details?.grandfather?.name}
                      </p>
                      <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                        {userData?.mothers_family_details?.mama?.map(
                          (item, index) => (
                            <div key={index} className="py-1">
                              {index === 0 && (
                                <p className="font-medium">मामा : </p>
                              )}
                              <div className="mt-3">
                                <p>
                                  • {item.salutation} {item.name},{" "}
                                  {item.address}{" "}
                                </p>
                                <p className="mt-2">
                                  {item.mobile} {item.email}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="py-1">
                        <span className="font-medium">आजोबांचे मूळ गाव :</span>{" "}
                        {userData?.mothers_family_details?.grandfather?.address}
                      </p>

                      <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                        {userData?.mothers_family_details?.mavsa?.map(
                          (item, index) => (
                            <div key={index} className="py-1">
                              {index === 0 && (
                                <p className="font-medium">मावसा : </p>
                              )}
                              <div className="mt-3">
                                <p>
                                  • {item.salutation} {item.name},{" "}
                                  {item.address}{" "}
                                </p>
                                <p className="mt-2">
                                  {item.mobile} {item.email}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
            Contact Info
          </h1> */}
                  {isImageModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={() => setIsImageModalOpen(false)}
                      ></div>
                      <div className="absolute top-1/2 md:h-[80%] md:w-[40%]  lg:h-[80%] lg:w-[30%]  h-[60vh] w-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img
                          className="w-full h-full object-cover"
                          src={userData?.personal_details?.photo[0]}
                          alt={userData?.personal_details?.fullname}
                          draggable={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center h-96">
                  <div>
                    <h1 className="text-2xl text-center">No data found !</h1>
                    <p className="text-center">Please add your biodata</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
