import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderIcon from "../../Utils/LoaderIcon";
import Swal from "sweetalert2";
import useSelfUser from "../../../hooks/useSelfUser";
import useSelfBiodata from "../../../hooks/useSelfBiodata";

const ViewBiodata = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { selfUser, refetchSelfUser } = useSelfUser();
    const { selfBiodata, refetchSelfBiodata } = useSelfBiodata();

    const { isPending, data: singleBiodata = {} } = useQuery({
        queryKey: ['ownBiodata'],
        queryFn: async () => {
            const res = await axiosSecure(`/biodata/own/${user?.email}`);
            return res.data;
        }
    })

    const handleRequestForPro = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to make premium biodata",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes Please"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.put(`/request/user/to-pro/${user?.email}`)
                    .then(res => {

                        if (res.data.resultForUser.modifiedCount > 0 && res.data.resultForBiodata.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Request send for admin approve`,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }
                        refetchSelfUser();
                        refetchSelfBiodata();

                    }).catch((error) => {
                        if (error.message) {
                            Swal.fire({
                                position: "center",
                                icon: "warning",
                                title: error.message,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }
                        refetchSelfUser();
                        refetchSelfBiodata();
                    })
            }
        });

    }

    return (
        <div className="container mx-auto px-2 flex justify-center my-4">

            <div className="w-96 shadow p-5 pb-6  mt-5">
                {
                    isPending ?

                        <div className="flex justify-center items-center h-96">
                            <div> <LoaderIcon /> </div>
                        </div> :
                        <>
                            {
                                singleBiodata?.biodataId ?
                                    <>
                                        <div>
                                            <div className="w-48 mx-auto relative">
                                                <img className=" w-full" src={singleBiodata?.img} alt={singleBiodata?.name} />
                                            </div>
                                            <h1 className="font-medium text-xl py-2 border-b border-primary-normal text-center"><span className="font-bold">ID: </span> #0{singleBiodata?.biodataId}</h1>

                                            <p className="py-2 flex justify-between border-b pt-3"><span className="font-medium">Age :</span> {singleBiodata?.age}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Date Of Birth :</span> {singleBiodata?.birth}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Gender :</span> {singleBiodata?.type}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Occupation :</span> {singleBiodata?.occupation}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Religion :</span> {singleBiodata?.religion}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Race :</span> {singleBiodata?.race}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Height :</span> {singleBiodata?.height}ft  {singleBiodata?.inches}in</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Weight :</span> {singleBiodata?.weight} kg</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Fathers name :</span> {singleBiodata?.fathersName} kg</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Mothers name :</span> {singleBiodata?.mothersName} kg</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Permanent Division :</span> {singleBiodata?.permanentDivision}</p>
                                            <p className="py-2 flex justify-between"><span className="font-medium">Present Division :</span> {singleBiodata?.presentDivision}</p>

                                            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">Expected Partner</h1>

                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Expected Partner Age :</span> {singleBiodata?.expectedPartnerAge}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Expected Partner Height :</span> {singleBiodata?.expectedPartnerHeight}ft  {singleBiodata?.expectedPartnerInches}in</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Expected Partner Age :</span> {singleBiodata?.expectedPartnerAge}</p>
                                            <p className="py-2 flex justify-between"><span className="font-medium">Expected Partner Weight :</span> {singleBiodata?.expectedPartnerWeight}</p>

                                            <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">Contact Info</h1>


                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Name :</span> {singleBiodata?.name}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Mobile :</span> {singleBiodata?.mobile}</p>
                                            <p className="py-2 flex justify-between border-b"><span className="font-medium">Email :</span> {singleBiodata?.email}</p>


                                            {
                                                selfUser?.isPro === 'Pending' && selfBiodata?.isPro === 'Pending' ?
                                                    <>
                                                        <button className="py-2 px-3 text-base mt-10 rounded bg-gray-400 text-white">Premium request pending</button>
                                                    </> :
                                                    <>
                                                        {
                                                            selfUser?.isPro === 'Premium' && selfBiodata?.isPro === 'Premium' ?
                                                                <>
                                                                    <button className="py-2 px-3 text-base mt-10 rounded bg-sky-500 text-white">Your biodata is premium</button>
                                                                </> :
                                                                <>
                                                                    <button onClick={handleRequestForPro} className="py-2 px-3 text-base mt-10 rounded bg-primary-normal text-white">Make Your Biodata premium</button>
                                                                </>
                                                        }
                                                    </>
                                            }



                                        </div>
                                    </> :
                                    <>
                                        <div className="flex justify-center items-center h-96">
                                            <div>
                                                <h1 className="text-2xl text-center">No data found !</h1>
                                                <p className="text-center">Please add your biodata</p>
                                            </div>
                                        </div>
                                    </>
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default ViewBiodata;