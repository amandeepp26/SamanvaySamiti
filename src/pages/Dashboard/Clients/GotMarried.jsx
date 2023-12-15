import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { useForm } from "react-hook-form";

const GotMarried = () => {
    const axiosSecure = useAxiosSecure();

    const [rating, setRating] = useState(4);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {

        const succssStory = {
            selfName: data.selfName,
            partnerName: data.partnerName,
            selfId: data.selfId,
            partnerId: data.partnerId,
            date: data.date,
            coupleImg: data.coupleImg,
            review: data.review,
            rating: rating,
        }

        axiosSecure.post('/post-success-story', succssStory)
            .then(response => {
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Review added successfully`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    reset();
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
        <div className="pb-8 px-4  max-w-[668px] mx-auto">
            <h1 className='text-3xl py-5'>Success Story</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-5">

                    <div className="w-full">
                        <label htmlFor="selfName" className="block mb-2 font-medium"> Self Name*</label>
                        <input
                            type="text" id="selfName"  {...register("selfName")}
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="partnerName" className="block mb-2 font-medium"> Partner Name*</label>
                        <input
                            type="text" id="partnerName"  {...register("partnerName")}
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="selfId" className="block mb-2 font-medium"> Self Biodata ID*</label>
                        <input
                            type="text" id="selfId"  {...register("selfId")}
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="partnerId" className="block mb-2 font-medium"> Partner Biodata ID*</label>
                        <input
                            type="text" id="partnerId"  {...register("partnerId")}
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="date" className="block mb-2 font-medium"> Marriage date*</label>
                        <input
                            type="date" id="date"  {...register("date")}
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="coupleImg" className="block mb-2 font-medium"> Couple Image URL*</label>
                        <input
                            type="url" id="coupleImg"  {...register("coupleImg")}
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="review" className="block mb-2 font-medium"> Success Story Review*</label>
                        <textarea
                            type="text" id="review"  {...register("review")}
                            className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                            rows="5"
                        />
                    </div>

                    <div className="w-full">
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={rating}
                            onChange={setRating}
                            isRequired
                        />
                    </div>

                </div>

                <div className="flex items-center gap-2 mt-10">
                    <input
                        value="Submit"
                        type="submit"
                        className={`bg-primary-normal text-white cursor-pointer font-medium rounded-md text-sm px-5 py-2.5`}
                    />
                </div>

            </form>
        </div>
    );
};

export default GotMarried;