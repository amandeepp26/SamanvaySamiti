import PropTypes from 'prop-types';

const SectionTitle = ({ colorTitle, blackTitle, subTitle }) => {
    return (
        <div className="py-16 mt-10 max-w-2xl mx-auto">
            <h2 className="py-2 text-3xl md:text-4xl text-center font-semibold"> <span className="text-primary-normal">{colorTitle}</span> {blackTitle} </h2>
            <p className="py-2 text-lg md:text-xl text-center">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;

SectionTitle.propTypes = {
    colorTitle: PropTypes.string,
    blackTitle: PropTypes.string,
    subTitle: PropTypes.string
};


