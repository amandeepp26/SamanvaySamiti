import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminStatistic = () => {

    const axiosSecure = useAxiosSecure();

    const { data: adminStatistic = {}, isPending: isLoadingAdminStatistic } = useQuery({
        queryKey: ['adminStatistic'],
        queryFn: async () => {
            const res = await axiosSecure(`/admin/dashboard-statistic`);
            return res.data;
        }
    })

    return { adminStatistic, isLoadingAdminStatistic }
};

export default useAdminStatistic;


