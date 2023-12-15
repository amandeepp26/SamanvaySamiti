import { useContext } from "react";
import { AllContext } from "../Provider/AuthProvider";


const useAuth = () => {

    const auth = useContext(AllContext);
    return auth;
    
};

export default useAuth;