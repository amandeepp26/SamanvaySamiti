import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetForApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();

    const { data: usersForApprovedPremium = [], refetch: refetchUsersForApprovedPremium, isPending: isLoadingUsersForApprovedPremium } = useQuery({
        queryKey: ['usersForApprovedPremium'],
        queryFn: async () => {
            const res = await axiosSecure('/users/get-for-approved-premium');
            return res.data;
        }
    })

    return { usersForApprovedPremium, refetchUsersForApprovedPremium, isLoadingUsersForApprovedPremium };
    
};

export default useGetForApprovedPremium;