import "./css/Table.css";
const table = (props) => {
  return (
    <div className="item-table">
      <table style={{ width: "100%" }}>
        <tr>
          <td className="name">Name</td>
          <td className="desc">Description</td>
        </tr>
        {props.items &&
          props.items.map((item) => {
            return (
              <tr>
                <td key={item._id} className="name">
                  {item.name}
                </td>
                <td key={item._id} className="desc">
                  {item.description}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};
export default table;
