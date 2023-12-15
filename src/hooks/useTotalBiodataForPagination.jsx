import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTotalBiodataForPagination = () => {

    const axiosPublic = useAxiosPublic();

    const { data: totalBiodataForPagination = {} } = useQuery({
        queryKey: ['totalBiodataForPagination'],
        queryFn: async () => {
            const res = await axiosPublic(`/totalbiodataforpagination`);
            return res.data;
        }
    })

    return totalBiodataForPagination;
};

export default useTotalBiodataForPagination;
