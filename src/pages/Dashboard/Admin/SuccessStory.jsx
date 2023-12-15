import LoaderIcon from "../../Utils/LoaderIcon";
import Swal from "sweetalert2";
import useStories from "../../../hooks/useStories";

const SuccessStory = () => {

    const { stories, isStoriesLoading } = useStories()

    return (
        <div>
            <div>
                <h1 className="text-2xl text-left py-5 flex gap-2 items-center">
                    Total Success Stories {isStoriesLoading ? <div className="w-5 h-5 mt-1"><LoaderIcon /></div> : stories?.length}
                </h1>

                <div className="relative overflow-x-auto border sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-100 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Self Biodata Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Partner Biodata Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    View Story
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                isStoriesLoading ?
                                    <>
                                        <tr>
                                            <td className="h-20 w-full flex items-center justify-center">
                                                <LoaderIcon />
                                            </td>
                                        </tr>
                                    </> :
                                    <>
                                        {
                                            stories <= 0 ?
                                                <>
                                                    <tr>
                                                        <td className="h-20 w-full flex items-center justify-center">
                                                            <h2 className="text-2xl text-center">No Data Found !</h2>
                                                        </td>
                                                    </tr>
                                                </> :
                                                <>
                                                    {
                                                        stories.map(item => <tr key={item._id} className="bg-white hover:bg-gray-50 border-b ">
                                                            <td className="px-6 py-4">#0{item?.selfId}</td>
                                                            <td className="px-6 py-4">#0{item?.partnerId}</td>
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    className="font-medium text-primary-normal text-lg"
                                                                    onClick={()=>{
                                                                        Swal.fire({
                                                                            title: `<p class="text-base font-normal">${item?.review }</p>`,
                                                                            showCloseButton: true,
                                                                            allowOutsideClick:false,
                                                                            showConfirmButton:false
                                                                        });
                                                                    }}
                                                                >
                                                                    View Story
                                                                </button>
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
                                    Self Biodata Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Partner Biodata Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    View Story
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>


            </div>

        </div>
    );
};

export default SuccessStory;
