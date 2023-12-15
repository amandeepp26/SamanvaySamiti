import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useSingleBiodataById from "../../../hooks/useSingleBiodataById";
import useAuth from "../../../hooks/useAuth";
import useSelfBiodata from "../../../hooks/useSelfBiodata";
import Button from "../../Utils/Button";
import LoaderIcon from "../../Utils/LoaderIcon";
import "./CheckoutForm.css"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_GATEWAY_PK_TEST);

const Payment = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [singleBiodata] = useSingleBiodataById(id);
    const { selfBiodata, isLoadingSelfBiodata } = useSelfBiodata();

    // eslint-disable-next-line no-unused-vars
    const { _id, ...itemWithoutId } = singleBiodata;
    const newItem = { ...itemWithoutId, requesterEmail: user?.email, requesterName: user?.displayName, requesterBiodataId: selfBiodata?.biodataId, request: 'Pending', biodataItemId: id, payed: 500 };


    return (
        <div className="bg-[#ffffff94] py-6 container px-4 mx-auto">
            {
                isLoadingSelfBiodata ?
                    <>
                        <div className="h-96 flex justify-center items-center">
                            <div>
                                <LoaderIcon />
                            </div>
                        </div>
                    </> :
                    <>
                        {
                            selfBiodata?.biodataId ?
                                <>

                                    <div className="flex flex-col md:flex-row gap-5 justify-center pt-7 pb-10 max-w-[668px] mx-auto">
                                        <div className="bg-white w-80 mx-auto shadow-md p-5 text-center">
                                            <h1 className="text-lg pb-3 font-semibold">Requesting for</h1>
                                            <img className="mx-auto w-20" src={singleBiodata?.img} alt="image" />
                                            <p className="flex justify-between text-base py-2 border-t border-b border-gray-200 mt-5 "> <span>Biodata ID</span> <span>{singleBiodata?.biodataId}</span></p>
                                            <p className="flex justify-between text-base py-2 border-b border-gray-200"> <span>Gender</span> <span>{singleBiodata?.type}</span></p>
                                            <p className="flex justify-between text-base py-2 border-b border-gray-200 "><span>Email</span><span></span> - </p>
                                        </div>
                                        <div className="bg-white w-80 mx-auto shadow-md p-5 text-center">
                                            <h1 className="text-lg pb-3 font-semibold">Requester</h1>
                                            <img className="mx-auto w-20" src={selfBiodata?.img} alt="image" />
                                            <p className="flex justify-between text-base py-2 border-t border-b border-gray-200 mt-5 "> <span>Biodata ID</span> <span>{selfBiodata?.biodataId}</span></p>
                                            <p className="flex justify-between text-base py-2 border-b border-gray-200"> <span>Gender</span> <span>{selfBiodata?.type}</span></p>
                                            <p className="flex justify-between text-base py-2 border-b border-gray-200 "><span>Email</span><span>{selfBiodata?.email}</span></p>
                                        </div>
                                    </div>

                                    <div className="pb-8">
                                        <h1 className="font-semibold text-2xl text-center text-sky-500">Payment Amount 500 TK</h1>
                                    </div>

                                    <div className="stripe-card-input max-w-[668px] mx-auto bg-gray-50 rounded-lg pt-11 mb-14 p-4">
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm newItem={newItem}></CheckoutForm>
                                        </Elements>
                                    </div>
                                </> :
                                <>
                                    <div className="flex h-96 items-center justify-center">
                                        <div className="text-center">
                                            <h1 className="text-4xl text-gray-400 font-medium py-2">Sorry !</h1>
                                            <p className="text-2xl text-gray-400 py-3 pb-7">Please create your own biodata first before send request to view other contact info</p>
                                            <Button text="Create My Biodata" link="/dashboard/add" />
                                        </div>
                                    </div>
                                </>
                        }
                    </>
            }
        </div>
    );
};

export default Payment;