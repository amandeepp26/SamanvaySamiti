
import { useEffect, useReducer, useState } from "react";
import LoaderIcon from "../../Utils/LoaderIcon";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import Select from "react-select";

const EditBiodata = () => {
    const [loadingIcon, setLoadingIcon] = useState(false);
    const [selectedBloodGroup,setSelectedBloodGroup] = useState('');
    const [selectedKuldevi,setSelectedKuldevi] = useState('');
    const [selectedGender,setSelectedGender] = useState('');
    const [selectedGotra, setSelectedGotra] = useState("");
    const [selectedEducationLevel,setSelectedEducationLevel] = useState('');
    const [selectedProfession,setSelectedProfession] = useState('');
    const [selectedGProfession, setSelectedGProfession] = useState("");

    const [selectedpaymentCurrency,setSelectedPaymentCurrency] =useState('');
    const [selectedWeeklyHoliday,setSelectedWeeklyHoliday] = useState([]);
    const [selectedConsanguineous,setSelectedConsanguineous] = useState('');
    const [selectedBrotherUnmarried, setSelectedBrotherUnmarried ] =useState('');
    const [selectedBrothermarried, setSelectedBrothermarried] = useState("");
    const [brotherfatherInLaw,setBrotherFatherInLaw]=useState([]);
    const [sisterBrotherInLaw, setSisterBrotherInLaw] = useState([]);
    const [selectedSisterUnmarried, setSelectedSisterUnmarried] =useState("");
    const [selectedSistermarried, setSelectedSistermarried] = useState("");
    const [selectedKakaCount,setSelectedKakaCount] = useState('');
    const [selectedFuvaCount, setSelectedFuvaCount] = useState("");
    const [selectedMamaCount, setSelectedMamaCount] = useState("");
    const [selectedMavsaCount, setSelectedMavsaCount] = useState("");
    const [selectedKaka, setSelectedKaka] = useState([
      { name: "", phone: "", mobile:"",whatsapp:"",email:"", address: "" },
    ]);
    const [selectedFuwa, setSelectedFuwa] = useState([
      { name: "", phone: "", address: "" },
    ]);
    const [selectedMama, setSelectedMama] = useState("");
    const [selectedMavsa, setSelectedMavsa] = useState("");
    const [imageSrc, setImageSrc] = useState(null);
    const [img,setImg] = useState('');
    const [heightInInches, setHeightInInches] = useState('');
    const [heightInCms, setHeightInCms] = useState('');
   
    // const handleSubmit = (event)=>{
    //     event.preventDefault();
    //     const form = event.target;
    //     console.log('form data is--->',form)
    // }

    const [, forceUpdate] = useReducer((x) => x + 1, 0);

   const blood_group= ["A +ive", "B +ive", "AB +ive", "O +ive", "A -ive", "B -ive", "AB -ive", "O -ive"]
   const gotra = ["काश्यप", "खालप", "गहिलम", "गौतम", "मांडव", "लोकाक्ष"];
  const kuldevi = [
    "श्री. अंबिका भवानी माता, निझर वेलदा, नंदुरबार",
    "श्री. अन्नपूर्णा माता, कापडणे, धुळे",
    "श्री. आशापुरी माता, शिंदखेडा-पाटण, धुळे",
    "श्री. एकवीरा माता, धुळे",
    "श्री. एकवीरा माता, वणी आंबोडे, धुळे",
    "श्री. खंबाअंबा माता, हिंगणी",
    "श्री. जोगेश्वरी माता, जोगशेलू / शेलुमेथी विखरण, शिंदखेडा",
    "श्री. जोगेश्वरी माता, बेटावद",
    "श्री. जोगेश्वरी माता, मुडी मांडळ",
    "श्री. धनाई-पुनाई माता, झिरणीपाडा, निजामपूर",
    "श्री. पेडकाई माता, चिमठाणे, शिंदखेडा, धुळे",
    "श्री. मठंबा माता, बेटावद",
    "श्री. मनुदेवी, आडगाव, चोपडा, जळगाव",
    "श्री. म्हाळसा माता बेटावद ता. शिंदखेडा, जि. धुळे",
    "श्री. सारजा बारजा माता, बहाळ, चाळीसगाव",
    "श्री. सुलाई माता, उंटावद, शिरपूर",
  ];
  const education_level_completed = [
    "10th",
    "12th",
    "Diploma",
    "Graduate",
    "Post Graduate / Master",
    "Doctorate",
  ];

    const your_profession = [
      "सरकारी नोकरी",
      "खाजगी नोकरी",
      "व्यवसाय मालक",
      "स्वयंरोजगार व्यावसायिक",
      "शेतकरी",
      "सेवानिवृत्त",
    ];

    const maleSalutations = [
      "श्री.",
      "डॉ.",
      "कै.",
    ];
    const femaleSalutations = ["सौ.", "श्रीमती.", "डॉ.", "कै."];
    const unmarriedMaleSalutations = ["चि.", "श्री.", "डॉ."];
    const unmarriedFemaleSalutations = ["कु.", "डॉ."];
    const Payment_currency= ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"]
    const weeklyHolidays = [
      "रविवार",
      "सोमवार",
      "मंगळवार",
      "बुधवार",
      "गुरुवार",
      "शुक्रवार",
      "शनिवार",
      "Flexible or Rotational Holiday",
      "No Holiday",
    ];
   const Brothers_Unmarried= [1, 2, 3, 4, 5]
   const Brothers_married = [1, 2, 3, 4, 5];
   const Sisters_Unmarried = [1, 2, 3, 4, 5];
   const Sisters_married = [1, 2, 3, 4, 5];

  const [userData, setData] = useState(null);
  const [isloading, setisloading] = useState(true);
  const [clicked,setClicked] = useState(false);
      const token = localStorage.getItem("token");
      useEffect(() => {
        getProfile();
      }, []);
      
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
          } else {
            const data = await response.json();
            console.log(data); // Log the fetched data
            setData(data.profile);
            setisloading(false);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

       useEffect(() => {
        console.log('kaka---->',userData?.fathers_family_details)
        setImageSrc(userData?.personal_details?.photo[0]);
        setImg(userData?.personal_details?.photo[0]);
        setHeightInInches(userData?.personal_details?.height);
        setSelectedGender(userData?.personal_details?.gender);
        setSelectedGotra(userData?.personal_details?.gotra);
         setSelectedBloodGroup(userData?.personal_details?.blood_group);
         setSelectedKuldevi(userData?.personal_details?.kuldevi);
         setSelectedEducationLevel(
           userData?.educational_details?.education_level
         );
         setSelectedProfession(userData?.professional_details?.profession);
        setSelectedGProfession(userData?.family_details?.guardians_profession)
         setSelectedPaymentCurrency(
           userData?.professional_details?.payment_currency
         );
         
         setSelectedConsanguineous(
           userData?.contact_details?.consanguineous_marriage
         );
         setSelectedBrotherUnmarried(
           userData?.brothers_details?.brother_unmarried
         );
         setSelectedBrothermarried(userData?.brothers_details?.brother_married);
         setBrotherFatherInLaw(
           userData?.brothers_details?.father_in_law_name_phone?.filter(
             (kakaName) => kakaName !== null && kakaName.trim() !== ""
           )
         );
         setSisterBrotherInLaw(
           userData?.sisters_details?.brothers_in_law_name_phone?.filter(
             (kakaName) => kakaName !== null && kakaName.trim() !== ""
           )
         );
         setSelectedSisterUnmarried(
           userData?.sisters_details?.sisters_unmarried
         );
         setSelectedSistermarried(userData?.sisters_details?.sisters_married);
        setSelectedKakaCount(
          userData?.fathers_family_details?.kaka?.length
        );
         setSelectedKaka(
           userData?.fathers_family_details?.kaka
         );
         setSelectedFuvaCount(
           userData?.fathers_family_details?.fuva?.length
         );
         setSelectedFuwa(
           userData?.fathers_family_details?.fuva
         );
         setSelectedMamaCount(
           userData?.mothers_family_details?.mama?.length
         );
         setSelectedMama(
           userData?.mothers_family_details?.mama
         );
         setSelectedMavsaCount(
           userData?.mothers_family_details?.mavsa?.length
         );
         setSelectedMavsa(
           userData?.mothers_family_details?.mavsa
         );
       }, [userData]);

            useEffect(() => {
            const parseHeightString = (heightString) => {
                const match = heightString.match(/^(\d+)'(\d+)"$/);
                if (match) {
                const feet = parseFloat(match[1]);
                const inches = parseFloat(match[2]);
                return { feet, inches };
                }
                return null;
            };

            const inchesToCms = (inches) => inches * 2.54;

            if (heightInInches) {
                const heightObject = parseHeightString(heightInInches);

                if (heightObject) {
                const totalInches = heightObject.feet * 12 + heightObject.inches;
                setHeightInCms(inchesToCms(totalInches).toFixed(2));
                } else {
                setHeightInCms("");
                }
            } else {
                setHeightInCms("");
            }
            }, [heightInInches]);

            useEffect(() => {
            // Extract values from the API response string and create an array
            const weeklyHolidaysArray = userData?.professional_details?.weekly_holiday
                ? userData.professional_details.weekly_holiday
                    .split(",")
                    .map((day) => day.trim())
                : [];

            // Create options array in the required format
            const options = weeklyHolidaysArray.map((day) => ({
                value: day,
                label: day,
            }));

            // Set the initial selected values
            setSelectedWeeklyHoliday(options);
            }, [userData?.professional_details?.weekly_holiday]);

       const inLawFields = Array.from(
         { length: parseInt(selectedBrothermarried, 10) },
         (_, index) => index + 1
       );

       const brotherFields = Array.from(
         { length: parseInt(selectedBrotherUnmarried, 10) },
         (_, index) => index + 1
       );

       const brothersInLawFields = Array.from(
         { length: parseInt(selectedSistermarried, 10) },
         (_, index) => index + 1
       );

       const sisterFields = Array.from(
         { length: parseInt(selectedSisterUnmarried, 10) },
         (_, index) => index + 1
       );

        const kakaFields = Array.from(
          {
            length: parseInt(selectedKakaCount, 10),
          },
          (_, index) => index + 1
        );

        const fuvaFields = Array.from(
          {
            length: parseInt(selectedFuvaCount, 10),
          },
          (_, index) => index + 1
        );
        const mamaFields = Array.from(
          {
            length: parseInt(selectedMamaCount, 10),
          },
          (_, index) => index + 1
        );
        const mavsaFields = Array.from(
          {
            length: parseInt(selectedMavsaCount, 10),
          },
          (_, index) => index + 1
        );

          const handleEditClick = () => {
            // Trigger file input click
            document.getElementById("fileInput").click();
            setClicked(true);
          };

          const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
              // Use FileReader to read the selected file
              const reader = new FileReader();

              reader.onload = (e) => {
                // Update the image source with the selected file
                setImageSrc(e.target.result);
              };

              reader.readAsDataURL(file);
              setImg(file)
              setClicked(true)
            }
          };

        //   Update API
        const handleSubmit = async (event) => {
          setLoadingIcon(true);

          event.preventDefault();
          const form = event.target;

        const formData = new FormData();
        if (imageSrc && typeof imageSrc === "string" && !imageSrc.startsWith("https://")) {
            formData.append("photo", img);
        }
        else{
        }
        // Personal Details
        formData.append("personal_details[fullname]", form.name.value);
        formData.append("personal_details[birth_name]", form.birth_name.value);
        formData.append("personal_details[birth_time]", form.birth_time.value);
        formData.append("personal_details[birth_date]", form.birth_date.value);
        formData.append(
          "personal_details[birth_place]",
          form.birth_place.value
        );
        formData.append("personal_details[height]", heightInInches);
        formData.append("personal_details[height_cm]", heightInCms);
        formData.append(
          "personal_details[blood_group]",
          form.blood_group.value
        );
        formData.append("personal_details[weight]", form.weight.value);
        formData.append("personal_details[gender]", form.gender.value);
        formData.append("personal_details[gotra]", form.gotra.value);
        formData.append("personal_details[kuldevi]", form.kuldevi.value);

        // Educational Details
        formData.append(
          "educational_details[education_level]",
          form.education_level.value
        );
        formData.append(
          "educational_details[education_detail]",
          form.education_detail.value
        );
        formData.append(
          "educational_details[special_education]",
          form.special_education.value
        );
        formData.append(
          "educational_details[special_information]",
          form.special_information.value
        );

        // Professional Details
        formData.append(
          "professional_details[profession]",
          form.profession.value
        );
        formData.append(
          "professional_details[job_title]",
          form.job_title.value
        );
        formData.append(
          "professional_details[company_name]",
          form.company_name.value
        );
        formData.append(
          "professional_details[job_address]",
          form.job_address.value
        );
        formData.append(
          "professional_details[monthly_income]",
          form.monthly_income.value
        );
        formData.append(
          "professional_details[payment_currency]",
          form.payment_currency.value
        );
        formData.append(
          "professional_details[work_city]",
          form.work_city.value
        );
        const selectedValues = selectedWeeklyHoliday.map(
          (option) => option.value
        );

        formData.append(
          "professional_details[weekly_holiday]",
          selectedValues.join(",")
        );

        // Contact Details
        formData.append(
          "contact_details[consanguineous_marriage]",
          form.consanguineous_marriage.value
        );
        formData.append(
          "contact_details[whatsapp]",
          form.whatsapp.value
        );
        formData.append(
          "contact_details[telephone]",
          form.telephone.value
        );
        formData.append(
          "contact_details[current_address]",
          form.current_address.value
        );
        formData.append(
          "contact_details[partner_expectations]",
          form.partner_expectations.value
        );

        // Family Details
        formData.append("family_details[guardian]", form.guardian.value);
        formData.append(
          "family_details[father][salutation]",
          form.father_salutation.value
        );
        formData.append("family_details[father][name]", form.fathers_name.value);
        formData.append(
          "family_details[father][phone]",
          form.father_phone.value
        );
        formData.append(
          "family_details[father][email]",
          form.father_email.value
        );
        formData.append(
          "family_details[father][whatsapp]",
          form.father_whatsapp.value
        );
        formData.append(
          "family_details[father][mobile]",
          form.father_mobile.value
        );
        formData.append(
          "family_details[father][address]",
          form.father_address.value
        );

        // mother details
        formData.append(
          "family_details[mother][salutation]",
          form.mother_salutation.value
        );
        formData.append(
          "family_details[mother][name]",
          form.mothers_name.value
        );
        formData.append(
          "family_details[mother][phone]",
          form.mother_phone.value
        );
        formData.append(
          "family_details[mother][email]",
          form.mother_email.value
        );
        formData.append(
          "family_details[mother][whatsapp]",
          form.mother_whatsapp.value
        );
        formData.append(
          "family_details[mother][mobile]",
          form.mother_mobile.value
        );
        formData.append(
          "family_details[mother][address]",
          form.mother_address.value
        );
        formData.append(
          "family_details[guardians_profession]",
          form.guardians_profession.value
        );
        formData.append("family_details[designation]", form.designation.value);
        formData.append("family_details[address]", form.parents_address.value);
        

        // Brothers Details
        formData.append(
          "brothers_details[brother_unmarried]",
          form.brother_unmarried.value
        );
         if (form.brother_unmarried.value > 0) {
           for (let index = 0; index < form.brother_unmarried.value; index++) {
             formData.append(
               `brothers_details[brothers][${index}][salutation]`,
               form[`brother_salutation_${index}`].value
             );
             formData.append(
               `brothers_details[brothers][${index}][name]`,
               form[`brother_name_${index}`].value
             );
             formData.append(
               `brothers_details[brothers][${index}][phone]`,
               form[`brother_phone_${index}`].value
             );
             formData.append(
               `brothers_details[brothers][${index}][email]`,
               form[`brother_email_${index}`].value
             );
             formData.append(
               `brothers_details[brothers][${index}][whatsapp]`,
               form[`brother_whatsapp_${index}`].value
             );
             formData.append(
               `brothers_details[brothers][${index}][mobile]`,
               form[`brother_mobile_${index}`].value
             );
             formData.append(
               `brothers_details[brothers][${index}][address]`,
               form[`brother_address_${index}`].value
             );
           }
         } else {
         }
        formData.append(
          "brothers_details[brother_married]",
          form.brother_married.value
        );
        if (form.brother_married.value > 0) {
          for (let index = 0; index < form.brother_married.value; index++) {
             formData.append(
               `brothers_details[father_in_law][${index}][salutation]`,
               form[`brother_father_in_law_salutation_${index}`].value
             );
             formData.append(
               `brothers_details[father_in_law][${index}][name]`,
               form[`brother_father_in_law_name_${index}`].value
             );
             formData.append(
               `brothers_details[father_in_law][${index}][phone]`,
               form[`brother_father_in_law_phone_${index}`].value
             );
             formData.append(
               `brothers_details[father_in_law][${index}][email]`,
               form[`brother_father_in_law_email_${index}`].value
             );
             formData.append(
               `brothers_details[father_in_law][${index}][whatsapp]`,
               form[`brother_father_in_law_whatsapp_${index}`].value
             );
             formData.append(
               `brothers_details[father_in_law][${index}][mobile]`,
               form[`brother_father_in_law_mobile_${index}`].value
             );
             formData.append(
               `brothers_details[father_in_law][${index}][address]`,
               form[`brother_father_in_law_address_${index}`].value
             );
          }
        } else {
        }

        // Sisters Details
        formData.append(
          "sisters_details[sisters_unmarried]",
          form.sisters_unmarried.value
        );
         if (form.sisters_unmarried.value > 0) {
           for (let index = 0; index < form.sisters_unmarried.value; index++) {
             formData.append(
               `sisters_details[sisters][${index}][salutation]`,
               form[`sister_salutation_${index}`].value
             );
             formData.append(
               `sisters_details[sisters][${index}][name]`,
               form[`sister_name_${index}`].value
             );
             formData.append(
               `sisters_details[sisters][${index}][phone]`,
               form[`sister_phone_${index}`].value
             );
             formData.append(
               `sisters_details[sisters][${index}][email]`,
               form[`sister_email_${index}`].value
             );
             formData.append(
               `sisters_details[sisters][${index}][whatsapp]`,
               form[`sister_whatsapp_${index}`].value
             );
             formData.append(
               `sisters_details[sisters][${index}][mobile]`,
               form[`sister_mobile_${index}`].value
             );
             formData.append(
               `sisters_details[sisters][${index}][address]`,
               form[`sister_address_${index}`].value
             );
           }
         } else {
         }
        formData.append(
          "sisters_details[sisters_married]",
          form.sisters_married.value
        );
        if (form.sisters_married.value > 0) {
          for (let index = 0; index < form.sisters_married.value; index++) {
            formData.append(
              `sisters_details[brother_in_law][${index}][salutation]`,
              form[`sister_brother_in_law_salutation_${index}`].value
            );
            formData.append(
              `sisters_details[brother_in_law][${index}][name]`,
              form[`sister_brother_in_law_name_${index}`].value
            );
            formData.append(
              `sisters_details[brother_in_law][${index}][phone]`,
              form[`sister_brother_in_law_phone_${index}`].value
            );
            formData.append(
              `sisters_details[brother_in_law][${index}][email]`,
              form[`sister_brother_in_law_email_${index}`].value
            );
            formData.append(
              `sisters_details[brother_in_law][${index}][whatsapp]`,
              form[`sister_brother_in_law_whatsapp_${index}`].value
            );
            formData.append(
              `sisters_details[brother_in_law][${index}][mobile]`,
              form[`sister_brother_in_law_mobile_${index}`].value
            );
            formData.append(
              `sisters_details[brother_in_law][${index}][address]`,
              form[`sister_brother_in_law_address_${index}`].value
            );
          }
        }


        // Father's Family Details
        formData.append(
          "fathers_family_details[grandfather][salutation]",
          form.father_grandfather_salutation.value
        );
        formData.append(
          "fathers_family_details[grandfather][name]",
          form.father_grandfather_name.value
        );
        formData.append(
          "fathers_family_details[grandfather][phone]",
          form.father_grandfather_phone.value
        );
        formData.append(
          "fathers_family_details[grandfather][email]",
          form.father_grandfather_email.value
        );
        formData.append(
          "fathers_family_details[grandfather][whatsapp]",
          form.father_grandfather_whatsapp.value
        );
        formData.append(
          "fathers_family_details[grandfather][mobile]",
          form.father_grandfather_mobile.value
        );
        formData.append(
          "fathers_family_details[grandfather][address]",
          form.father_grandfather_address.value
        );
       if (selectedKakaCount > 0) {
         for (let index = 0; index < selectedKakaCount; index++) {
          formData.append(
            `fathers_family_details[kaka][${index}][salutation]`,
            form[`fathers_family_details_kaka_salutation_${index}`].value
          );
           formData.append(
             `fathers_family_details[kaka][${index}][name]`,
             form[`fathers_family_details_kaka_name_${index}`].value
           );
           formData.append(
             `fathers_family_details[kaka][${index}][phone]`,
             form[`fathers_family_details_kaka_phone_${index}`].value
           );
           formData.append(
             `fathers_family_details[kaka][${index}][email]`,
             form[`fathers_family_details_kaka_email_${index}`].value
           );
           formData.append(
             `fathers_family_details[kaka][${index}][whatsapp]`,
             form[`fathers_family_details_kaka_whatsapp_${index}`].value
           );
           formData.append(
             `fathers_family_details[kaka][${index}][mobile]`,
             form[`fathers_family_details_kaka_mobile_${index}`].value
           );
           formData.append(
             `fathers_family_details[kaka][${index}][address]`,
             form[`fathers_family_details_kaka_address_${index}`].value
           );

         }
       } else {
       }
         if (selectedFuvaCount > 0) {
           for (let index = 0; index < selectedFuvaCount; index++) {
            formData.append(
              `fathers_family_details[fuva][${index}][salutation]`,
              form[`fathers_family_details_fuva_salutation_${index}`].value
            );
            formData.append(
              `fathers_family_details[fuva][${index}][name]`,
              form[`fathers_family_details_fuva_name_${index}`].value
            );
            formData.append(
              `fathers_family_details[fuva][${index}][phone]`,
              form[`fathers_family_details_fuva_phone_${index}`].value
            );
            formData.append(
              `fathers_family_details[fuva][${index}][email]`,
              form[`fathers_family_details_fuva_email_${index}`].value
            );
            formData.append(
              `fathers_family_details[fuva][${index}][whatsapp]`,
              form[`fathers_family_details_fuva_whatsapp_${index}`].value
            );
            formData.append(
              `fathers_family_details[fuva][${index}][mobile]`,
              form[`fathers_family_details_fuva_mobile_${index}`].value
            );
            formData.append(
              `fathers_family_details[fuva][${index}][address]`,
              form[`fathers_family_details_fuva_address_${index}`].value
            );

           }
         } else {
         }

        // Mother's Family Details
        // formData.append(
        //   "mothers_family_details[grandfather_name]",
        //   form.mother_grandfather_name.value
        // );
        // formData.append(
        //   "mothers_family_details[grandfather_village]",
        //   form.mother_grandfather_village.value
        // );
        formData.append(
          "mothers_family_details[grandfather][salutation]",
          form.mother_grandfather_salutation.value
        );
        formData.append(
          "mothers_family_details[grandfather][name]",
          form.mother_grandfather_name.value
        );
        formData.append(
          "mothers_family_details[grandfather][phone]",
          form.mother_grandfather_phone.value
        );
        formData.append(
          "mothers_family_details[grandfather][email]",
          form.mother_grandfather_email.value
        );
        formData.append(
          "mothers_family_details[grandfather][whatsapp]",
          form.mother_grandfather_whatsapp.value
        );
        formData.append(
          "mothers_family_details[grandfather][mobile]",
          form.mother_grandfather_mobile.value
        );
        formData.append(
          "mothers_family_details[grandfather][address]",
          form.mother_grandfather_address.value
        );
         if (selectedMamaCount > 0) {
           for (let index = 0; index < selectedMamaCount; index++) {
            formData.append(
              `mothers_family_details[mama][${index}][salutation]`,
              form[`mothers_family_details_mama_salutation_${index}`].value
            );
            formData.append(
              `mothers_family_details[mama][${index}][name]`,
              form[`mothers_family_details_mama_name_${index}`].value
            );
            formData.append(
              `mothers_family_details[mama][${index}][phone]`,
              form[`mothers_family_details_mama_phone_${index}`].value
            );
            formData.append(
              `mothers_family_details[mama][${index}][email]`,
              form[`mothers_family_details_mama_email_${index}`].value
            );
            formData.append(
              `mothers_family_details[mama][${index}][whatsapp]`,
              form[`mothers_family_details_mama_whatsapp_${index}`].value
            );
            formData.append(
              `mothers_family_details[mama][${index}][mobile]`,
              form[`mothers_family_details_mama_mobile_${index}`].value
            );
            formData.append(
              `mothers_family_details[mama][${index}][address]`,
              form[`mothers_family_details_mama_address_${index}`].value
            );
             
           }
         } else {
         }
         if (selectedMavsaCount > 0) {
           for (let index = 0; index < selectedMavsaCount; index++) {
            formData.append(
              `mothers_family_details[mavsa][${index}][salutation]`,
              form[`mothers_family_details_mavsa_salutation_${index}`].value
            );
            formData.append(
              `mothers_family_details[mavsa][${index}][name]`,
              form[`mothers_family_details_mavsa_name_${index}`].value
            );
            formData.append(
              `mothers_family_details[mavsa][${index}][phone]`,
              form[`mothers_family_details_mavsa_phone_${index}`].value
            );
            formData.append(
              `mothers_family_details[mavsa][${index}][email]`,
              form[`mothers_family_details_mavsa_email_${index}`].value
            );
            formData.append(
              `mothers_family_details[mavsa][${index}][whatsapp]`,
              form[`mothers_family_details_mavsa_whatsapp_${index}`].value
            );
            formData.append(
              `mothers_family_details[mavsa][${index}][mobile]`,
              form[`mothers_family_details_mavsa_mobile_${index}`].value
            );
            formData.append(
              `mothers_family_details[mavsa][${index}][address]`,
              form[`mothers_family_details_mavsa_address_${index}`].value
            );

           }
         } else {
         }
        
        console.log('form dat is--->',formData)
            try {
              const response = await fetch(
                "https://api.welkinhawk.in.net/api/users/edit",
                // "http://localhost:8000/api/users/edit",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  body: formData,
                }
              );

              console.log("Response status:", response);
              const result = await response.json();
              console.log("API Data:", result);
              if (result.status) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: result.message,
                  showConfirmButton: false,
                  timer: 3000,
                });
                
              } else {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: result.message,
                  showConfirmButton: false,
                  timer: 3000,
                });
              }
            } catch (error) {
              console.error("Error fetching data:", error.message);
              Swal.fire({
                position: "center",
                icon: "warning",
                title: error.message,
                showConfirmButton: false,
                timer: 3000,
              });
            } finally {
              setLoadingIcon(false);
            }
        };


         const generateHeightOptions = () => {
           const options = [];
           for (let feet = 4; feet <= 7; feet++) {
             for (let inches = 1; inches <= 11; inches++) {
               const formattedHeight = `${feet}'${
                 inches < 10 ? "0" : ""
               }${inches}"`;
               options.push(
                 <option key={formattedHeight} value={formattedHeight}>
                   {formattedHeight}
                 </option>
               );
             }
           }
           return options;
         };


          const options = weeklyHolidays.map((key) => ({
            value: key,
            label: key,
          }));

    return (
      <>
        <div className="pb-8 px-4">
          <h1 className="text-3xl py-5">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center bg-red relative">
              <div className="relative">
                <img
                  className="w-32 h-32 sm:mt-0 sm:w-48 sm:h-48 rounded-full border border-4"
                  src={imageSrc}
                  draggable={false}
                />
                <div
                  className="absolute top-5 right-2 cursor-pointer p-2 bg-gray-300 rounded-full"
                  onClick={handleEditClick}
                >
                  <FaEdit />
                </div>
              </div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-2 mb-5">
              Personal Details
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.personal_details?.fullname}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="birth_name"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Birth Name
                </label>
                <input
                  type="text"
                  id="birth_name"
                  placeholder="Birth name"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.personal_details?.birth_name}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="birth_date"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Date of birth
                </label>
                <input
                  type="date"
                  id="birth_date"
                  placeholder="Date of birth"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.personal_details?.birth_date}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="birth_time"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Birth time
                </label>
                <input
                  type="time"
                  name={"birth_time"}
                  id="birth_time"
                  defaultValue={userData?.personal_details?.birth_time}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="birth_place"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Birth Place
                </label>
                <input
                  type="text"
                  id="birth_place"
                  placeholder="Birth Place"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.personal_details?.birth_place}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="blood_group"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Blood Group
                </label>
                <select
                  id="blood_group"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                >
                  <option value="">Select option</option>
                  {blood_group.map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="height"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Height (In Inches)
                </label>
                <select
                  id="height"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={heightInInches}
                  onChange={(e) => setHeightInInches(e.target.value)}
                >
                  <option value="">Select Height</option>
                  {generateHeightOptions()}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="heightInCms"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Height (In Centimeters)
                </label>
                <input
                  type="number"
                  id="heightInCms"
                  placeholder="Height (in centimeters)"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={heightInCms}
                  onChange={(e) => setHeightInCms(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="weight"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Weight (In kgs)
                </label>
                <input
                  type="number"
                  id="weight"
                  placeholder="Weight"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.personal_details?.weight}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Gender
                </label>
                <select
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="">Select option</option>
                  <option value="उपवर">उपवर</option>
                  <option value="उपवधु">उपवधु</option>
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="gotra"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Gotra
                </label>
                <select
                  id="gotra"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={selectedGotra}
                  onChange={(e) => setSelectedGotra(e.target.value)}
                >
                  <option value="">Select option</option>
                  {gotra.map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="kuldevi"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Kuldevi
                </label>
                <select
                  id="kuldevi"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={selectedKuldevi}
                  onChange={(e) => setSelectedKuldevi(e.target.value)}
                >
                  <option value="">Select option</option>
                  {kuldevi.map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="consanguineous_marriage"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Would you be open for Sagotra Vivah ?
                </label>
                <select
                  id="consanguineous_marriage"
                  value={selectedConsanguineous}
                  onChange={(e) => setSelectedConsanguineous(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                >
                  <option value="">Select option</option>
                  <option value="होय">होय</option>
                  <option value="नाही"> नाही </option>
                  <option value="कदाचीत">कदाचीत </option>
                </select>
              </div>
            </div>
            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-5">
              Education Details
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="education_level"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Education Level Completed{" "}
                </label>
                <select
                  id="education_level"
                  value={selectedEducationLevel}
                  onChange={(e) => setSelectedEducationLevel(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                >
                  <option value="">Select option</option>
                  {education_level_completed.map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="education_detail"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Education Details
                </label>
                <input
                  type="text"
                  id="education_detail"
                  placeholder="Education Details"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5 "
                  defaultValue={userData?.educational_details?.education_detail}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="special_education"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Special Education
                </label>
                <input
                  type="text"
                  id="special_education"
                  placeholder="Special Education"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={
                    userData?.educational_details?.special_education
                  }
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="special_information"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Special Information about yourself
                </label>
                <input
                  type="text"
                  id="special_information"
                  placeholder="Special Information"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={
                    userData?.educational_details?.special_information
                  }
                />
              </div>
            </div>

            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-5">
              Professional Details
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Your profession
                </label>
                <select
                  id="profession"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={selectedProfession}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                >
                  <option value="">Select option</option>
                  {your_profession.map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="job_title"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Job Title
                </label>
                <input
                  type="text"
                  id="job_title"
                  placeholder="Job Title"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.professional_details?.job_title}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="company_name"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Company or Business Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  placeholder="Company or Business name"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.professional_details?.company_name}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="monthly_income"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Monthly Income
                </label>
                <input
                  type="number"
                  id="monthly_income"
                  placeholder="Monthly Income"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.professional_details?.monthly_income}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="payment_currency"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Payment Currency
                </label>
                <select
                  id="payment_currency"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={selectedpaymentCurrency}
                  onChange={(e) => setSelectedPaymentCurrency(e.target.value)}
                >
                  <option value="">Select option</option>
                  {Payment_currency.map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="job_address"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Job Address
                </label>
                <input
                  type="text"
                  id="job_address"
                  placeholder="Job Address"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.professional_details?.job_address}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="work_city"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Work City
                </label>
                <input
                  type="text"
                  id="work_city"
                  placeholder="Work City"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.professional_details?.work_city}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="weekly_holiday"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Weekly Holiday
                </label>
                <Select
                  id="weekly_holiday"
                  value={selectedWeeklyHoliday}
                  onChange={(selectedOptions) =>
                    setSelectedWeeklyHoliday(selectedOptions)
                  }
                  options={options}
                  isMulti
                />
              </div>
            </div>

            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-5">
              Contact Details
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="whatsapp"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Whatsapp number
                </label>
                <input
                  type="number"
                  id="whatsapp"
                  pattern="\+?[0-9]{10,15}"
                  title="Please enter a valid number"
                  placeholder="Whatsapp number"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.contact_details?.whatsapp}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="telephone"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Telephone number
                </label>
                <input
                  type="number"
                  id="telephone"
                  pattern="\+?[0-9]{10,15}"
                  title="Please enter a valid number"
                  placeholder="Telephone number"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.contact_details?.telephone}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="current_address"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Current Address
                </label>
                <input
                  type="text"
                  id="current_address"
                  placeholder="Address"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.contact_details?.current_address}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="partner_expectations"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Expectations about partner
                </label>
                <input
                  type="text"
                  id="partner_expectations"
                  placeholder="Expectations about partner"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.contact_details?.partner_expectations}
                />
              </div>
            </div>

            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-5">
              Family Details
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 sm:gap-6">
              <div>
                <select
                  id="guardian"
                  className="bg-gray-50 border w-[20%] mb-5 mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                  defaultValue={userData?.family_details.guardian}
                  value={userData?.family_details.guardian}
                  onChange={(e) => {
                    userData.family_details.guardian = e.target.value;
                    forceUpdate();
                  }}
                >
                  <option value="">Select</option>
                  <option value="पालक">पालक</option>
                  <option value="वडिल">वडिल</option>
                </select>
                <div
                  className="grid gap-4 md:grid-cols-2 border-2 rounded-lg p-3 lg:grid-cols-2 sm:gap-6"
                  style={{ gridTemplateColumns: "60% 30%" }}
                >
                  <div className="w-full">
                    <label
                      htmlFor="fathers_name"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {" "}
                      Name
                    </label>
                    <div className="flex">
                      <select
                        id="father_salutation"
                        className="bg-gray-50 border w-[40%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                        defaultValue={
                          userData?.family_details.father.salutation
                        }
                        value={userData?.family_details.father.salutation}
                        onChange={(e) => {
                          userData.family_details.father.salutation =
                            e.target.value;
                          forceUpdate();
                        }}
                      >
                        <option value="">Select</option>
                        {maleSalutations.map((key) => (
                          <option value={key}>{key}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        id="fathers_name"
                        name="family_details[father][name]"
                        defaultValue={userData?.family_details.father.name}
                        placeholder="Name"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="father_mobile"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {" "}
                      Mobile
                    </label>
                    <input
                      type="number"
                      pattern="\+?[0-9]{10,15}"
                      title="Please enter a valid number"
                      id="father_mobile"
                      name="family_details[father][mobile]"
                      defaultValue={userData?.family_details.father?.mobile}
                      placeholder="Mobile"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="father_email"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {" "}
                      Email
                    </label>
                    <input
                      type="email"
                      id="father_email"
                      name="family_details[father][email]"
                      defaultValue={userData?.family_details.father?.email}
                      placeholder="Email"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="father_whatsapp"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {" "}
                      WhatsApp
                    </label>
                    <input
                      type="number"
                      pattern="\+?[0-9]{10,15}"
                      title="Please enter a valid number"
                      id="father_whatsapp"
                      name="family_details[father][whatsapp]"
                      defaultValue={userData?.family_details.father?.whatsapp}
                      placeholder="WhatsApp"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="father_address"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {" "}
                      Address
                    </label>
                    <input
                      type="text"
                      id="father_address"
                      name="family_details[father][address]"
                      defaultValue={userData?.family_details.father?.address}
                      placeholder="Address"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="father_phone"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {" "}
                      Phone
                    </label>
                    <input
                      type="number"
                      id="father_phone"
                      pattern="\+?[0-9]{10,15}"
                      title="Please enter a valid number"
                      name="family_details[father][phone]"
                      defaultValue={userData?.family_details.father?.phone}
                      placeholder="Phone"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mx-2 mb-2">Mother</h3>
                <div
                  className="grid gap-4 md:grid-cols-2 border-2 rounded-lg p-3 lg:grid-cols-2 sm:gap-6"
                  style={{ gridTemplateColumns: "60% 30%" }}
                >
                  <div className="w-full">
                    <label
                      htmlFor="mothers_name"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Name
                    </label>
                    <div className="flex">
                      <select
                        id="mother_salutation"
                        className="bg-gray-50 border w-[80px] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                        value={userData?.family_details.mother.salutation}
                        onChange={(e) => {
                          userData.family_details.mother.salutation =
                            e.target.value;
                          forceUpdate();
                        }}
                      >
                        <option value="">Select</option>
                        {femaleSalutations.map((key) => (
                          <option value={key}>{key}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        id="mothers_name"
                        name="family_details[mother][name]"
                        defaultValue={userData?.family_details.mother?.name}
                        placeholder="Name"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>

                  {/* Mother's Mobile Section */}
                  <div className="w-full">
                    <label
                      htmlFor="mother_mobile"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Mobile
                    </label>
                    <input
                      type="number"
                      pattern="\+?[0-9]{10,15}"
                      title="Please enter a valid number"
                      id="mother_mobile"
                      name="family_details[mother][mobile]"
                      defaultValue={userData?.family_details.mother?.mobile}
                      placeholder="Mobile"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>
                  {/* Mother's Email Section */}
                  <div className="w-full">
                    <label
                      htmlFor="mother_email"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="mother_email"
                      name="family_details[mother][email]"
                      defaultValue={userData?.family_details.mother?.email}
                      placeholder="Email"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>

                  {/* Mother's WhatsApp Section */}
                  <div className="w-full">
                    <label
                      htmlFor="mother_whatsapp"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      WhatsApp
                    </label>
                    <input
                      type="number"
                      pattern="\+?[0-9]{10,15}"
                      title="Please enter a valid number"
                      id="mother_whatsapp"
                      name="family_details[mother][whatsapp]"
                      defaultValue={userData?.family_details.mother?.whatsapp}
                      placeholder="WhatsApp"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>

                  {/* Mother's Address Section */}
                  <div className="w-full">
                    <label
                      htmlFor="mother_address"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="mother_address"
                      name="family_details[mother][address]"
                      defaultValue={userData?.family_details.mother?.address}
                      placeholder="Address"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>
                  {/* Mother's Phone Section */}
                  <div className="w-full">
                    <label
                      htmlFor="mother_phone"
                      className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Phone
                    </label>
                    <input
                      type="number"
                      id="mother_phone"
                      pattern="\+?[0-9]{10,15}"
                      title="Please enter a valid number"
                      name="family_details[mother][phone]"
                      defaultValue={userData?.family_details.mother?.phone}
                      placeholder="Phone"
                      className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* Add similar structure for other family details fields */}

              <div className="w-full">
                <label
                  htmlFor="guardians_profession"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Guardians Profession
                </label>
                {/* <input
                  type="text"
                  id="guardians_profession"
                  defaultValue={userData?.family_details?.guardians_profession}
                  placeholder="Guardians Profession"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                /> */}
                <select
                  id="guardians_profession"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  value={selectedGProfession}
                  onChange={(e) => setSelectedGProfession(e.target.value)}
                >
                  <option value="">Select option</option>
                  {your_profession.map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="designation"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Job Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  defaultValue={userData?.family_details?.designation}
                  placeholder="Job Designation"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="parents_address"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Complete address of parents
                </label>
                <input
                  type="text"
                  id="parents_address"
                  defaultValue={userData?.family_details?.address}
                  placeholder="Address"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>
            </div>

            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-5">
              Brother Information
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 sm:gap-6">
              <div>
                <div className="w-full">
                  <label
                    htmlFor="brother_unmarried"
                    className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {" "}
                    Brothers Unmarried
                  </label>
                  <select
                    id="brother_unmarried"
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    value={selectedBrotherUnmarried}
                    onChange={(e) =>
                      setSelectedBrotherUnmarried(e.target.value)
                    }
                  >
                    <option value="0">Select option</option>
                    {Brothers_Unmarried.map((key) => (
                      <option value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div>
                  {selectedBrotherUnmarried > 0 && (
                    <h3 className="mx-2 mt-5">Brother</h3>
                  )}
                  {brotherFields.map((_, index) => (
                    <div
                      className="grid gap-4 md:grid-cols-2 border-2 mt-5 rounded-lg p-3 lg:grid-cols-2 sm:gap-6"
                      style={{ gridTemplateColumns: "60% 30%" }}
                    >
                      {/* Brothers Name Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_father_in_law_name"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Name
                        </label>
                        <div className="flex">
                          <select
                            id={`brother_salutation_${index}`}
                            className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                            value={
                              userData?.brothers_details?.brothers?.[index]
                                ?.salutation
                            }
                            onChange={(e) => {
                              userData.brothers_details.brothers[
                                index
                              ].salutation = e.target.value;
                              forceUpdate();
                            }}
                          >
                            <option value="">Select</option>
                            {unmarriedMaleSalutations.map((key) => (
                              <option value={key}>{key}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            id={`brother_name_${index}`}
                            name="family_details[brother][father_in_law][name]"
                            defaultValue={
                              userData?.brothers_details?.brothers?.[index]
                                ?.name
                            }
                            placeholder="Name"
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                          />
                        </div>
                      </div>
                      {/* Mobile Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_mobile"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Mobile
                        </label>
                        <input
                          type="number"
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          id={`brother_mobile_${index}`}
                          name="family_details[brother][father_in_law][mobile]"
                          defaultValue={
                            userData?.brothers_details?.brothers?.[index].mobile
                          }
                          placeholder="Mobile"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                      {/* Email Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_email"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id={`brother_email_${index}`}
                          name="family_details[brother][father_in_law][email]"
                          defaultValue={
                            userData?.brothers_details?.brothers?.[index].email
                          }
                          placeholder="Email"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* WhatsApp Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_whatsapp"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          WhatsApp
                        </label>
                        <input
                          type="number"
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          id={`brother_whatsapp_${index}`}
                          name="family_details[brother][father_in_law][whatsapp]"
                          defaultValue={
                            userData?.brothers_details?.brothers?.[index]
                              ?.whatsapp
                          }
                          placeholder="WhatsApp"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* Address Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_address"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id={`brother_address_${index}`}
                          name="family_details[brother][father_in_law][address]"
                          defaultValue={
                            userData?.brothers_details?.brothers?.[index]
                              .address
                          }
                          placeholder="Address"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* Phone Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_phone"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          id={`brother_phone_${index}`}
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          name="family_details[brother][father_in_law][phone]"
                          defaultValue={
                            userData?.brothers_details?.brothers?.[index]?.phone
                          }
                          placeholder="Phone"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="w-full">
                  <label
                    htmlFor="brother_married"
                    className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {" "}
                    Brothers Married
                  </label>
                  <select
                    id="brother_married"
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    value={selectedBrothermarried}
                    onChange={(e) => {
                      const newSelectedValue = e.target.value;
                      setSelectedBrothermarried(newSelectedValue);

                      // Update brotherfatherInLaw based on the new selected value
                      const updatedBrotherFatherInLaw =
                        newSelectedValue === "0"
                          ? []
                          : brotherfatherInLaw.slice(0, newSelectedValue);

                      setBrotherFatherInLaw(updatedBrotherFatherInLaw);
                    }}
                  >
                    <option value="0">Select option</option>
                    {Brothers_married.map((key) => (
                      <option value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div>
                  {selectedBrothermarried > 0 && (
                    <h3 className="mx-2 mt-5">Brother's Father-in-law</h3>
                  )}
                  {inLawFields.map((_, index) => (
                    <div
                      className="grid gap-4 md:grid-cols-2 border-2 mt-5 rounded-lg p-3 lg:grid-cols-2 sm:gap-6"
                      style={{ gridTemplateColumns: "60% 30%" }}
                    >
                      {/* Name Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_father_in_law_name"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Name
                        </label>
                        <div className="flex">
                          <select
                            id={`brother_father_in_law_salutation_${index}`}
                            className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                            value={
                              userData?.brothers_details?.father_in_law[index]
                                ?.salutation
                            }
                            onChange={(e) => {
                              userData.brothers_details.father_in_law[
                                index
                              ].salutation = e.target.value;
                              forceUpdate();
                            }}
                          >
                            <option value="">Select</option>
                            {maleSalutations.map((key) => (
                              <option value={key}>{key}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            id={`brother_father_in_law_name_${index}`}
                            name="family_details[brother][father_in_law][name]"
                            defaultValue={
                              userData?.brothers_details?.father_in_law[index]
                                ?.name
                            }
                            placeholder="Name"
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                          />
                        </div>
                      </div>
                      {/* Mobile Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_father_in_law_mobile"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Mobile
                        </label>
                        <input
                          type="number"
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          id={`brother_father_in_law_mobile_${index}`}
                          name="family_details[brother][father_in_law][mobile]"
                          defaultValue={
                            userData?.brothers_details?.father_in_law?.[index]
                              .mobile
                          }
                          placeholder="Mobile"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                      {/* Email Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_father_in_law_email"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id={`brother_father_in_law_email_${index}`}
                          name="family_details[brother][father_in_law][email]"
                          defaultValue={
                            userData?.brothers_details?.father_in_law?.[index]
                              .email
                          }
                          placeholder="Email"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* WhatsApp Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_father_in_law_whatsapp"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          WhatsApp
                        </label>
                        <input
                          type="number"
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          id={`brother_father_in_law_whatsapp_${index}`}
                          name="family_details[brother][father_in_law][whatsapp]"
                          defaultValue={
                            userData?.brothers_details?.father_in_law?.[index]
                              .whatsapp
                          }
                          placeholder="WhatsApp"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* Address Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_father_in_law_address"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id={`brother_father_in_law_address_${index}`}
                          name="family_details[brother][father_in_law][address]"
                          defaultValue={
                            userData?.brothers_details?.father_in_law?.[index]
                              .address
                          }
                          placeholder="Address"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                      {/* Phone Section */}
                      <div className="w-full">
                        <label
                          htmlFor="brother_father_in_law_phone"
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          id={`brother_father_in_law_phone_${index}`}
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          name="family_details[brother][father_in_law][phone]"
                          defaultValue={
                            userData?.brothers_details?.father_in_law?.[index]
                              .phone
                          }
                          placeholder="Phone"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-5">
              Sister Information
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 sm:gap-6">
              <div>
                <div className="w-full">
                  <label
                    htmlFor="sisters_unmarried"
                    className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {" "}
                    Sisters Unmarried
                  </label>
                  <select
                    id="sisters_unmarried"
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    value={selectedSisterUnmarried}
                    onChange={(e) => setSelectedSisterUnmarried(e.target.value)}
                  >
                    <option value="0">Select option</option>
                    {Sisters_Unmarried.map((key) => (
                      <option value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div>
                  {selectedSisterUnmarried > 0 && (
                    <h3 className="mx-2 mt-5">Sister</h3>
                  )}
                  {sisterFields?.map((_, index) => (
                    <div
                      className="grid gap-4 md:grid-cols-2 border-2 mt-5 rounded-lg p-3 lg:grid-cols-2 sm:gap-6"
                      style={{ gridTemplateColumns: "60% 30%" }}
                    >
                      {/* Sister's Brother-in-law Name Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_name_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Name
                        </label>
                        <div className="flex">
                          <select
                            id={`sister_salutation_${index}`}
                            className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                            value={
                              (userData?.sisters_details?.sisters || [])[index]
                                ?.salutation
                            }
                            onChange={(e) => {
                              userData.sisters_details.sisters[
                                index
                              ].salutation = e.target.value;
                              forceUpdate();
                            }}
                          >
                            <option value="">Select</option>
                            {unmarriedFemaleSalutations.map((key) => (
                              <option value={key} key={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            id={`sister_name_${index}`}
                            name="family_details[sister][brother_in_law][name]"
                            defaultValue={
                              (userData?.sisters_details?.sisters || [])[index]
                                ?.name
                            }
                            placeholder="Name"
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                          />
                        </div>
                      </div>

                      {/* Brother-in-law Mobile Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_mobile_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Mobile
                        </label>
                        <input
                          type="number"
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          id={`sister_mobile_${index}`}
                          name="family_details[sister][brother_in_law][mobile]"
                          defaultValue={
                            (userData?.sisters_details?.sisters || [])[index]
                              ?.mobile
                          }
                          placeholder="Mobile"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* Brother-in-law Email Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_email_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id={`sister_email_${index}`}
                          name="family_details[sister][brother_in_law][email]"
                          defaultValue={
                            (userData?.sisters_details?.sisters || [])[index]
                              ?.email
                          }
                          placeholder="Email"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* Brother-in-law WhatsApp Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_whatsapp_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          WhatsApp
                        </label>
                        <input
                          type="number"
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          id={`sister_whatsapp_${index}`}
                          name="family_details[sister][brother_in_law][whatsapp]"
                          defaultValue={
                            (userData?.sisters_details?.sisters || [])[index]
                              ?.whatsapp
                          }
                          placeholder="WhatsApp"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* Address Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_address_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id={`sister_address_${index}`}
                          name="family_details[sister][brother_in_law][address]"
                          defaultValue={
                            (userData?.sisters_details?.sisters || [])[index]
                              ?.address
                          }
                          placeholder="Address"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                      {/* Brother-in-law Phone Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_phone_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          id={`sister_phone_${index}`}
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          name="family_details[sister][brother_in_law][phone]"
                          defaultValue={
                            (userData?.sisters_details?.sisters || [])[index]
                              ?.phone
                          }
                          placeholder="Phone"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="w-full">
                  <label
                    htmlFor="sisters_married"
                    className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {" "}
                    Sisters Married
                  </label>
                  <select
                    id="sisters_married"
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    value={selectedSistermarried}
                    onChange={(e) => {
                      const newSelectedValue = e.target.value;
                      setSelectedSistermarried(newSelectedValue);
                      // Update sisterBrotherInLaw based on the new selected value
                      const updatedSisterBrotherInLaw =
                        newSelectedValue === "0"
                          ? []
                          : sisterBrotherInLaw.slice(0, newSelectedValue);

                      setSisterBrotherInLaw(updatedSisterBrotherInLaw);
                    }}
                  >
                    <option value="0">Select option</option>
                    {Sisters_married.map((key) => (
                      <option value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div>
                  {selectedSistermarried > 0 && (
                    <h3 className="mx-2 mt-5">Sister's Husband</h3>
                  )}
                  {brothersInLawFields?.map((_, index) => (
                    <div
                      className="grid gap-4 md:grid-cols-2 border-2 mt-5 rounded-lg p-3 lg:grid-cols-2 sm:gap-6"
                      style={{ gridTemplateColumns: "60% 30%" }}
                    >
                      {/* Sister's Brother-in-law Name Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_brother_in_law_name_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Name
                        </label>
                        <div className="flex">
                          <select
                            id={`sister_brother_in_law_salutation_${index}`}
                            className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                            value={
                              (userData?.sisters_details?.brother_in_law || [])[
                                index
                              ]?.salutation
                            }
                            onChange={(e) => {
                              userData.sisters_details.brother_in_law[
                                index
                              ].salutation = e.target.value;
                              forceUpdate();
                            }}
                          >
                            <option value="">Select</option>
                            {maleSalutations.map((key) => (
                              <option value={key} key={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            id={`sister_brother_in_law_name_${index}`}
                            name="family_details[sister][brother_in_law][name]"
                            defaultValue={
                              (userData?.sisters_details?.brother_in_law || [])[
                                index
                              ]?.name
                            }
                            placeholder="Sister's Brother-in-law Name"
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                          />
                        </div>
                      </div>
                      {/* Sister's Brother-in-law Mobile Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_brother_in_law_mobile_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Mobile
                        </label>
                        <input
                          type="number"
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          id={`sister_brother_in_law_mobile_${index}`}
                          name="family_details[sister][brother_in_law][mobile]"
                          defaultValue={
                            (userData?.sisters_details?.brother_in_law || [])[
                              index
                            ]?.mobile
                          }
                          placeholder="Mobile"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                      {/* Sister's Brother-in-law Email Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_brother_in_law_email_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id={`sister_brother_in_law_email_${index}`}
                          name="family_details[sister][brother_in_law][email]"
                          defaultValue={
                            (userData?.sisters_details?.brother_in_law || [])[
                              index
                            ]?.email
                          }
                          placeholder="Email"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* Sister's Brother-in-law WhatsApp Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_brother_in_law_whatsapp_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          WhatsApp
                        </label>
                        <input
                          type="number"
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          id={`sister_brother_in_law_whatsapp_${index}`}
                          name="family_details[sister][brother_in_law][whatsapp]"
                          defaultValue={
                            (userData?.sisters_details?.brother_in_law || [])[
                              index
                            ]?.whatsapp
                          }
                          placeholder="WhatsApp"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>

                      {/* Sister's Brother-in-law Address Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_brother_in_law_address_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id={`sister_brother_in_law_address_${index}`}
                          name="family_details[sister][brother_in_law][address]"
                          defaultValue={
                            (userData?.sisters_details?.brother_in_law || [])[
                              index
                            ]?.address
                          }
                          placeholder="Address"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                      {/* Sister's Brother-in-law Phone Section */}
                      <div className="w-full">
                        <label
                          htmlFor={`sister_brother_in_law_phone_${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          id={`sister_brother_in_law_phone_${index}`}
                          pattern="\+?[0-9]{10,15}"
                          title="Please enter a valid number"
                          name="family_details[sister][brother_in_law][phone]"
                          defaultValue={
                            (userData?.sisters_details?.brother_in_law || [])[
                              index
                            ]?.phone
                          }
                          placeholder="Phone"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-5">
              Father's Family Information
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="father_grandfather_name"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's Name
                </label>
                <div className="flex">
                  <select
                    id={`father_grandfather_salutation`}
                    className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                    value={
                      userData?.fathers_family_details?.grandfather?.salutation
                    }
                    onChange={(e) => {
                      userData.fathers_family_details.grandfather.salutation =
                        e.target.value;
                      forceUpdate();
                    }}
                  >
                    <option value="">Select</option>
                    {maleSalutations.map((key) => (
                      <option value={key} key={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    id="father_grandfather_name"
                    defaultValue={
                      userData?.fathers_family_details?.grandfather?.name
                    }
                    placeholder="Grandfather's Name"
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="father_grandfather_mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's mobile
                </label>
                <input
                  type="number"
                  pattern="\+?[0-9]{10,15}"
                  title="Please enter a valid number"
                  id="father_grandfather_mobile"
                  name="family_details[father][mobile]"
                  defaultValue={
                    userData?.fathers_family_details?.grandfather?.mobile
                  }
                  placeholder="Grandfather's mobile"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="father_grandfather_email"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's email
                </label>
                <input
                  type="email"
                  id="father_grandfather_email"
                  name="family_details[father][email]"
                  defaultValue={
                    userData?.fathers_family_details?.grandfather?.email
                  }
                  placeholder="Grandfather's email"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="father_grandfather_whatsapp"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's WhatsApp
                </label>
                <input
                  type="number"
                  pattern="\+?[0-9]{10,15}"
                  title="Please enter a valid number"
                  id="father_grandfather_whatsapp"
                  name="family_details[father][whatsapp]"
                  defaultValue={
                    userData?.fathers_family_details?.grandfather?.whatsapp
                  }
                  placeholder="Grandfather's WhatsApp"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="father_grandfather_phone"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's phone
                </label>
                <input
                  type="number"
                  id="father_grandfather_phone"
                  pattern="\+?[0-9]{10,15}"
                  title="Please enter a valid number"
                  name="family_details[father][phone]"
                  defaultValue={
                    userData?.fathers_family_details?.grandfather?.phone
                  }
                  placeholder="Grandfather's phone"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="father_grandfather_address"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's native village
                </label>
                <input
                  type="text"
                  id="father_grandfather_address"
                  name="family_details[father][address]"
                  defaultValue={
                    userData?.fathers_family_details?.grandfather?.address
                  }
                  placeholder="Grandfather's address"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 sm:gap-6">
              <div>
                <div className="w-full py-3">
                  <label
                    htmlFor="kaka_count"
                    className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {" "}
                    Number of Kaka
                  </label>
                  <select
                    id="kaka_count"
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    value={selectedKakaCount}
                    onChange={(e) => {
                      const newSelectedValue = e.target.value;
                      setSelectedKakaCount(newSelectedValue);
                      const kaka = Array.from(
                        { length: parseInt(newSelectedValue, 10) },
                        () => ({
                          name: "",
                          phone: "",
                          address: "",
                        })
                      );
                      setSelectedKaka(kaka);
                    }}
                  >
                    <option value="0">Select option</option>
                    <option value="1">1</option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                  </select>
                </div>

                {kakaFields?.map((_, index) => (
                  <div
                    className="grid gap-4 md:grid-cols-2 mt-5 rounded-lg border-2 p-3 lg:grid-cols-2 sm:gap-6"
                    style={{ gridTemplateColumns: "60% 30%" }}
                  >
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_kaka_name_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Name
                      </label>
                      <div className="flex">
                        <select
                          id={`fathers_family_details_kaka_salutation_${index}`}
                          className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                          value={
                            (userData?.fathers_family_details?.kaka || [])[
                              index
                            ]?.salutation
                          }
                          onChange={(e) => {
                            userData.fathers_family_details.kaka[
                              index
                            ].salutation = e.target.value;
                            forceUpdate();
                          }}
                        >
                          <option value="">Select</option>
                          {maleSalutations.map((key) => (
                            <option value={key} key={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          id={`fathers_family_details_kaka_name_${index}`}
                          name="fathers_family_details[kaka][name]"
                          defaultValue={
                            (userData?.fathers_family_details?.kaka || [])[
                              index
                            ]?.name
                          }
                          placeholder="Name"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>

                    {/* Mobile Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_kaka_mobile_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Mobile
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`fathers_family_details_kaka_mobile_${index}`}
                        name="fathers_family_details[kaka][mobile]"
                        defaultValue={
                          (userData?.fathers_family_details?.kaka || [])[index]
                            ?.mobile
                        }
                        placeholder="Mobile"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* Email Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_kaka_email_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id={`fathers_family_details_kaka_email_${index}`}
                        name="fathers_family_details[kaka][email]"
                        defaultValue={
                          (userData?.fathers_family_details?.kaka || [])[index]
                            ?.email
                        }
                        placeholder="Email"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* WhatsApp Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_kaka_whatsapp_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        WhatsApp
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`fathers_family_details_kaka_whatsapp_${index}`}
                        name="fathers_family_details[kaka][whatsapp]"
                        defaultValue={
                          (userData?.fathers_family_details?.kaka || [])[index]
                            ?.whatsapp
                        }
                        placeholder="WhatsApp"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* Address Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_kaka_address_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id={`fathers_family_details_kaka_address_${index}`}
                        name="fathers_family_details[kaka][address]"
                        defaultValue={
                          (userData?.fathers_family_details?.kaka || [])[index]
                            ?.address
                        }
                        placeholder="Address"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                    {/* Phone Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_kaka_phone_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`fathers_family_details_kaka_phone_${index}`}
                        name="fathers_family_details[kaka][phone]"
                        defaultValue={
                          (userData?.fathers_family_details?.kaka || [])[index]
                            ?.phone
                        }
                        placeholder="Phone"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="w-full py-3">
                  <label
                    htmlFor="fuwa_count"
                    className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {" "}
                    Number of Fuwa{" "}
                  </label>
                  <select
                    id="fuwa_count"
                    value={selectedFuvaCount}
                    onChange={(e) => {
                      const newSelectedValue = e.target.value;
                      setSelectedFuvaCount(newSelectedValue);
                      const fuva = Array.from(
                        { length: parseInt(newSelectedValue, 10) },
                        () => ({
                          name: "",
                          phone: "",
                          address: "",
                        })
                      );
                      setSelectedFuwa(fuva);
                    }}
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  >
                    <option value="0">Select option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                {fuvaFields?.map((_, index) => (
                  <div
                    className="grid gap-4 md:grid-cols-2 mt-5 rounded-lg border-2 p-3 lg:grid-cols-2 sm:gap-6"
                    style={{ gridTemplateColumns: "60% 30%" }}
                  >
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_fuva_name_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Name
                      </label>
                      <div className="flex">
                        <select
                          id={`fathers_family_details_fuva_salutation_${index}`}
                          className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                          value={
                            (userData?.fathers_family_details?.fuva || [])[
                              index
                            ]?.salutation
                          }
                          onChange={(e) => {
                            userData.fathers_family_details.fuva[
                              index
                            ].salutation = e.target.value;
                            forceUpdate();
                          }}
                        >
                          <option value="">Select</option>
                          {maleSalutations.map((key) => (
                            <option value={key} key={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          id={`fathers_family_details_fuva_name_${index}`}
                          name="fathers_family_details[fuva][name]"
                          defaultValue={
                            (userData?.fathers_family_details?.fuva || [])[
                              index
                            ]?.name
                          }
                          placeholder="Name"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>

                    {/* Mobile Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_fuva_mobile_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Mobile
                      </label>
                      <input
                        type="text"
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit mobile number"
                        id={`fathers_family_details_fuva_mobile_${index}`}
                        name="fathers_family_details[fuva][mobile]"
                        defaultValue={
                          (userData?.fathers_family_details?.fuva || [])[index]
                            ?.mobile
                        }
                        placeholder="Mobile"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                    {/* Email Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_fuva_email_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id={`fathers_family_details_fuva_email_${index}`}
                        name="fathers_family_details[fuva][email]"
                        defaultValue={
                          (userData?.fathers_family_details?.fuva || [])[index]
                            ?.email
                        }
                        placeholder="Email"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* WhatsApp Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_fuva_whatsapp_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        WhatsApp
                      </label>
                      <input
                        type="text"
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit mobile number"
                        id={`fathers_family_details_fuva_whatsapp_${index}`}
                        name="fathers_family_details[fuva][whatsapp]"
                        defaultValue={
                          (userData?.fathers_family_details?.fuva || [])[index]
                            ?.whatsapp
                        }
                        placeholder="WhatsApp"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* Address Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_fuva_address_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id={`fathers_family_details_fuva_address_${index}`}
                        name="fathers_family_details[fuva][address]"
                        defaultValue={
                          (userData?.fathers_family_details?.fuva || [])[index]
                            ?.address
                        }
                        placeholder="Address"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                    {/* Phone Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`fathers_family_details_fuva_phone_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id={`fathers_family_details_fuva_phone_${index}`}
                        name="fathers_family_details[fuva][phone]"
                        defaultValue={
                          (userData?.fathers_family_details?.fuva || [])[index]
                            ?.phone
                        }
                        placeholder="Phone"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-5">
              Mother's Family Information
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="mother_grandfather_name"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's Name
                </label>
                <div className="flex">
                  <select
                    id={`mother_grandfather_salutation`}
                    className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                    value={
                      userData?.mothers_family_details?.grandfather?.salutation
                    }
                    onChange={(e) => {
                      userData.mothers_family_details.grandfather.salutation =
                        e.target.value;
                      forceUpdate();
                    }}
                  >
                    <option value="">Select</option>
                    {maleSalutations.map((key) => (
                      <option value={key} key={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    id="mother_grandfather_name"
                    defaultValue={
                      userData?.mothers_family_details?.grandfather?.name
                    }
                    placeholder="Grandfather's Name"
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="mother_grandfather_mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's mobile
                </label>
                <input
                  type="number"
                  pattern="\+?[0-9]{10,15}"
                  title="Please enter a valid number"
                  id="mother_grandfather_mobile"
                  name="family_details[father][mobile]"
                  defaultValue={
                    userData?.mothers_family_details?.grandfather?.mobile
                  }
                  placeholder="Grandfather's mobile"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="mother_grandfather_email"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's email
                </label>
                <input
                  type="email"
                  id="mother_grandfather_email"
                  name="family_details[father][email]"
                  defaultValue={
                    userData?.mothers_family_details?.grandfather?.email
                  }
                  placeholder="Grandfather's email"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="mother_grandfather_whatsapp"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's WhatsApp
                </label>
                <input
                  type="number"
                  pattern="\+?[0-9]{10,15}"
                  title="Please enter a valid number"
                  id="mother_grandfather_whatsapp"
                  name="family_details[father][whatsapp]"
                  defaultValue={
                    userData?.mothers_family_details?.grandfather?.whatsapp
                  }
                  placeholder="Grandfather's WhatsApp"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="mother_grandfather_phone"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's phone
                </label>
                <input
                  type="number"
                  id="mother_grandfather_phone"
                  pattern="\+?[0-9]{10,15}"
                  title="Please enter a valid number"
                  defaultValue={
                    userData?.mothers_family_details?.grandfather?.phone
                  }
                  placeholder="Grandfather's phone"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="mother_grandfather_address"
                  className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {" "}
                  Grandfather's native village
                </label>
                <input
                  type="text"
                  id="mother_grandfather_address"
                  name="family_details[father][address]"
                  defaultValue={
                    userData?.mothers_family_details?.grandfather?.address
                  }
                  placeholder="Grandfather's address"
                  className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 sm:gap-6">
              <div>
                <div className="w-full py-3">
                  <label
                    htmlFor="mama_count"
                    className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {" "}
                    Number of Mama
                  </label>
                  <select
                    id="mama_count"
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                    value={selectedMamaCount}
                    onChange={(e) => {
                      const newSelectedValue = e.target.value;
                      setSelectedMamaCount(newSelectedValue);
                      const mama =
                        newSelectedValue === "0"
                          ? []
                          : selectedMama.slice(0, newSelectedValue);
                      setSelectedMama(mama);
                    }}
                  >
                    <option value="0">Select option</option>
                    <option value="1">1</option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                  </select>
                </div>

                {mamaFields?.map((_, index) => (
                  <div
                    className="grid gap-4 md:grid-cols-2 mt-5 rounded-lg border-2 p-3 lg:grid-cols-2 sm:gap-6"
                    style={{ gridTemplateColumns: "60% 30%" }}
                  >
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mama_name_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Name
                      </label>
                      <div className="flex">
                        <select
                          id={`mothers_family_details_mama_salutation_${index}`}
                          className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                          value={
                            (userData?.mothers_family_details?.mama || [])[
                              index
                            ]?.salutation
                          }
                          onChange={(e) => {
                            userData.mothers_family_details.mama[
                              index
                            ].salutation = e.target.value;
                            forceUpdate();
                          }}
                        >
                          <option value="">Select</option>
                          {maleSalutations.map((key) => (
                            <option value={key} key={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          id={`mothers_family_details_mama_name_${index}`}
                          name="mothers_family_details[mama][name]"
                          defaultValue={
                            (userData?.mothers_family_details?.mama || [])[
                              index
                            ]?.name
                          }
                          placeholder="Name"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>

                    {/* Mobile Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mama_mobile_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Mobile
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`mothers_family_details_mama_mobile_${index}`}
                        name="mothers_family_details[mama][mobile]"
                        defaultValue={
                          (userData?.mothers_family_details?.mama || [])[index]
                            ?.mobile
                        }
                        placeholder="Mobile"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                    {/* Email Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mama_email_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id={`mothers_family_details_mama_email_${index}`}
                        name="mothers_family_details[mama][email]"
                        defaultValue={
                          (userData?.mothers_family_details?.mama || [])[index]
                            ?.email
                        }
                        placeholder="Email"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* WhatsApp Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mama_whatsapp_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        WhatsApp
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`mothers_family_details_mama_whatsapp_${index}`}
                        name="mothers_family_details[mama][whatsapp]"
                        defaultValue={
                          (userData?.mothers_family_details?.mama || [])[index]
                            ?.whatsapp
                        }
                        placeholder="WhatsApp"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* Address Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mama_address_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id={`mothers_family_details_mama_address_${index}`}
                        name="mothers_family_details[mama][address]"
                        defaultValue={
                          (userData?.mothers_family_details?.mama || [])[index]
                            ?.address
                        }
                        placeholder="Address"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                    {/* Phone Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mama_phone_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`mothers_family_details_mama_phone_${index}`}
                        name="mothers_family_details[mama][phone]"
                        defaultValue={
                          (userData?.mothers_family_details?.mama || [])[index]
                            ?.phone
                        }
                        placeholder="Phone"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="w-full py-3">
                  <label
                    htmlFor="mavsa_count"
                    className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {" "}
                    Number of Mavsa
                  </label>
                  <select
                    id="mavsa_count"
                    value={selectedMavsaCount}
                    onChange={(e) => {
                      const newSelectedValue = e.target.value;
                      setSelectedMavsaCount(newSelectedValue);
                      const mavsa =
                        newSelectedValue === "0"
                          ? []
                          : selectedMavsa.slice(0, newSelectedValue);
                      setSelectedMavsa(mavsa);
                    }}
                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                  >
                    <option value="0">Select option</option>
                    <option value="1">1</option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                  </select>
                </div>

                {mavsaFields?.map((_, index) => (
                  <div
                    className="grid gap-4 md:grid-cols-2 mt-5 rounded-lg border-2 p-3 lg:grid-cols-2 sm:gap-6"
                    style={{ gridTemplateColumns: "60% 30%" }}
                  >
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mavsa_name_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Name
                      </label>
                      <div className="flex">
                        <select
                          id={`mothers_family_details_mavsa_salutation_${index}`}
                          className="bg-gray-50 border w-[30%] mr-2 border-gray-300 text-base rounded-lg block w-full p-2.5"
                          value={
                            (userData?.mothers_family_details?.mavsa || [])[
                              index
                            ]?.salutation
                          }
                          onChange={(e) => {
                            userData.mothers_family_details.mavsa[
                              index
                            ].salutation = e.target.value;
                            forceUpdate();
                          }}
                        >
                          <option value="">Select</option>
                          {maleSalutations.map((key) => (
                            <option value={key} key={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          id={`mothers_family_details_mavsa_name_${index}`}
                          name="mothers_family_details[mavsa][name]"
                          defaultValue={
                            (userData?.mothers_family_details?.mavsa || [])[
                              index
                            ]?.name
                          }
                          placeholder="Name"
                          className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>

                    {/* Mobile Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mavsa_mobile_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Mobile
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`mothers_family_details_mavsa_mobile_${index}`}
                        name="mothers_family_details[mavsa][mobile]"
                        defaultValue={
                          (userData?.mothers_family_details?.mavsa || [])[index]
                            ?.mobile
                        }
                        placeholder="Mobile"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                    {/* Email Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mavsa_email_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id={`mothers_family_details_mavsa_email_${index}`}
                        name="mothers_family_details[mavsa][email]"
                        defaultValue={
                          (userData?.mothers_family_details?.mavsa || [])[index]
                            ?.email
                        }
                        placeholder="Email"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* WhatsApp Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mavsa_whatsapp_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        WhatsApp
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`mothers_family_details_mavsa_whatsapp_${index}`}
                        name="mothers_family_details[mavsa][whatsapp]"
                        defaultValue={
                          (userData?.mothers_family_details?.mavsa || [])[index]
                            ?.whatsapp
                        }
                        placeholder="WhatsApp"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>

                    {/* Address Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mavsa_address_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id={`mothers_family_details_mavsa_address_${index}`}
                        name="mothers_family_details[mavsa][address]"
                        defaultValue={
                          (userData?.mothers_family_details?.mavsa || [])[index]
                            ?.address
                        }
                        placeholder="Address"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                    {/* Phone Section */}
                    <div className="w-full">
                      <label
                        htmlFor={`mothers_family_details_mavsa_phone_${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        pattern="\+?[0-9]{10,15}"
                        title="Please enter a valid number"
                        id={`mothers_family_details_mavsa_phone_${index}`}
                        name="mothers_family_details[mavsa][phone]"
                        defaultValue={
                          (userData?.mothers_family_details?.mavsa || [])[index]
                            ?.phone
                        }
                        placeholder="Phone"
                        className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-10">
              <>
                <input
                  value="Save Biodata"
                  type="submit"
                  className={`bg-primary-normal text-white cursor-pointer font-medium rounded-md text-sm px-5 py-2.5`}
                />
              </>
              {loadingIcon && <LoaderIcon />}
            </div>
          </form>
        </div>
      </>
    );
};

export default EditBiodata;