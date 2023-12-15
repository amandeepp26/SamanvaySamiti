import { LuMenu } from "react-icons/lu";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./DashboardLayout.css";
import AdminRoutes from "../Dashboard/Routes/AdminRoutes";
import ClientRoutes from "../Dashboard/Routes/ClientRoutes";
import PublicRoutes from "../Dashboard/Routes/PublicRoutes";
import { Outlet } from "react-router-dom";
import useSelfUser from "../../hooks/useSelfUser";
import LoaderIcon from "../Utils/LoaderIcon";

const DashboardLayout = () => {
    const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1024);
    const { selfUser, isLoadingSelfUser } = useSelfUser();
    const isLargeScreen = window.innerWidth >= 1024;

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };


    useEffect(() => {
        const handleResize = () => {
            setShowSidebar(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const sidebarStyles = {
        transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 300ms ease-in-out',
    };

    return (
        <>

            {/* Open button on mobile screen */}
            <div className="lg:hidden flex justify-center my-3">
                <button onClick={toggleSidebar} className="hover:bg-primary-normal py-1 px-4 text-primary-normal hover:text-white rounded border-2 border-primary-normal text-xl flex items-center gap-1">
                    <LuMenu /> <span className="text-base font-medium">Dashboard</span>
                </button>
            </div>

            {/* Overlay Background for Main Content on Mobile */}
            {showSidebar && (<div className="lg:hidden fixed top-0 left-0 w-full h-full bg-[#000000b0]" onClick={toggleSidebar} />)}


            <div className="lg:grid lg:grid-cols-4 lg:gap-3">

                <div className="bg-gray-50 fixed lg:relative w-80 lg:w-full top-0 left-0 z-50" style={sidebarStyles} onClick={() => !isLargeScreen ? toggleSidebar() : ''}>
                    <div className="h-screen relative overflow-y-auto">
                        {showSidebar && (
                            <span onClick={toggleSidebar} className="absolute top-0 right-0 text-red-500 text-3xl p-5 hover:bg-[#ff000012] lg:hidden cursor-pointer">
                                <MdClose />
                            </span>
                        )}

                        {/* Sidebar content */}
                        <div>
                            <ul className="dashboard-menu mt-20 pb-10">

                                {
                                    isLoadingSelfUser ?
                                        <>
                                            <div className="flex h-60 justify-center items-center">
                                                <div> <LoaderIcon /> </div>
                                            </div>
                                        </> :
                                        <>
                                            {
                                                selfUser?.userRole === 'Admin' ?
                                                    <>
                                                        <AdminRoutes />
                                                    </> :
                                                    <>
                                                        <ClientRoutes />
                                                    </>
                                            }
                                        </>
                                }

                                <hr className="my-8" />

                                <PublicRoutes />

                            </ul>
                        </div>

                    </div>
                </div>


                {/*Dashboard Content here */}
                <div className='lg:col-span-3 p-4'>
                    <Outlet />
                </div>

            </div>
        </>
    );
};

export default DashboardLayout;
