import SocialWidget from "../pages/Utils/SocialWidget";
import Logo from "../pages/Utils/Logo";
import Container from "../pages/Utils/Container";

const Footer = () => {
    return (
        <>
            <footer>
                <div className=" bg-[#f9fafbf5]">

                    <Container>
                        <div className="py-9">
                            <div className="grid grid-cols-1 gap-8 px-14 lg:px-4 lg:py-8 lg:grid-cols-4">
                                <div>
                                    <div className="-ml-3 lg:-ml-0">
                                        <Logo width="w-56" />
                                    </div>

                                    <div className="lg:pl-7 pl-0 pt-6">
                                        <SocialWidget />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-base font-semibold text-gray-900 uppercase">
                                        Help & Support
                                    </h2>
                                    <ul className="text-gray-500 font-medium">
                                        <li className="mb-4 font-normal">
                                            <a href="#" className="hover:underline">
                                                Get Free Registration
                                            </a>
                                        </li>
                                        <li className="mb-4 font-normal">
                                            <a href="#" className="hover:underline">
                                                Membership Plans
                                            </a>
                                        </li>
                                        <li className="mb-4 font-normal">
                                            <a href="#" className="hover:underline">
                                                Contact us
                                            </a>
                                        </li>
                                        <li className="mb-4 font-normal">
                                            <a href="#" className="hover:underline">
                                                FAQ
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-base font-semibold text-gray-900 uppercase">
                                        Legal
                                    </h2>
                                    <ul className="text-gray-500 font-medium">

                                        <li className="mb-4 font-normal">
                                            <a href="#" className="hover:underline">
                                                Privacy pilicy
                                            </a>
                                        </li>
                                        <li className="mb-4 font-normal">
                                            <a href="#" className="hover:underline">
                                                Terms and Condition
                                            </a>
                                        </li>
                                        <li className="mb-4 font-normal">
                                            <a href="#" className="hover:underline">
                                                Fraud Alert
                                            </a>
                                        </li>
                                        <li className="mb-4 font-normal">
                                            <a href="#" className="hover:underline">
                                                Cookie Policy
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-base font-semibold text-gray-900 uppercase">
                                        Quick Contact
                                    </h2>
                                    <ul className="text-gray-500 font-medium">
                                        <li className="mb-4">
                                            <p className="font-normal"><b>Address :</b> Bangladesh, Mymensingh, Kachijhuli more</p>
                                        </li>
                                        <li className="mb-4">
                                            <p className="font-normal"><b>Phone :</b> +88 01735 42 83 25</p>
                                        </li>
                                        <li className="mb-4">
                                            <p className="font-normal"><b>Email :</b> info@biyebari.com</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200">
                            <div className="py-6 text-center">
                                <span className="text-sm text-gray-400 sm:text-center">
                                    © 2023 <a href="https://flowbite.com/">biyebari.com</a>. All Rights
                                    Reserved
                                </span>
                            </div>
                        </div>
                    </Container>
                    
                </div>
            </footer>
        </>
    )
}

export default Footer;