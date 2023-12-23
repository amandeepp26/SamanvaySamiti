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
                    {/* <li className="mb-4 font-normal">
                      <a href="#" className="hover:underline">
                        Get Free Registration
                      </a>
                    </li>
                    <li className="mb-4 font-normal">
                      <a href="#" className="hover:underline">
                        Membership Plans
                      </a>
                    </li> */}
                    <li className="mb-4 font-normal">
                      <a href="/contact-us" className="hover:underline">
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
                      <a href="/privacy-policy" className="hover:underline">
                        Privacy policy
                      </a>
                    </li>
                    <li className="mb-4 font-normal">
                      <a href="#" className="hover:underline">
                        Terms and Condition
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
                      <p className="font-normal">
                        <b>Address :</b>लाडशाखीय वाणी समाज मंडळ समन्वय समिती आणि
                        संस्कारवाणी मुंबई
                      </p>
                    </li>
                    <li className="mb-4">
                      <p className="font-normal">
                        <b>Phone :</b> +91 9371935546
                      </p>
                    </li>
                    <li className="mb-4">
                      <p className="font-normal">
                        <b>Email :</b> contact@samanvaysamiti.com
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <div className="py-6 text-center">
                <span className="text-sm text-gray-400 sm:text-center">
                  © 2023{" "}
                  <a href="https://samanvaysamiti.com/">samanvaysamiti.com</a>.
                  All Rights Reserved. Developed & Supported by WelkinHawk{" "}
                  <a href="https://welkinhawk.com/">welkinhawk.com</a>
                </span>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
};

export default Footer;
