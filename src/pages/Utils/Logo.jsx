import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import PropTypes from "prop-types";

const Logo = ({ width }) => {
  return (
    <Link to={"/"}>
      <img style={{ width: "90px", height: "80px" }} src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;

Logo.propTypes = {
  width: PropTypes.string,
};
