import { useEffect, useState } from "react";
import Container from "../pages/Utils/Container";
import { LuMenu } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import Button from "../pages/Utils/Button";
import "./header.css";
import SocialWidget from "../pages/Utils/SocialWidget";
import Logo from "../pages/Utils/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoaderIcon from "../pages/Utils/LoaderIcon";
import useSelfUser from "../hooks/useSelfUser";
import Swal from "sweetalert2";

const Header = () => {
  const [headerNavDrawer, setHeaderNavDrawer] = useState(false);
  const { selfUser, refetchSelfUser, isLoadingSelfUser } = useSelfUser();
  const { user, loading } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const userType = localStorage.getItem('userType');
    const navigate = useNavigate();

 const handleLogOut = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("isLoggedIn");
   localStorage.removeItem("userType");
   Swal.fire({
     position: "center",
     icon: "success",
     title: "Logout Successfully!",
     showConfirmButton: false,
     timer: 3000,
   });
   setTimeout(() => {
   window.location.reload();
   navigate("/login");
   }, 2000);

 };
  useEffect(() => {
    refetchSelfUser();
  }, [loading, user, refetchSelfUser]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "isLoggedIn") {
        setIsLoggedIn(event.newValue);
      }
    };

    // Add event listener using BroadcastChannel
    const broadcastChannel = new BroadcastChannel("auth");
    broadcastChannel.addEventListener("message", handleStorageChange);

    // Remove the event listener when the component is unmounted
    return () => {
      broadcastChannel.removeEventListener("message", handleStorageChange);
      broadcastChannel.close();
    };
  }, []);
  return (
    <header className="bg-slate-50 border-b border-b-slate-200 z-50">
      <Container>
        {/* Main nav bar */}
        <div className="navigation flex justify-between gap-3 items-center py-4">
          <div className="block lg:hidden">
            <button
              onClick={() => setHeaderNavDrawer(!headerNavDrawer)}
              className="bg-primary-normal hover:bg-primary-hover py-2 px-3 text-white rounded-lg text-xl flex items-center gap-1"
            >
              <LuMenu />
            </button>
          </div>
          <div>
            <Logo width="w-36" />
          </div>
          <nav className="hidden lg:block">
            <ul className="header-menu flex gap-3 items-center justify-center">
              {/* <li>
                <NavLink
                  to={"/"}
                  className="text-base font-medium hover:!bg-primary-hover hover:text-white py-2 px-4 rounded-lg"
                >
                  {" "}
                  Home{" "}
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to={"/समिती"}
                  className="text-base font-medium hover:!bg-primary-hover hover:text-white py-2 px-4 rounded-lg"
                >
                  {" "}
                  समिती{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/वधु-वर"}
                  className="text-base font-medium hover:!bg-primary-hover hover:text-white py-2 px-4 rounded-lg"
                >
                  {" "}
                  वधु-वर{" "}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/माहिती"}
                  className="text-base font-medium hover:!bg-primary-hover hover:text-white py-2 px-4 rounded-lg"
                >
                  {" "}
                  माहिती{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/आमच्या-बद्दल"}
                  className="text-base font-medium hover:!bg-primary-hover hover:text-white py-2 px-4 rounded-lg"
                >
                  {" "}
                  आमच्या बद्दल{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/संपर्क"}
                  className="text-base font-medium hover:!bg-primary-hover hover:text-white py-2 px-4 rounded-lg"
                >
                  {" "}
                  संपर्क{" "}
                </NavLink>
              </li>
            </ul>
          </nav>
          <div>
            {loading ? (
              <>
                <div className="flex justify-start">
                  <span className="w-[53px] h-2"></span>
                  <LoaderIcon />
                  <span className="w-[53px] h-2"></span>
                </div>
              </>
            ) : (
              <>
                {isLoadingSelfUser ? (
                  <>
                    <div className="flex justify-start">
                      <span className="w-[53px] h-2"></span>
                      <LoaderIcon />
                      <span className="w-[53px] h-2"></span>
                    </div>
                  </>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <>
                        {selfUser?.userRole === "Admin" ? (
                          <>
                            <Button text="Dashboard" link="/dashboard/admin" />
                          </>
                        ) : (
                          <>
                            {userType === "guest" ? (
                              <button
                                onClick={() => handleLogOut()}
                                style={{
                                  alignSelf: "center",
                                  backgroundColor: "#D10002",
                                }}
                                className="bg-primary-normal hover:bg-primary-hover py-2 px-5 text-white rounded-lg text-base font-medium"
                              >
                                Logout
                              </button>
                            ) : (
                              <Button
                                text="Dashboard"
                                link="/dashboard/my-profile"
                              />
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Button text="Login" link="/login" />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {/* Main nav bar End*/}

        {/* Drawer area  */}
        <div
          onClick={() => setHeaderNavDrawer(false)}
          className={`${
            headerNavDrawer &&
            "lg:hidden fixed top-0 left-0 w-full h-screen bg-[#000000b0] z-50"
          }`}
        >
          <div
            className={`drawer-wrapper transform transition-transform duration-300 ease-in-out ${
              headerNavDrawer ? "translate-x-0 z-50" : "-translate-x-full"
            } lg:translate-x-0 lg:hidden fixed top-0 left-0 h-full w-80 bg-slate-50 overflow-hidden z-50`}
          >
            {/* Drawer content  */}
            <div className="h-screen relative overflow-y-auto">
              <button
                onClick={() => setHeaderNavDrawer(false)}
                className="absolute top-0 right-0 text-red-500 text-3xl p-5 hover:bg-[#ff000012]"
              >
                <MdClose />
              </button>

              <div className="p-4 pb-5 pt-16">
                <div>
                  <Logo width="w-56" />
                </div>
                <ul className="header-menu mt-10">
                  {/* <li className="py-2">
                    <NavLink
                      to={"/"}
                      className="text-base font-medium hover:!bg-primary-hover hover:text-white py-3 px-4 rounded-lg block"
                    >
                      {" "}
                      Home{" "}
                    </NavLink>
                  </li> */}
                  <li className="py-2">
                    <NavLink
                      to={"/समिती"}
                      className="text-base font-medium hover:!bg-primary-hover hover:text-white py-3 px-4 rounded-lg block"
                    >
                      {" "}
                      समिती{" "}
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      to={"/वधु-वर"}
                      className="text-base font-medium hover:!bg-primary-hover hover:text-white py-3 px-4 rounded-lg block"
                    >
                      {" "}
                      वधु-वर{" "}
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      to={"/माहिती"}
                      className="text-base font-medium hover:!bg-primary-hover hover:text-white py-3 px-4 rounded-lg block"
                    >
                      {" "}
                      माहिती{" "}
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      to={"/आमच्या-बद्दल"}
                      className="text-base font-medium hover:!bg-primary-hover hover:text-white py-3 px-4 rounded-lg block"
                    >
                      {" "}
                      आमच्या बद्दल{" "}
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      to={"/संपर्क"}
                      className="text-base font-medium hover:!bg-primary-hover hover:text-white py-3 px-4 rounded-lg block"
                    >
                      {" "}
                      संपर्क{" "}
                    </NavLink>
                  </li>
                  <div className="pl-4">
                    <SocialWidget />
                  </div>
                </ul>
              </div>
            </div>
            {/* Drawer content End */}
          </div>
        </div>
        {/* Drawer area End*/}
      </Container>
    </header>
  );
};

export default Header;
