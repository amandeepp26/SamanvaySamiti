import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderIcon from "../../Utils/LoaderIcon";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allUsers = [], isPending: isLoadingAllusers, refetch: refetchAllUsers } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure('/users/all')
            return res.data;
        }
    })


    const handleUserRoleUpdate = (userEmail) => {

        Swal.fire({
            title: "Are you sure?",
            text: `You want to make ${userEmail} user admin`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.put(`/users/update-role/${userEmail}`)
                    .then(res => {

                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${userEmail} is now admin`,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }
                        refetchAllUsers();

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
                        refetchAllUsers();
                    })
            }
        });

    }


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

                        if (res.data.resultForUser.modifiedCount > 0 || res.data.resultForBiodata.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Approved`,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }
                        refetchAllUsers();

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
                        refetchAllUsers();
                    })
            }
        });

    }



    return (
        <div>
            <div>
                <h1 className="text-2xl text-left py-5 flex gap-2 items-center">
                    All Users {isLoadingAllusers ? <div className="w-5 h-5 mt-1"><LoaderIcon /></div> : allUsers?.length}
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
                                    Make admin
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Make premium
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                isLoadingAllusers ?
                                    <>
                                        <tr>
                                            <td className="h-20 w-full flex items-center justify-center">
                                                <LoaderIcon />
                                            </td>
                                        </tr>
                                    </> :
                                    <>
                                        {
                                            allUsers <= 0 ?
                                                <>
                                                    <tr>
                                                        <td className="h-20 w-full flex items-center justify-center">
                                                            <h2 className="text-2xl text-center">No Data Found !</h2>
                                                        </td>
                                                    </tr>
                                                </> :
                                                <>
                                                    {
                                                        allUsers.map(item => <tr key={item._id} className="bg-white hover:bg-gray-50 border-b ">
                                                            <td className="px-6 py-4 font-medium text-gray-900" >{item?.name}</td>
                                                            <td className="px-6 py-4">{item?.email}</td>
                                                            <td className="px-6 py-4">
                                                                {
                                                                    item?.userRole ?
                                                                        <>
                                                                            <button className="font-medium text-base text-sky-500" onClick={() => handleUserRoleUpdate(item?.email)}> {item?.userRole} </button>
                                                                        </> :
                                                                        <>
                                                                            <button className="font-medium text-base text-primary-normal" onClick={() => handleUserRoleUpdate(item?.email)}> Make Admin </button>
                                                                        </>
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {
                                                                    item?.isPro ?
                                                                        <>
                                                                            <button className={`font-medium text-base ${item?.isPro === 'Premium' ? 'text-sky-500' : 'text-yellow-500'}`} onClick={() => handleApprovedPremium(item?.email)}> {item?.isPro} </button>
                                                                        </> :
                                                                        <>
                                                                            <button className="font-medium text-base text-primary-normal" onClick={() => handleApprovedPremium(item?.email)}> Make Premium </button>
                                                                        </>
                                                                }

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
                                    Make admin
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Make premium
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>


            </div>

        </div>
    );
};

export default ManageUsers;