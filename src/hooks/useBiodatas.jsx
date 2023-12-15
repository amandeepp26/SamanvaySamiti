import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBiodatas = (viewAll, typeValue, divisionValue, minValue, maxValue, currentPage, itemsPerPage) => {

    const axiosPublic = useAxiosPublic();

    const { data: biodatas = [], refetch, isPending: isBiodataLoading, error: isBioDataError } = useQuery({
        queryKey: ['biodatas', viewAll, typeValue, divisionValue, minValue, maxValue, currentPage, itemsPerPage],
        queryFn: async () => {

            if (viewAll) {
                const response = await axiosPublic(`/biodatas?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
                return response.data;
            }

            if (typeValue) {
                const response = await axiosPublic(`/biodatas?biodatatype=${typeValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
                return response.data;
            }

            if (divisionValue) {
                const response = await axiosPublic(`/biodatas?divisionvalue=${divisionValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
                return response.data;
            }

            if (minValue && maxValue) {
                const response = await axiosPublic(`/biodatas?gteValue=${minValue}&lteValue=${maxValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
                return response.data;
            }



            const response = await axiosPublic(`/biodatas?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
            return response.data;
        }
    })

    // console.log(viewAll);
    // console.log(typeValue);
    // console.log(divisionValue);
    // console.log('minValue', minValue);
    // console.log('maxValue', maxValue);

    return [biodatas, refetch, isBiodataLoading, isBioDataError]
};

export default useBiodatas;