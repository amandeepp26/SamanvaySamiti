
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const SocialWidget = () => {
    return (
        <div className="flex gap-5 items-center py-5">
            <a href="https://facebook.com/sohel5g/" target="blank" className="border-2 border-primary-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white p-[6px] text-primary-normal rounded-full">
                <FaFacebookF />
            </a>
            <a href="#" className="border-2 border-primary-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white p-[6px] text-primary-normal rounded-full">
                <FaInstagram />
            </a>
            <a href="https://github.com/sohel5G" target="blank" className="border-2 border-primary-normal hover:border-primary-hover hover:bg-primary-hover hover:text-white p-[6px] text-primary-normal rounded-full">
                <FaGithub />
            </a>
        </div>
    );
};

export default SocialWidget;