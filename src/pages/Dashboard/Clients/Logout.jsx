import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Logout = () => {
  const { user, userlogOut } = useAuth();

  const [userData, setData] = useState(null);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Successfully!",
      showConfirmButton: false,
      timer: 3000,
    });
    navigate("/login");

    // userlogOut()
    //   .then(() => {
    //     console.log(" Sign-out successful ");
    //   })
    //   .catch(() => {
    //     console.log("Logout : An error happened");
    //   });
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await fetch(
        `https://api.welkinhawk.in.net/api/users/get-profile`,
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

  return (
    <div className="flex flex-col gap-y-2 h-96 justify-center items-center">
      <img
        className="w-20 h-20 mb-3 rounded-full shadow-lg"
        src={
          userData?.personal_details?.photo[0] ||
          "https://i.ibb.co/k2mWfq6/placeholder.jpg"
        }
        alt="Bonnie image"
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 ">
        {userData?.personal_details?.fullname || "name not found"}
      </h5>

      <span className="text-sm text-gray-500 ">
        {userData?.email || "Email not found"}
      </span>

      <button
        onClick={handleLogOut}
        className="px-4 rounded-md mt-5 py-2 text-sm font-medium bg-primary-normal text-white"
      >
        Log out
      </button>
    </div>
  );
};

export default Logout;
