import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { IoIosBowtie } from "react-icons/io";

const PublicRoutes = () => {
  return (
    <>
      <li>
        <NavLink
          className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2"
          to={"/"}
        >
          <span className="text-xl mt-1">
            <FaHome />
          </span>
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2"
          to={"/वधु-वर"}
        >
          <span className="text-xl mt-1">
            <MdLibraryBooks />
          </span>
          <span>वधु-वर</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2"
          to={"/आमच्या बद्दल"}
        >
          <span className="text-xl mt-1">
            <IoIosBowtie />
          </span>
          <span>आमच्या बद्दल</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:bg-gray-200 text-lg font-normal py-3 px-7 hover:text-primary-normal flex gap-2"
          to={"/संपर्क"}
        >
          <span className="text-xl mt-1">
            <BiSolidContact />
          </span>
          <span>संपर्क</span>
        </NavLink>
      </li>
    </>
  );
};

export default PublicRoutes;
