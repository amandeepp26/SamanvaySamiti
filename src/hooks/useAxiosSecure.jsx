import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://biyebari-server.vercel.app',
    withCredentials: true
})

// https://biyebari-server.vercel.app
// http://localhost:5000


const useAxiosSecure = () => {



    return axiosSecure;
};

export default useAxiosSecure;