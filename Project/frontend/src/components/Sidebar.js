import { Link } from "react-router-dom";
import "./css/Sidebar.css";
const sidebar = (props) => {
  return (
    <div className="nav-bar">
      {props.details &&
        props.details.map((x) => {
          return (
            <div className="nav-element" key={x.id}>
              <Link to={x.link}>{x.name}</Link>
            </div>
          );
        })}
    </div>
  );
};
export default sidebar;
