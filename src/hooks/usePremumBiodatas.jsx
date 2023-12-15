import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePremumBiodatas = () => {
    
    const axiosPublic = useAxiosPublic();

    const { data: premiumBiodata = [], isPending: isLoadingPremiumBiodata } = useQuery({
        queryKey: ['premiumBiodata'],
        queryFn: async () => {
            const res = await axiosPublic(`/biodatas?premium=Premium`);
            return res.data;
        }
    })

    const filterData = premiumBiodata.slice(0, 6);

    return [filterData, isLoadingPremiumBiodata];
};

export default usePremumBiodatas;

