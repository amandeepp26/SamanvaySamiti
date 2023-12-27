import { useState } from "react";
import Swal from "sweetalert2";
import LoaderIcon from "../Utils/LoaderIcon";

const ForgotPassword = () => {
  const [submitBtnLoader, setSubmitBtnLoader] = useState(false);

  const handleUserLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;

    if (email) {
      setSubmitBtnLoader(true);
      try {
        const response = await fetch(
          "https://api.welkinhawk.in.net/api/users/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
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
        setSubmitBtnLoader(false);
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Email field is required!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <div className="px-5 py-10 lg:py-20 flex justify-center items-center">
        <div className="flex-1 max-w-md bg-white rounded-lg shadow">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-lg pb-2 font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Forgot password ?
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleUserLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <p className="text-xs font-regular mb-2 text-gray-500">
                  Enter your registered email address, you will receive a link
                  to reset your password.
                </p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  value="Save"
                  type="submit"
                  className={`bg-primary-normal text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5`}
                />
                {submitBtnLoader && <LoaderIcon />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
