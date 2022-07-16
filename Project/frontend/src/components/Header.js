import { Link } from "react-router-dom";
import "./css/Header.css";
const Header = (props) => {
  return (
    <div className="header">
      <button className="header-content">
        <Link to={props.to}>+</Link>
      </button>
      <button className="header-content">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};
export default Header;
