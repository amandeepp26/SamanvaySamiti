import { Link, useParams } from "react-router-dom";
import LoaderIcon from "../Utils/LoaderIcon";
import { useEffect, useState } from "react";
import useTypeBiodatas from "../../hooks/useTypeBiodatas";
import useSingleBiodataById from "../../hooks/useSingleBiodataById";
import { MdFavoriteBorder } from "react-icons/md";
import useStoreFavorite from "../../hooks/useStoreFavorite";
import useSelfUser from "../../hooks/useSelfUser";
import BiodataCard from "../Utils/Biodatas/BiodataCard";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaPhone,
  FaPhoneAlt,
  FaWhatsapp,
  FaTty,
  FaMobileAlt,
  FaMailBulk,
  FaEnvelope,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import Swal from "sweetalert2";
import * as html2pdf from "html2pdf.js";

import image from '../../assets/img/aboutUsPage.jpg'
import { formatBirthDate } from "../../Utils/FormatDate";

const BiodataDetails = () => {
  const { id } = useParams();
  const [isloading, setisloading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [relationVisibility, setRelationVisibility] = useState({});

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const token = localStorage.getItem("token");


    useEffect(() => {
      fetchDetails();
    }, []);
    useEffect(() => {
      // Scroll to the top when the component mounts
      window.scrollTo(0, 0);
    }, []);
  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `https://api.welkinhawk.in.net/api/users/user-detail/${id}`
        // `http://localhost:8000/api/users/user-detail/${id}`
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

    const toggleIconsVisibility = (relation) => {
      setRelationVisibility((prevVisibility) => ({
        ...prevVisibility,
        [relation]: !prevVisibility[relation],
      }));
    };

  // calls track
const phoneIconClicked = async (e) => {
  try {
    const response = await fetch(
      "https://api.welkinhawk.in.net/api/users/call-profile",
      // "http://localhost:8000/api/users/call-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          calledUserId: userData?._id,
          calledUserNumber: e,
        }),
      }
    );

    console.log("Response status:", response); // Log the status code

    if (response.ok) {
      const result = await response.json();
      console.log("API Data:", result);

      if (result.success) {
        // Handle success
        window.location.href = `tel:${e}`;
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: result.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } else {
      console.error("Error:", response.statusText);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    Swal.fire({
      position: "center",
      icon: "warning",
      title: `Error: ${error.message}`,
      showConfirmButton: false,
      timer: 3000,
    });
  } finally {
    // setSubmitBtnLoader(false);
  }
};


const downloadIconClicked = async (imageUrl) => {
  console.log("Start of downloadIconClicked function");

  const element = document.getElementById("profile-container");

  if (!element) {
    console.error("Profile container not found");
    return;
  }

  console.log("Profile container found");

  // Wait for the image to load
  const imagePromise = new Promise((resolve) => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      console.log("Image loaded");
      resolve();
    };
  });

  // Configure the PDF options
  const options = {
    margin: 1,
    filename: `${userData?.personal_details?.fullname}-profile.pdf`,
    image: { type: "jpeg", quality: 1 }, // Include images
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Wait for the image to load before generating the PDF
  await imagePromise;

  console.log("About to generate PDF");

  // Generate the PDF
  html2pdf(element, options);

  console.log("PDF generated successfully");

  // try {
  //   const response = await fetch(
  //     // "https://api.welkinhawk.in.net/api/users/download-profile",
  //     "http://localhost:8000/api/users/download-profile",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ downloadedUserId: userData?._id }),
  //     }
  //   );

  //   console.log("Response status:", response.status); // Log the status code

  //   if (response.ok) {
  //     const result = await response.json();
  //     console.log("Whatsapp API Data:", result);

  //     if (result.success) {
  //       // Handle success

  //     } else {
  //       Swal.fire({
  //         position: "center",
  //         icon: "warning",
  //         title: "Something went wrong!",
  //         showConfirmButton: false,
  //         timer: 3000,
  //       });
  //     }
  //   } else {
  //     console.error("Error:", response.statusText);
  //     Swal.fire({
  //       position: "center",
  //       icon: "error",
  //       title: "Something went wrong!",
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //   }
  // } catch (error) {
  //   console.error("Error fetching data:", error.message);
  //   Swal.fire({
  //     position: "center",
  //     icon: "warning",
  //     title: `Error: ${error.message}`,
  //     showConfirmButton: false,
  //     timer: 3000,
  //   });
  // } finally {
  // }
};


