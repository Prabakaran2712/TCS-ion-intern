import { Link } from "react-router-dom";
import "./css/Sidebar.css";
const sidebar = (props) => {
  return (
    <div className="nav-bar accordion overflow-auto">
      <div className="nav-element text-center ">
        <Link to="/reports">
          <p className="display-6">Dashboard</p>
        </Link>
      </div>
      {props.details &&
        props.details.map((x) => {
          return (
            <div className="nav-element accordian-item" key={x.id}>
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#".concat(x.name)}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {x.name}
                </button>
              </h2>
              <div
                id={x.name}
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul className="border p-3 ">
                    {x.data &&
                      x.data.map((y) => {
                        return (
                          <li className="mb-1 w-100 ">
                            <Link to={y.link} key={y.id} className="p-2">
                              {y.name.toUpperCase()}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default sidebar;
