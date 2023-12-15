import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useStoreFavorite = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleStoreFavorite = (item) => {

        const { _id, ...itemWithoutId } = item;
        const newItem = {...itemWithoutId, favMakerEmail: user?.email, biodataItemId: _id,};
        
        axiosSecure.post('/favorites', newItem)

            .then(response => {
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Biodata added to favorite list`,
                        showConfirmButton: false,
                        timer: 3000
                    });

                    // setLoadingIcon(false);
                }

                const insertedId = response.data.insertedId;
                return insertedId;

            }).catch((error) => {
                if (error.message) {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: error.message,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }

                const errorMessage = error.message;
                return errorMessage;

                // setLoadingIcon(false);
            })

    }

    return handleStoreFavorite;

   
};

export default useStoreFavorite;