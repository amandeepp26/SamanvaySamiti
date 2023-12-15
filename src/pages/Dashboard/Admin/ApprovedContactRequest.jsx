import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderIcon from "../../Utils/LoaderIcon";
import useGetForApprovedRequest from "../../../hooks/useGetForApprovedRequest";

const ApprovedContactRequest = () => {

    const { usersForApprovedRequest, refetchUsersForApprovedRequest, isLoadingUsersForApprovedRequest } = useGetForApprovedRequest();

    const axiosSecure = useAxiosSecure();

    const handleApprovedRequest = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Approved this request",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.put(`/admin/approved-contact-request/${id}`)
                    .then(res => {

                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Approved`,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }
                        refetchUsersForApprovedRequest();

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
                        refetchUsersForApprovedRequest();
                    })
            }
        });

    }


    return (
        <div>
            <div>
                <h1 className="text-2xl text-left py-5 flex gap-2 items-center">
                    Total Contact Request {isLoadingUsersForApprovedRequest ? <div className="w-5 h-5 mt-1"><LoaderIcon /></div> : usersForApprovedRequest?.length}
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
                                    Requester Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Requested for Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    Make Premium
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                isLoadingUsersForApprovedRequest ?
                                    <>
                                        <tr>
                                            <td className="h-20 w-full flex items-center justify-center">
                                                <LoaderIcon />
                                            </td>
                                        </tr>
                                    </> :
                                    <>
                                        {
                                            usersForApprovedRequest <= 0 ?
                                                <>
                                                    <tr>
                                                        <td className="h-20 w-full flex items-center justify-center">
                                                            <h2 className="text-2xl text-center">No Data Found !</h2>
                                                        </td>
                                                    </tr>
                                                </> :
                                                <>
                                                    {
                                                        usersForApprovedRequest.map(item => <tr key={item._id} className="bg-white hover:bg-gray-50 border-b ">
                                                            <td className="px-6 py-4 font-medium text-gray-900" >{item?.name}</td>
                                                            <td className="px-6 py-4">{item?.email}</td>
                                                            <td className="px-6 py-4">#0{item?.requesterBiodataId}</td>
                                                            <td className="px-6 py-4">#0{item?.biodataId}</td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button onClick={() => handleApprovedRequest(item?._id)} className="font-medium text-primary-normal text-lg" > Approved Request </button>
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
                                    Requester Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Requested for Id
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

export default ApprovedContactRequest;