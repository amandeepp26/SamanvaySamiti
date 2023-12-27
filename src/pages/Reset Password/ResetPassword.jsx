import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import LoaderIcon from "../Utils/LoaderIcon";

const ResetPassword = () => {
  const [submitBtnLoader, setSubmitBtnLoader] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;

    if (password) {
      setSubmitBtnLoader(true);
      try {
        const response = await fetch(
          "https://api.welkinhawk.in.net/api/users/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resetToken: token, newPassword: password }),
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

          navigate(location?.state ? location?.state : "/");
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
        title: "Password field is required!",
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
              Create new password
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleResetPassword}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="cursor-pointer p-1 absolute top-[10px] right-[10px]"
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div> */}

              <div className="flex items-center gap-2">
                <input
                  value="Save"
                  type="submit"
                  className={`bg-primary-normal text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5`}
                />
                {submitBtnLoader && <LoaderIcon />}
              </div>

              {/* <p className=" text-sm font-light text-gray-500">
                                Don’t have an account yet?{" "}
                                <Link
                                    to={'/register'}
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p> */}
            </form>
            {/* <SocialLogin /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
