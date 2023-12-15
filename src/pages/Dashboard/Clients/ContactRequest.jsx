import LoaderIcon from "../../Utils/LoaderIcon";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ContactRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();

    const { data: requestItems = [], refetch, isPending } = useQuery({
        queryKey: ['requestItems'],
        queryFn: async () => {
            const res = await axiosSecure(`/users/get-contact-request/${user.email}`);
            return res.data;
        }

    })

    const handleDeleteRequest = itemId => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this request",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes Please"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/delete-contact-request/${itemId}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `One Request Removed`,
                                showConfirmButton: false,
                                timer: 3000
                            });
                            refetch();
                        }

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
                    })
            }
        });

    }


    return (
        <div>
            <div>
                <h1 className="text-2xl text-left py-5 flex gap-2 items-center">
                    My Contact Requests {isPending ? <div className="w-5 h-5 mt-1"><LoaderIcon /></div> : requestItems?.length}
                </h1>

                <div className="relative overflow-x-auto border sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-100 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mobile No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cancel
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                isPending ?
                                    <>
                                        <tr>
                                            <td className="h-20 w-full flex items-center justify-center">
                                                <LoaderIcon />
                                            </td>
                                        </tr>
                                    </> :
                                    <>
                                        {
                                            requestItems <= 0 ?
                                                <>
                                                    <tr>
                                                        <td className="h-20 w-full flex items-center justify-center">
                                                            <h2 className="text-2xl text-center">No Data Found !</h2>
                                                        </td>
                                                    </tr>
                                                </> :
                                                <>
                                                    {
                                                        requestItems.map(item => <tr key={item._id} className="bg-white hover:bg-gray-50 border-b ">
                                                            <td className="px-6 py-4 font-medium text-gray-900" >{item?.name}</td>
                                                            <td className="px-6 py-4">#0{item?.biodataId}</td>
                                                            <td className={`px-6 py-4 ${item?.request === 'Approved' ? 'text-green-500' : 'text-orange-600'}`}>
                                                                {item?.request}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item?.request === 'Approved' ? item?.mobile : 'Waiting for approval'}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item?.request === 'Approved' ? item?.email : 'Waiting for approval'}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {
                                                                    item?.request === 'Approved' ?
                                                                        <button className="font-medium text-gray-300 text-lg" >Cancel</button> :
                                                                        <button onClick={() => handleDeleteRequest(item._id)} className="font-medium text-primary-normal text-lg" >Cancel</button>
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
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mobile No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cancel
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>


            </div>

        </div>
    );
};

export default ContactRequest;