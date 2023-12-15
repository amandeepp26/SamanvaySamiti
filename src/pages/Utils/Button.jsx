import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ link, text }) => {
    return (
        <>
            <Link to={link && link}>
                <button className='bg-primary-normal hover:bg-primary-hover py-2 px-5 text-white rounded-lg text-base font-medium'>
                    {text && text}
                </button>
            </Link>
        </>
    );
};

export default Button;

Button.propTypes = {
    link: PropTypes.string,
    text: PropTypes.string
};

