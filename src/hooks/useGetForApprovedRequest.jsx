import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetForApprovedRequest = () => {
    const axiosSecure = useAxiosSecure();

    const { data: usersForApprovedRequest = [], refetch: refetchUsersForApprovedRequest, isPending: isLoadingUsersForApprovedRequest } = useQuery({
        queryKey: ['usersForApprovedRequest'],
        queryFn: async () => {
            const res = await axiosSecure('/admin/get-for-approved-request');
            return res.data;
        }
    })

    return { usersForApprovedRequest, refetchUsersForApprovedRequest, isLoadingUsersForApprovedRequest };

};

export default useGetForApprovedRequest;