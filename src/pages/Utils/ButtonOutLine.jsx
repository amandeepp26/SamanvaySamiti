import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonOutLine = ({ link, text }) => {
    return (
        <>
            <Link to={link && link}>
                <button className='my-3 py-2 px-4 border-2 border-white hover:border-primary-normal hover:bg-primary-normal text-white rounded-md text-sm'>{text && text}</button>
            </Link>
        </>
    );
};

export default ButtonOutLine;

ButtonOutLine.propTypes = {
    link: PropTypes.string,
    text: PropTypes.string
};

