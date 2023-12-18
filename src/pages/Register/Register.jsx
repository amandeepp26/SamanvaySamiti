/* eslint-disable no-useless-escape */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdge, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../Utils/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoaderIcon from "../Utils/LoaderIcon";
import male from "../../assets/icons/male.jpg";
import female from "../../assets/icons/female.jpg";

const Register = () => {
  const { registerUser, userUpdateOnSignUp, setUser } = useAuth();

  const [submitBtnLoader, setSubmitBtnLoader] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setSubmitBtnLoader(true);

    registerUser(data.email, data.password)
      .then((succData) => {
        const user = succData.user;
        user;

        userUpdateOnSignUp({
          displayName: data.name,
          photoURL: data.photo_url,
          email: data.email,
        })
          .then(() => {
            setUser({
              displayName: data.name,
              photoURL: data.photo_url,
              email: data.email,
            });

            //store user to database
            const userInfo = { name: data.name, email: data.email };
            axiosPublic
              .post("/store-users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Success",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                  // console.log('User stored into database', res.data);
                  reset();
                  navigate("/");
                  setSubmitBtnLoader(false);
                }
              })
              .catch((error) => {
                console.log("store user error:", error);
              });
            //store user to database end

            // console.log('profile data set')
            setSubmitBtnLoader(false);
          })
          .catch((error) => {
            console.log("profile data not set", error);
            setSubmitBtnLoader(false);
          });

        // console.log('SignUp User created', user)
        setSubmitBtnLoader(false);
      })
      .catch((errorData) => {
        const error = errorData.message;

        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Email already in use",
          showConfirmButton: false,
          timer: 3000,
        });

        console.log("SignUp error", error);
        setSubmitBtnLoader(false);
      });
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleCheckboxChange = (fieldName, day) => {
    setFormData((prevFormData) => {
      const selectedDays = prevFormData[fieldName] || [];
      const updatedDays = selectedDays.includes(day)
        ? selectedDays.filter((selectedDay) => selectedDay !== day)
        : [...selectedDays, day];

      return {
        ...prevFormData,
        [fieldName]: updatedDays,
      };
    });
  };

  const dropdownOptions = {
    blood_group: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
    gotra: ["Gotra 1", "Gotra 2", "Gotra 3"],
    education_level_completed: [
      "10th",
      "12th",
      "Diploma",
      "Graduate",
      "Post Graduate/Master",
      "Doctorate",
    ],
    your_profession: [
      "Govt Job",
      "Business Owner",
      "Private Job",
      "Self employeed professional",
    ],
    Payment_currency: ["10", "12"],
    Brothers_Unmarried: [1, 2, 3, 4, 5],
    Brothers_married: [1, 2, 3, 4, 5],
    Sisters_Unmarried: [1, 2, 3, 4, 5],
    Sisters_married: [1, 2, 3, 4, 5],
    kuldevi: ["sdbjhsd", "dshjbdjhsbd"],
    // Add more fields and their options as needed
  };
  const weeklyHolidays = [
    "Sunday (रविवार)",
    "Monday (सोमवार)",
    "Tuesday (मंगळवार)",
    "Wednesday (बुधवार)",
    "Thursday (गुरुवार)",
    "Friday (शुक्रवार)",
    "Saturday (शनिवार)",
    "Flexible or Rotational Holiday",
    "No Holiday",
  ];
  // Define your form fields for each step
  const formFields = [
    [
      "उपवर वधु / वर",
      "name",
      "email",
      "photo_url",
      "birth_name",
      "birth_date",
      "birth_time",
      "birth_place",
      "height",
      "blood_group",
      "weight",
      "gotra",
      "kuldevi",
    ],
    [
      "education_level_completed",
      "education_details",
      "special_education",
      "special information about yourself",
    ],
    [
      "your_profession",
      "Job title",
      "company or business name",
      "Job/Profession address",
      "Weekly holiday",
      "Total monthly income",
      "Payment_currency",
    ],
    [
      "Mobile number",
      "Phone number",
      "E-mail",
      "Current Address",
      "Expectations about partner",
      "Do you approve of consanguineous marriage?",
    ],
    [
      "Father Guardian Full Name",
      "Guardians Profession",
      "Job / designation",
      "Full address of Parents",
      "Parent's Mobile Number",
      "Mothers Full Name",
      "Mobile Number",
    ],
    [
      "Brothers_Unmarried",
      "Brothers_married",
      "1. Brother's father-in-law's name and mobile number",
      "2. Brother's father-in-law's name and mobile number",
      "3. Brother's father-in-law's name and mobile number",
    ],
    [
      "Sisters_Unmarried",
      "Sisters_married",
      "1. Sister's father-in-law's name and mobile number",
      "2. Sister's father-in-law's name and mobile number",
      "3. Sister's father-in-law's name and mobile number",
    ],
    [
      "Grandfather's Name",
      "Grandfather's Native Village",
      "1. Uncle's Name",
      "2. Uncle's Name",
      "3. Uncle's Name",
      "4. Uncle's Name",
      "1. Aunt's name",
      "2. Aunt's name",
      "3. Aunt's name",
      "4. Aunt's name",
    ],
    [
      "Grandfather's Name",
      "Grandfather's Native Village",
      "1. Mama's Name",
      "2. Mama's Name",
      "1. Mausa's Name",
      "2. Mausa's Name",
    ],
    ["Payment"],
  ];

  const stepTitles = [
    "Personal Information",
    "Educational Information",
    "Professional Information",
    "Contact Details",
    "Family Introduction",
    "Brothers Information",
    "Sisters Information",
    "Fathers Family information",
    "Mothers Family information",
    "Payment process",
  ];

  return (
    <div className="px-5 py-5 lg:py-10 flex justify-center items-center">
      <div className="flex-1 max-w-md bg-white rounded-lg shadow">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-lg pb-2 font-semibold leading-tight text-center tracking-tight text-gray-900 md:text-1xl">
            {stepTitles[step]}
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {formFields[step].map((fieldName) => (
              <div key={fieldName}>
                <div>
                  {fieldName.includes(`father-in-law`) ? null : (
                    <label
                      htmlFor={fieldName}
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      {fieldName
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </label>
                  )}
                  {fieldName === "उपवर वधु / वर" ? (
                    <div className="flex items-center justify-between">
                      <label>
                        <div>
                          <img
                            className="w-[180px] h-[150px] border px-5 py-5 rounded-md"
                            src={male}
                          />
                        </div>
                        <input
                          type="radio"
                          name="type"
                          value="groom"
                          checked={formData[fieldName] === "groom"}
                          onChange={(e) =>
                            handleInputChange(fieldName, e.target.value)
                          }
                        />
                        <span className="ml-2">Groom</span>
                      </label>
                      <label>
                        <div>
                          <img
                            className="w-[180px] h-[150px] border px-5 py-5 rounded-md"
                            src={female}
                          />
                        </div>
                        <input
                          type="radio"
                          name="type"
                          checked={formData[fieldName] === "bride"}
                          value={"bride"}
                          onChange={(e) =>
                            handleInputChange(fieldName, e.target.value)
                          }
                        />
                        <span className="ml-2">Bride</span>
                      </label>
                    </div>
                  ) : fieldName === "photo_url" ? (
                    <input
                      type="file"
                      accept="image/*"
                      name={fieldName}
                      id={fieldName}
                      onChange={(e) =>
                        handleInputChange(fieldName, e.target.value)
                      }
                    />
                  ) : fieldName === "blood_group" ||
                    fieldName === "gotra" ||
                    fieldName === "education_level_completed" ||
                    fieldName === "your_profession" ||
                    fieldName === "Payment_currency" ||
                    fieldName === "Brothers_Unmarried" ||
                    fieldName === "Brothers_married" ||
                    fieldName === "Sisters_Unmarried" ||
                    fieldName === "Sisters_married" ||
                    fieldName === "kuldevi" ? (
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      name={fieldName}
                      id={fieldName}
                      value={formData[fieldName] || ""}
                      onChange={(e) =>
                        handleInputChange(fieldName, e.target.value)
                      }
                    >
                      <option value="">
                        Select{" "}
                        {fieldName
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </option>
                      {dropdownOptions[fieldName]?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : fieldName === "birth_date" ? (
                    <input
                      type="date"
                      name={fieldName}
                      id={fieldName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={formData[fieldName] || ""}
                      onChange={(e) =>
                        handleInputChange(fieldName, e.target.value)
                      }
                    />
                  ) : fieldName === "birth_time" ? (
                    <input
                      type="time"
                      name={fieldName}
                      id={fieldName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={formData[fieldName] || ""}
                      onChange={(e) =>
                        handleInputChange(fieldName, e.target.value)
                      }
                    />
                  ) : fieldName === "Weekly holiday" ? (
                    weeklyHolidays.map((day, index) => (
                      <div key={index} className="flex items-center mt-3">
                        <input
                          type="checkbox"
                          id={`Weekly_holiday_${index}`}
                          name="Weekly holiday"
                          value={day}
                          checked={(formData["Weekly holiday"] || []).includes(
                            day
                          )}
                          onChange={() =>
                            handleCheckboxChange("Weekly holiday", day)
                          }
                        />
                        <label
                          htmlFor={`Weekly_holiday_${index}`}
                          className="ml-2"
                        >
                          {day}
                        </label>
                      </div>
                    ))
                  ) : fieldName ===
                    "Do you approve of consanguineous marriage?" ? (
                    <div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name={fieldName}
                            value="yes"
                            checked={formData[fieldName] === "yes"}
                            onChange={(e) =>
                              handleInputChange(fieldName, e.target.value)
                            }
                          />
                          <span className="ml-2">Yes</span>
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name={fieldName}
                            value="no"
                            checked={formData[fieldName] === "no"}
                            onChange={(e) =>
                              handleInputChange(fieldName, e.target.value)
                            }
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name={fieldName}
                            value="maybe-later"
                            checked={formData[fieldName] === "maybe-later"}
                            onChange={(e) =>
                              handleInputChange(fieldName, e.target.value)
                            }
                          />
                          <span className="ml-2">Maybe Later</span>
                        </label>
                      </div>
                    </div>
                  ) : fieldName.includes("father-in-law") ? null : (
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      name={fieldName}
                      type={fieldName === "password" ? "password" : "text"}
                      id={fieldName}
                      placeholder={`Enter Your ${fieldName
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}`}
                      value={formData[fieldName] || ""}
                      onChange={(e) =>
                        handleInputChange(fieldName, e.target.value)
                      }
                    />
                  )}
                  {fieldName === "Brothers_married" &&
                    formData[fieldName] > 0 && (
                      // Render in-law fields for each married brother
                      <>
                        <h6 className="mt-3">
                          विवाहित बंधूंच्या सासऱ्यांची नावे (Married Brothers In
                          Laws names)
                          <br /> नातेवाईकांचा तपशील नमूद करताना त्यांच्या गावाचे
                          नाव आणि संपर्क क्रमांकावर स्वल्पविराम लावा.
                          <br />
                          While mentioning relative's details put a comma in
                          their village name and contact number.
                          <br /> उदा. : श्री. अमित डी. वाणी, ९८९८९८९८९८,
                          आर्वी-धुळे ह.मु. पुणे
                        </h6>
                        {Array.from({ length: formData[fieldName] }).map(
                          (_, index) => (
                            <div key={index} className="mt-5">
                              <label
                                htmlFor={formData[fieldName]}
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                {`${
                                  index + 1
                                }. Brothers Father's in law Name and Mobile Number`}
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                type="text"
                                name={`brother_in_law_${index + 1}_father_name`}
                                placeholder="Enter here"
                                value={formData[fieldName]}
                              />
                            </div>
                          )
                        )}
                      </>
                    )}

                  {fieldName === "Sisters_married" &&
                    formData[fieldName] > 0 &&
                    // Render in-law fields for each married sister
                    Array.from({ length: formData[fieldName] }).map(
                      (_, index) => (
                        <div key={index}>
                          <label>
                            {`In-law ${
                              index + 1
                            }'s Father's Name and Mobile Number`}
                          </label>
                          {/* Render input fields for in-law details */}
                          <input
                            type="text"
                            name={`sister_in_law_${index + 1}_father_name`}
                            // Add other attributes and event handlers as needed
                          />
                          <input
                            type="text"
                            name={`sister_in_law_${index + 1}_father_mobile`}
                            // Add other attributes and event handlers as needed
                          />
                        </div>
                      )
                    )}
                  {errors[fieldName] && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-between px-4">
              {step === 0 ? null : (
                <button
                  type="button"
                  onClick={() =>
                    setStep((prevStep) => Math.max(1, prevStep - 1))
                  }
                  className={`bg-primary-normal text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5`}
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (step < stepTitles.length - 1) {
                    setStep((prevStep) => prevStep + 1);
                    console.log("form data is---->", formData);
                  } else {
                    alert("submit");
                  }
                }}
                className={`bg-primary-normal text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5`}
              >
                {step === stepTitles.length - 1 ? "Create an account" : "Next"}
              </button>

              {submitBtnLoader && <LoaderIcon />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
