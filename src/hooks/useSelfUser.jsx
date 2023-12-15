import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSelfUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: selfUser = {}, refetch: refetchSelfUser, isPending: isLoadingSelfUser } = useQuery({
        queryKey: ['selfUser'],
        queryFn: async () => {
            const res = await axiosSecure(`/user/self/${user?.email}`)
            return res.data;
        }
    })

    return { selfUser, refetchSelfUser, isLoadingSelfUser }
};

export default useSelfUser;



