/* eslint-disable no-useless-escape */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../Utils/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoaderIcon from "../Utils/LoaderIcon";

const Register = () => {
    const { registerUser, userUpdateOnSignUp, setUser } = useAuth();

    const [submitBtnLoader, setSubmitBtnLoader] = useState(false);
    const [showPass, setShowPass] = useState(true);

    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {

        setSubmitBtnLoader(true);

        registerUser(data.email, data.password)
            .then((succData) => {

                const user = succData.user;
                user

                userUpdateOnSignUp({ displayName: data.name, photoURL: data.photo_url, email: data.email })
                    .then(() => {
                        setUser({ displayName: data.name, photoURL: data.photo_url, email: data.email });

                        //store user to database
                        const userInfo = { name: data.name, email: data.email }
                        axiosPublic.post('/store-users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {

                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Registration Success",
                                        showConfirmButton: false,
                                        timer: 3000
                                    });
                                    // console.log('User stored into database', res.data);
                                    reset()
                                    navigate('/');
                                    setSubmitBtnLoader(false);

                                }

                            }).catch((error) => {
                                console.log('store user error:', error)
                            })
                        //store user to database end

                        // console.log('profile data set')
                        setSubmitBtnLoader(false);

                    }).catch((error) => {

                        console.log('profile data not set', error);
                        setSubmitBtnLoader(false);

                    });

                // console.log('SignUp User created', user)
                setSubmitBtnLoader(false);

            })
            .catch((errorData) => {
                const error = errorData.message;

                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Email already in use",
                    showConfirmButton: false,
                    timer: 3000
                });

                console.log('SignUp error', error)
                setSubmitBtnLoader(false);
            });

    }



    return (
        <div className="px-5 py-10 lg:py-20 flex justify-center items-center">
            <div className="flex-1 max-w-md bg-white rounded-lg shadow">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-lg pb-2 font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)} >
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your name
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Your name"
                            />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <label
                                htmlFor="photo_url"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Profile Photo URL
                            </label>
                            <input
                                type="url"
                                {...register("photo_url", { required: true })}
                                name="photo_url"
                                id="photo_url"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Profile picture URL"
                            />
                            {errors.photo_url && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'password' : 'text'}
                                    {...register("password", {
                                        required: true,
                                        maxLength: 20,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\])/
                                    })}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                <span onClick={() => setShowPass(!showPass)} className="cursor-pointer p-1 absolute top-[10px] right-[10px]">
                                    {showPass ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must be less than 20 characters!</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be more than 6 characters!</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-500">Password must be at least one capital letter & one special character!</span>}
                        </div>

                        <div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        {...register("terms", { required: true })}
                                        name="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="cursor-pointer font-light text-black"
                                    >
                                        <span className="font-medium text-gray-500">I accept the </span>
                                        <a
                                            className="font-semibold text-gray-500 hover:underline"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            {errors.terms && <span className="text-red-500">Please Accept Term And Conditions</span>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                value="Create an account"
                                type="submit"
                                className={`bg-primary-normal text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5`}
                            />
                            {submitBtnLoader && <LoaderIcon />}
                        </div>

                        <p className="text-sm font-light text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to={'/login'}
                                className="font-medium text-primary-600 hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                    <SocialLogin />
                </div>
            </div>

        </div>
    );
};

export default Register;