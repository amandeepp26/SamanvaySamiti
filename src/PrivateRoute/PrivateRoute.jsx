import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import LoaderIcon from '../pages/Utils/LoaderIcon';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation();

    if (loading) {
        return (
            <>
                <div className="h-screen flex justify-center items-center">
                    <div className='text-center'>
                        <div className='flex justify-center'> <LoaderIcon/> </div>
                        <h1 className='py-9'>Maybe your internet is too slow, please <span onClick={() => window.location.reload()} className='text-red-400 underline cursor-pointer'>reload</span></h1>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {
                user ? children : <Navigate state={location.pathname} to={'/login'}></Navigate>
            }
        </>
    );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
};