import PropTypes from 'prop-types';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const RattingStar = ({ ratingValue }) => {
    return (
        <>
            <Rating
                style={{ maxWidth: 110 }}
                value={ratingValue}
                readOnly
            />
        </>
    );
};

export default RattingStar;

RattingStar.propTypes = {
    ratingValue: PropTypes.string
};

