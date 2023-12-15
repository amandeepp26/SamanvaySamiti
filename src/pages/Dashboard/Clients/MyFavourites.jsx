import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoaderIcon from "../../Utils/LoaderIcon";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyFavourites = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth();

    const { data: favoritesItems = [], refetch, isPending } = useQuery({
        queryKey: ['favoritesItems'],
        queryFn: async () => {
            const res = await axiosSecure(`/favorites/${user.email}`);
            return res.data;
        }
           
    })

    const handleDeleteFavorite = itemId => {
        axiosSecure.delete(`/favorites/${itemId}`)
            .then(response => {
                if (response.data.deletedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `One favorites removed`,
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

    return (
        <div>
            <div>
                <h1 className="text-2xl text-left py-5 flex gap-2 items-center">
                    My Favorites {isPending ? <div className="w-5 h-5 mt-1"><LoaderIcon /></div> : favoritesItems?.length}
                </h1>

                <div className="relative overflow-x-auto border sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-100 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Permanent address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Occupation
                                </th>
                                <th scope="col" className="px-6 py-3">

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
                                            favoritesItems <= 0 ?
                                                <>
                                                    <tr>
                                                        <td className="h-20 w-full flex items-center justify-center">
                                                            <h2 className="text-2xl text-center">No Data Found !</h2>
                                                        </td>
                                                    </tr>
                                                </> :
                                                <>
                                                {
                                                    favoritesItems.map(item => <tr key={item._id} className="bg-white hover:bg-gray-50 border-b ">
                                                        <td className="px-6 py-4 font-medium text-gray-900" >{item?.name}</td>
                                                        <td className="px-6 py-4">#0{item?.biodataId}</td>
                                                        <td className="px-6 py-4">{item?.permanentDivision}</td>
                                                        <td className="px-6 py-4">{item?.occupation}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button onClick={() => handleDeleteFavorite(item._id)} className="font-medium text-primary-normal text-lg" ><MdDelete /></button>
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
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Permanent address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Occupation
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>


            </div>

        </div>
    );
};

export default MyFavourites;