// Whatsapp track
  const whatsappIconClicked = async (e) => {
     try {
    const response = await fetch(
      "https://api.welkinhawk.in.net/api/users/whatsapp-profile",
      // "http://localhost:8000/api/users/whatsapp-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          whatsappUserId: userData?._id,
          whatsappUserNumber: e,
        }),
      }
    );

    console.log("Response status:", response.status); // Log the status code

    if (response.ok) {
      const result = await response.json();
      console.log("Whatsapp API Data:", result);

      if (result.success) {
        // Handle success
        window.open(
          `https://api.whatsapp.com/send?phone=${e}`,
          "_blank"
        );
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: result.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } else {
      console.error("Error:", response.statusText);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    Swal.fire({
      position: "center",
      icon: "warning",
      title: `Error: ${error.message}`,
      showConfirmButton: false,
      timer: 3000,
    });
  } finally {
    // setSubmitBtnLoader(false);
  }
  };

  // Email Track
  const emailIconClicked = async (e) => {
    try {
      const response = await fetch(
        "https://api.welkinhawk.in.net/api/users/email-profile",
        // "http://localhost:8000/api/users/email-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            emailUserId: userData?._id,
            calleduserEmail: e,
          }),
        }
      );

      console.log("Response status:", response.status); // Log the status code

      if (response.ok) {
        const result = await response.json();
        console.log("Whatsapp API Data:", result);

        if (result.success) {
          // Handle success
          window.location.href = `mailto:${e}`;
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: result.message,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } else {
        console.error("Error:", response.statusText);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Error: ${error.message}`,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      // setSubmitBtnLoader(false);
    }
  };

  // Telephone track
  const telephoneIconClicked = async (e) => {
    try {
      const response = await fetch(
        "https://api.welkinhawk.in.net/api/users/telephone-profile",
        // "http://localhost:8000/api/users/telephone-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            telephoneUserId: userData?._id,
            telephoneUserNumber: e,
          }),
        }
      );

      console.log("Response status:", response.status); // Log the status code

      if (response.ok) {
        const result = await response.json();
        console.log("Whatsapp API Data:", result);

        if (result.success) {
          // Handle success
        window.location.href = `tel:${e}`;
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: result.message,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } else {
        console.error("Error:", response.statusText);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Error: ${error.message}`,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      // setSubmitBtnLoader(false);
    }
  };


 const renderIcons = (item) => {

   return (
     <div className="flex gap-3 mx-2 mt-2 items-center">
      {item.mobile &&
       <a
         onClick={()=>phoneIconClicked(item.mobile)}
         className="bg-blue-800 hover:bg-primary-hover hover:text-white p-[6px] text-white rounded-full"
       >
         <FaMobileAlt size={18} />
       </a>
      }
       {item.whatsapp &&
       <a
         onClick={()=>whatsappIconClicked(item.whatsapp)}
         className="bg-[#25D366] hover:border-primary-hover hover:bg-primary-hover hover:text-white p-[4px] text-white rounded-full"
       >
         <FaWhatsapp size={20} />
       </a>
        }
       {item.email && 
       <a
         onClick={()=>emailIconClicked(item.email)}
         className="bg-red-600 border-white-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white text-white p-[6px] text-primary-normal rounded-full"
       >
         <FaEnvelope size={18} />
       </a>
      }
       {item.phone && (
         <a
           onClick={()=>telephoneIconClicked(item.phone)}
           className="bg-gray-600 border-white-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white text-white p-[6px] text-primary-normal rounded-full"
         >
           <FaPhoneAlt size={15} />
         </a>
       )}
     </div>
   );
 };

  if (isloading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center flex-col">
        <LoaderIcon />
        Loading......
      </div>
    );
  }
  return (
    <div className="lg:w-4/6 md:w-[100%] container mx-auto  grid">
      {/* Left Content */}
      {userData === null ? (
        <div className="w-full h-[70vh] flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold text-red-500">No user found!</h2>
          <p className="text-md text-gray-500">Check the user id</p>
        </div>
      ) : (
        <div
          id="profile-container"
          className="border-b-2 lg:border-b-0  pb-8 col-span-3"
        >
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
              <div className="flex gap-5 items-center py-2">
                {userData?.phone && (
                  <a
                    onClick={() => phoneIconClicked(userData?.phone)}
                    className="bg-blue-800  hover:bg-primary-hover hover:text-white p-[6px] text-white rounded-full"
                  >
                    <FaMobileAlt size={18} />
                  </a>
                )}

                {userData?.contact_details?.whatsapp && (
                  <a
                    onClick={() =>
                      whatsappIconClicked(userData?.contact_details?.whatsapp)
                    }
                    className=" bg-[#25D366] hover:border-primary-hover hover:bg-primary-hover hover:text-white p-[4px] text-white rounded-full"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                )}

                {userData?.email && (
                  <a
                    onClick={() => emailIconClicked(userData?.email)}
                    className="bg-red-600 border-white-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white text-white p-[6px] text-primary-normal rounded-full"
                  >
                    <FaEnvelope size={18} />
                  </a>
                )}
                {userData?.contact_details?.telephone && (
                  <a
                    onClick={() =>
                      telephoneIconClicked(userData?.contact_details?.telephone)
                    }
                    className="bg-gray-600 border-white-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white text-white p-[6px] text-primary-normal rounded-full"
                  >
                    <FaPhoneAlt size={15} />
                  </a>
                )}
              </div>
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
              {/* <div
                style={{ cursor: "pointer" }}
                id="download-button"
                onClick={() =>
                  downloadIconClicked(userData?.personal_details?.photo[0])
                }
                className={`${"bg-blue-900 text-white"} text-xs sm:text-lg  font-medium py-1 px-5 sm:px-10 rounded-lg rounded-lg absolute bottom-[10px] right-5`}
              >
                Download
              </div> */}
            </div>
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
                {formatBirthDate(userData?.personal_details?.birth_date)} :{" "}
                {userData?.personal_details?.birth_time}
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
                <span className="font-medium">जोडीदाराबद्दल अपेक्षा :</span>{" "}
                {userData?.contact_details?.partner_expectations}
              </p>
              <p className="py-2 mx-5">
                <span className="font-medium">सध्याचा राहण्याचा पत्ता :</span>{" "}
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
                    <span className="font-medium">शिक्षण पातळी पूर्ण : </span>
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
                    <span className="font-medium">एकूण मासिक वेतन :</span>{" "}
                    {userData?.professional_details?.monthly_income} (
                    {userData?.professional_details?.payment_currency})
                  </p>
                  <p className="py-1">
                    <span className="font-medium">साप्ताहिक सुट्टी :</span>{" "}
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
            {/* <h1 className="text-base px-5 font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
              संपर्क
            </h1>
            <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1"> */}
            {/* <p className="py-1">
                <span className="font-medium">मोबाईल क्रमांक :</span>{" "}
                {userData?.phone}
              </p>
              <p className="py-1">
                <span className="font-medium">दूरध्वनी क्रमांक :</span>{" "}
                {userData?.phone}
              </p>
              <p className="py-1">
                <span className="font-medium">ईमेल :</span> {userData?.email}
              </p> */}
            {/* <p className="py-1">
                <span className="font-medium">सध्याचा राहण्याचा पत्ता :</span>{" "}
                {userData?.contact_details?.current_address}
              </p>
              <p className="py-1">
                <span className="font-medium">जोडीदाराबद्दल अपेक्षा :</span>{" "}
                {userData?.contact_details?.partner_expectations}
              </p>
              <p className="py-1">
                <span className="font-medium">
                  सगोत्र विवाहास आपली मान्यता आहे का ? :
                </span>{" "}
                {userData?.contact_details?.consanguineous_marriage}
              </p>
            </div> */}
            <h1 className="text-base px-5 font-medium text-primary-normal border-t border-b py-2 my-10 mb-2">
              कौटुंबिक परिचय
            </h1>
            <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
              <p className="py-1">
                <span className="font-medium">
                  {userData?.family_details?.guardian} :
                </span>{" "}
                <ExpandableSection
                  items={userData?.family_details?.father || []}
                  renderIcons={renderIcons}
                />
              </p>
              <p className="py-1">
                <span className="font-medium">नोकरी/व्यावसायिक तपशील :</span>{" "}
                {userData?.family_details?.guardians_profession},{" "}
                {userData?.family_details?.designation}
              </p>
              <p className="py-1">
                <span className="font-medium">आई :</span>{" "}
                <ExpandableSection
                  items={userData?.family_details?.mother || []}
                  renderIcons={renderIcons}
                />
              </p>

              {/* <p className="py-1">
                <span className="font-medium">पालकांचा मोबाईल क्रमांक :</span>
                {userData?.family_details?.father?.mobile}
              </p> */}
              <p className="py-1">
                <span className="font-medium">पत्ता :</span>{" "}
                {userData?.family_details?.address}
              </p>

              {/* <p className="py-1">
                <span className="font-medium">मोबाईल क्रमांक :</span>{" "}
                {userData?.family_details?.mother?.phone}
              </p> */}
            </div>
          </div>

          <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
            <div>
              <h1 className="text-base font-medium -mx-5 px-5 text-primary-normal border-t border-b py-2 mt-6 mb-2">
                बन्धु (अविवाहित :{" "}
                {userData?.brothers_details?.brother_unmarried} / विवाहित :
                {userData?.brothers_details?.brother_married})
              </h1>
              {userData?.brothers_details?.brother_married > 0 && (
                <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                  {userData?.brothers_details?.father_in_law?.map(
                    (item, index) => (
                      <>
                        {index === 0 && (
                          <p className="font-medium py-2">
                            बंधूंच्या सासऱ्यांचे नाव आणि मोबाईल नंबर :{" "}
                          </p>
                        )}
                        <ExpandableSection
                          items={item || []}
                          renderIcons={renderIcons}
                        />
                      </>
                    )
                  )}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
                भगिनी (अविवाहित : {userData?.sisters_details?.sisters_unmarried}{" "}
                / विवाहित :{userData?.sisters_details?.sisters_married})
              </h1>
              {userData?.sisters_details?.sisters_married > 0 && (
                <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                  {userData?.sisters_details?.brother_in_law?.map(
                    (item, index) => (
                      <>
                        {index === 0 && (
                          <p className="font-medium py-2">
                            बहिण व यजमानांचे नाव आणि मोबाईल नंबर :{" "}
                          </p>
                        )}
                        <ExpandableSection
                          items={item || []}
                          renderIcons={renderIcons}
                        />
                      </>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 gap-1">
            <div>
              <h1 className="text-base  -mx-5 px-5 font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
                आजोबा
              </h1>
              <div>
                <ExpandableSection
                  items={userData?.fathers_family_details?.grandfather || []}
                  renderIcons={renderIcons}
                />
                {/* <p className="py-1">
                  {userData?.fathers_family_details?.grandfather?.salutation}{" "}
                  {userData?.fathers_family_details?.grandfather?.name} {","}
                  {userData?.fathers_family_details?.grandfather?.address}
                  {renderIcons(userData?.fathers_family_details?.grandfather)}
                </p> */}
                {userData?.fathers_family_details?.kaka?.length > 0 && (
                  <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                    {userData?.fathers_family_details?.kaka.map(
                      (item, index) => (
                        <>
                          {index === 0 && (
                            <p className="font-medium py-2">काका : </p>
                          )}
                          <ExpandableSection
                            items={item || []}
                            renderIcons={renderIcons}
                          />
                        </>
                      )
                    )}
                  </div>
                )}

                {userData?.fathers_family_details?.fuva?.length > 0 && (
                  <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                    {userData?.fathers_family_details?.fuva.map(
                      (item, index) => (
                        <>
                          {index === 0 && (
                            <p className="font-medium py-2">फुवा : </p>
                          )}
                          <ExpandableSection
                            items={item || []}
                            renderIcons={renderIcons}
                          />
                        </>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">
                आजोळ
                {/* <p className="py-1 text-black">
                  {userData?.mothers_family_details?.grandfather?.salutation}{" "}
                  {userData?.mothers_family_details?.grandfather?.name}{" "}
                  {userData?.mothers_family_details?.grandfather?.address}
                </p> */}
              </h1>
              <div>
                <ExpandableSection
                  items={userData?.mothers_family_details?.grandfather || []}
                  renderIcons={renderIcons}
                />
                {/* <p className="py-1">
                  <span className="font-medium">आजोबांचे नाव :</span>{" "}
                  {userData?.mothers_family_details?.grandfather?.salutation}{" "}
                  {userData?.mothers_family_details?.grandfather?.name}{" "}
                  {userData?.mothers_family_details?.grandfather?.address}
                  {renderIcons(userData?.mothers_family_details?.grandfather)}
                </p> */}
                {userData?.mothers_family_details?.mama?.length > 0 && (
                  <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                    {userData?.mothers_family_details?.mama?.map(
                      (item, index) => (
                        <>
                          {index === 0 && (
                            <p className="font-medium py-2">मामा : </p>
                          )}
                          <ExpandableSection
                            items={item || []}
                            renderIcons={renderIcons}
                          />
                        </>
                      )
                    )}
                  </div>
                )}
                {userData?.mothers_family_details?.mavsa?.length > 0 && (
                  <div className="py-1 border-2 p-5 mt-5 w-[90%] bg-white rounded-lg">
                    {userData?.mothers_family_details?.mavsa?.map(
                      (item, index) => (
                        <>
                          {index === 0 && (
                            <p className="font-medium py-2">मावसा : </p>
                          )}
                          <ExpandableSection
                            items={item || []}
                            renderIcons={renderIcons}
                          />
                        </>
                      )
                    )}
                  </div>
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
      )}

      {/* Right Image */}
    </div>
  );
};

export default BiodataDetails;


const ExpandableSection = ({ items, renderIcons }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleExpandToggle = (index) => {
    setExpandedItem((prev) => (prev === index ? null : index));
  };
  const itemsArray = Array.isArray(items) ? items : [items];
  return (
    <div>
      {itemsArray.map((item, index) => (
        <div key={index}>
          <div className="flex items-center">
            <p
              className=" py-2 cursor-pointer"
              onClick={() => handleExpandToggle(index)}
            >
              • {item.salutation} {item.name} -{item.address}{" "}
              {/* <span
              className={`cursor-pointer transform ${
                expandedItem !== index ? "rotate-180" : ""
              }`}
            >
              {expandedItem === index ? "^" : "⌄"}
            </span> */}
            </p>
            {expandedItem === index ?
            <FaSortUp
              className="cursor-pointer mt-2 mx-2"
              onClick={() => handleExpandToggle(index)}
            />
            :
            <FaSortDown
              className="cursor-pointer -mt-1 mx-2"
              onClick={() => handleExpandToggle(index)}
            />
            }
          </div>

          {expandedItem === index && (
            <div className="items-center">{renderIcons(item)}</div>
          )}
        </div>
      ))}
    </div>
  );
};
