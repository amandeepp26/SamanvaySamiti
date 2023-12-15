import { NavLink } from "react-router-dom";
import { FaEdit, FaHeart, FaTachometerAlt } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { RiShutDownLine } from "react-icons/ri";
import { GiLovers } from "react-icons/gi";

const ClientRoutes = () => {
    return (
        <>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/client'}>
                    <span className="text-xl mt-1"><FaTachometerAlt /></span>
                    <span>Dashboard</span>
                </NavLink>
            </li> 
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/add'}>
                    <span className="text-xl mt-1"><FaEdit /></span>
                    <span>Add/Edit Biodata</span>
                </NavLink>
            </li>

            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/view'}>
                    <span className="text-xl mt-1"> <MdLibraryBooks /> </span>
                    <span>View Biodata</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/request'}>
                    <span className="text-xl mt-1"><BiSolidContact /></span>
                    <span>Contact Request</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/favourite'}>
                    <span className="text-xl mt-1"><FaHeart /></span>
                    <span>My Favourites</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/got-married'}>
                    <span className="text-xl mt-1"><GiLovers /></span>
                    <span>Got Married</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/logout'}>
                    <span className="text-xl mt-1"><RiShutDownLine /></span>
                    <span>Logout</span>
                </NavLink>
            </li>   
        </>
    );
};

export default ClientRoutes;