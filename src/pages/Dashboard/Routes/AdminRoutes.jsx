import { NavLink } from "react-router-dom";
import { FaUsers, FaTachometerAlt } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { RiShutDownLine } from "react-icons/ri";
import { TbPremiumRights } from "react-icons/tb";
import { RiVerifiedBadgeLine } from "react-icons/ri";

const AdminRoutes = () => {
    return (
        <>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/admin'}>
                    <span className="text-xl mt-1"><FaTachometerAlt /></span>
                    <span>Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/users'}>
                    <span className="text-xl mt-1"><FaUsers /></span>
                    <span>Manage Users</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/premium'}>
                    <span className="text-xl mt-1"><TbPremiumRights /></span>
                    <span>Approved Premium</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/requested'}>
                    <span className="text-xl mt-1"><BiSolidContact /></span>
                    <span>Approved Contact Request</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/dashboard/stories'}>
                    <span className="text-xl mt-1"><RiVerifiedBadgeLine /></span>
                    <span>Success Story</span>
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

export default AdminRoutes;