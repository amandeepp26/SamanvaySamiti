import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useStories = () => {
    const axiosPublic = useAxiosPublic();

    const { data: stories = [], isPending: isStoriesLoading } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const response = await axiosPublic(`/get-success-stories`);
            return response.data;
        }
    })

    return {stories, isStoriesLoading}
    
};

export default useStories;