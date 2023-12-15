import { Link } from "react-router-dom";
import error404 from "../../assets/img/404.png"

const ErrorPage = () => {
    return (
        <div className="bg-[#FBFAF9]">
            <div className="max-w-3xl mx-auto px-7 h-screen flex justify-center items-center">
                <div>
                    <div>
                        <img src={error404} alt="404 image" />
                    </div>
                    <div className="mt-10 text-center">
                        <Link className="text-primary-normal border-b border-primary-normal text-lg" to={'/'}> <button> Go to Home Page </button> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;

