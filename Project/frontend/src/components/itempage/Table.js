import "./css/Table.css";
const table = (props) => {
  return (
    <div className="item-table">
      <table>
        <tr>
          <td>Name</td>
          <td>Unit</td>
          <td>Dimensions</td>
          <td>Weight</td>
          <td>CostPrice</td>
          <td>SellingPrice</td>
          <td>Description</td>
          <td>Opening Stock</td>
          <td>Reorder Point</td>
          <td>Preferred Vendor</td>
        </tr>
        {props.items &&
          props.items.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>{item.dimensions}</td>
                <td>{item.weight}</td>
                <td>{item.costPrice}</td>
                <td>{item.sellingPrice}</td>
                <td>{item.description}</td>
                <td>{item.openingStock}</td>
                <td>{item.reorderPoint}</td>
                <td>{item.preferredVendor}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};
export default table;
