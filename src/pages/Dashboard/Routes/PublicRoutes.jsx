import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { IoIosBowtie } from "react-icons/io";

const PublicRoutes = () => {
    return (
        <>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/'}>
                    <span className="text-xl mt-1"><FaHome /></span>
                    <span>Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/biodatas'}>
                    <span className="text-xl mt-1"><MdLibraryBooks /></span>
                    <span>Biodatas</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/about-us'}>
                    <span className="text-xl mt-1"><IoIosBowtie /></span>
                    <span>About us</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2" to={'/contact-us'}>
                    <span className="text-xl mt-1"><BiSolidContact /></span>
                    <span>Contact us</span>
                </NavLink>
            </li>
   
        </>
    );
};

export default PublicRoutes;