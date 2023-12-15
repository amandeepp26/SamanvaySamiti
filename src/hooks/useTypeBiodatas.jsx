import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTypeBiodatas = (biodataType) => {


    const axiosPublic = useAxiosPublic();

    const { data: typeBiodatas = [], refetch: refetchTypeBiodatas, isPending: isTypeBiodataLoading } = useQuery({
        queryKey: ['biodataType', biodataType],
        queryFn: async () => {
            const response = await axiosPublic(`/biodatas?biodatatype=${biodataType}`);
            return response.data;
        }
    })

    return [typeBiodatas, refetchTypeBiodatas, isTypeBiodataLoading]
};

export default useTypeBiodatas;