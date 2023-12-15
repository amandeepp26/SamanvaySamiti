import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSelfBiodata = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: selfBiodata = {}, refetch: refetchSelfBiodata, isPending: isLoadingSelfBiodata} = useQuery({
        queryKey: ['selfBiodata'],
        queryFn: async () => {
            const res = await axiosSecure(`/biodata/own/${user?.email}`)
            return res.data;
        }
    })

    return { selfBiodata, refetchSelfBiodata, isLoadingSelfBiodata }
};

export default useSelfBiodata;

