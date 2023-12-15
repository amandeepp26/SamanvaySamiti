import useGetForApprovedPremium from "../../../hooks/useGetForApprovedPremium";
import LoaderIcon from "../../Utils/LoaderIcon";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApprovedPremium = () => {
    const { usersForApprovedPremium, refetchUsersForApprovedPremium, isLoadingUsersForApprovedPremium } = useGetForApprovedPremium();

    const axiosSecure = useAxiosSecure();

    const handleApprovedPremium = (userEmail) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this biodata premium",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.put(`/approved/user/to-premium/${userEmail}`)
                    .then(res => {

                        if (res.data.resultForUser.modifiedCount > 0 && res.data.resultForBiodata.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Approved`,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }
                        refetchUsersForApprovedPremium();

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
                        refetchUsersForApprovedPremium();
                    })
            }
        });

    }



    return (
        <div>
            <div>
                <h1 className="text-2xl text-left py-5 flex gap-2 items-center">
                    Total Premium Request {isLoadingUsersForApprovedPremium ? <div className="w-5 h-5 mt-1"><LoaderIcon /></div> : usersForApprovedPremium?.length}
                </h1>

                <div className="relative overflow-x-auto border sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-100 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Biodata Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    Make Premium
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                isLoadingUsersForApprovedPremium ?
                                    <>
                                        <tr>
                                            <td className="h-20 w-full flex items-center justify-center">
                                                <LoaderIcon />
                                            </td>
                                        </tr>
                                    </> :
                                    <>
                                        {
                                            usersForApprovedPremium <= 0 ?
                                                <>
                                                    <tr>
                                                        <td className="h-20 w-full flex items-center justify-center">
                                                            <h2 className="text-2xl text-center">No Data Found !</h2>
                                                        </td>
                                                    </tr>
                                                </> :
                                                <>
                                                    {
                                                        usersForApprovedPremium.map(item => <tr key={item._id} className="bg-white hover:bg-gray-50 border-b ">
                                                            <td className="px-6 py-4 font-medium text-gray-900" >{item?.name}</td>
                                                            <td className="px-6 py-4">{item?.email}</td>
                                                            <td className="px-6 py-4">#0{item?.biodataId}</td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button onClick={() => handleApprovedPremium(item?.email)} className="font-medium text-primary-normal text-lg" > Make Premium </button>
                                                            </td>
                                                        </tr>)
                                                    }
                                                </>
                                        }
                                    </>
                            }

                        </tbody>

                        <tfoot className="text-sm text-gray-700 uppercase bg-gray-100 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Biodata Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    Make Premium
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>


            </div>

        </div>
    );
};

export default ApprovedPremium;