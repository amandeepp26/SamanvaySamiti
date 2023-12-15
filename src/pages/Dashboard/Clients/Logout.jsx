import useAuth from "../../../hooks/useAuth";

const Logout = () => {

    const { user, userlogOut } = useAuth();

    const handleLogOut = () => {
        userlogOut()
            .then(() => {
                console.log(' Sign-out successful ')
                
            }).catch(() => {
                console.log('Logout : An error happened')
            });
    }


    return (
        <div className="flex flex-col gap-y-2 h-96 justify-center items-center">
            <img
                className="w-20 h-20 mb-3 rounded-full shadow-lg"
                src={user?.photoURL || 'https://i.ibb.co/k2mWfq6/placeholder.jpg'}
                alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                {user?.displayName || "name not found"}
            </h5>

            <span className="text-sm text-gray-500 ">
                {user?.email || "Email not found"}
            </span>

            <button
                onClick={handleLogOut}
                className="px-4 rounded-md mt-5 py-2 text-sm font-medium bg-primary-normal text-white"
            >
                Log out
            </button>
        </div>
    );
};

export default Logout;