import "./css/Table.css";
const table = (props) => {
  return (
    <div className="item-table">
      <table className="mx-auto">
        <tr>
          <td>Mode</td>
          <td>Reference Number</td>
          <td>Date</td>
          <td>Reason</td>
          <td>Description</td>
        </tr>
        {props.items &&
          props.items.map((item) => {
            return (
              <tr>
                <td key={item._id}>{item.mode}</td>
                <td key={item._id}>{item.refno}</td>
                <td key={item._id}>{item.date}</td>
                <td key={item._id}>{item.Reason}</td>
                <td key={item._id}>{item.description}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};
export default table;
