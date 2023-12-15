import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleBiodataById = (biodataId) => {

    const axiosSecure = useAxiosSecure()

    const { data: singleBiodata = {}, refetch: refetchSingleBiodata, isPending: isSingleBiodataLoading } = useQuery({
        queryKey: ['singleBiodata', biodataId],
        queryFn: async () => {
            const response = await axiosSecure(`/biodata/${biodataId}`);
            return response.data;
        }
    })

    return [singleBiodata, refetchSingleBiodata, isSingleBiodataLoading]
};

export default useSingleBiodataById;