import "./Table.css";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const table = (props) => {
  return (
    <div className="item-table ">
      <table className="mx-auto">
        <tr>
          <td>Name</td>
          <td>Company</td>
          <td>Mobile</td>
          <td>Email</td>
          <td></td>
        </tr>
        {console.log(props.items)}
        {props.items &&
          props.items.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.customerName}</td>
                <td>{item.company}</td>
                <td>{item.mobile}</td>
                <td>{item.email}</td>

                <Link to={`/customeredit/${item._id}`}>
                  <td>
                    <FaPencilAlt />
                  </td>
                </Link>
              </tr>
            );
          })}
      </table>
    </div>
  );
};
export default table;
