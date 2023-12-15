import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import LoaderIcon from '../pages/Utils/LoaderIcon';
import useSelfUser from '../hooks/useSelfUser';

const AdminRoutes = ({ children }) => {
    const { selfUser, isLoadingSelfUser } = useSelfUser();

    if (isLoadingSelfUser) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className='text-center'>
                    <div className='flex justify-center'> <LoaderIcon /> </div>
                    <h1 className='py-9'>Maybe your internet is too slow, please <span onClick={() => window.location.reload()} className='text-red-400 underline cursor-pointer'>reload</span></h1>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                selfUser?.userRole === 'Admin' ? children : <Navigate to={'/'}></Navigate>
            }
        </>
    );
};

export default AdminRoutes;

AdminRoutes.propTypes = {
    children: PropTypes.node
};