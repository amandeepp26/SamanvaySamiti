import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../config/AuthConfig";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AllContext = createContext()

const Authprovider = ({ children }) => {

    const axiosPublic = useAxiosPublic();

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);




    const googleSignInWithPopup = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userUpdateOnSignUp = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }
    const userLogIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const userlogOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)


            const userEmail = currentUser?.email || user?.email;
            // set a userKey for this user 
            if (currentUser) {
                axiosPublic.post('/jwt', { email: userEmail })
                    .then(res => {
                        console.log('userKey set : ', res.data.success)
                    }).catch((err) => {
                        console.log('UserKey create error', err);
                    })

            }
            // set a userKey for this user end

            //remove userKey if user logout
            else {
                axiosPublic.post('/logout', { email: userEmail }, { withCredentials: true })
                    .then(res => {
                        console.log('userKey removed', res.data.success)
                    })
            }
            //remove userKey if user logout end


        });


        return () => {
            unSubscribe()
        }

    }, [axiosPublic, user?.email])


    const allInfo = {
        user,
        setUser,
        loading,
        googleSignInWithPopup,
        registerUser,
        userLogIn,
        userlogOut,
        userUpdateOnSignUp
    }
    // console.log('user in the authState:', user);
    return (
        <>
            <AllContext.Provider value={allInfo}>
                {children}
            </AllContext.Provider>
        </>
    );
};

export default Authprovider;

Authprovider.propTypes = {
    children: PropTypes.node
};
