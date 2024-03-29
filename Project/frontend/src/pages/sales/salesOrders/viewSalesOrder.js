import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
const ViewSalesOrderList = () => {
  const [loading, setLoading] = useState(true);
  const [salesOrders, setSalesOrders] = useState([]);
  const [days, setDays] = useState(30);
  const [items, setItems] = useState(null);
  const [curItem, setCurItem] = useState("*");
  const showFrom = subDays(new Date(), days);
  useEffect(() => {
    const fetchSalesOrders = () => {
      axios
        .get("http://localhost:4500/api/sales/salesorders")
        .then((response) => {
          setSalesOrders(response.data);
          axios
            .get("http://localhost:4500/api/inventory/items")
            .then((response) => {
              setItems(response.data);
              setLoading(false);
            });
        });
    };
    fetchSalesOrders();
  }, []);

  if (loading) {
    return <div>Loading adjustments...</div>;
  }
  return (
    <div>
      <Title name="Sales Orders"></Title>
      <Header to={"/addsalesorder"}></Header>
      <div className="row  mb-3">
        <div className="col-lg-8">
          <label className="form-label">Filter based on period</label>
          <select
            className="form-select w-25"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            <option value="365">Last year</option>
            <option value="30">Last 30 days</option>
            <option value="7">Last week</option>
            <option value="1">Today</option>
          </select>
        </div>
        <div className="col-lg-4">
          Filter based on item
          <select
            className="form-select w-25"
            value={curItem}
            onChange={(e) => setCurItem(e.target.value)}
          >
            <option value="*">All</option>
            {items &&
              items.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ref. no.</th>
            <th scope="col">Order Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Status</th>
            <th scope="col">Expected Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders &&
            salesOrders.map((salesOrder, idx) => {
              if (
                new Date(salesOrder.orderDate) >= showFrom &&
                (curItem === "*" ||
                  salesOrder.items.filter((item) => item.name === curItem)
                    .length > 0)
              ) {
                return (
                  <tr key={salesOrder._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <Link to={`/salesorderdetails/${salesOrder._id}`}>
                        {salesOrder.refNo}
                      </Link>
                    </td>
                    <td>
                      {format(new Date(salesOrder.orderDate), "dd MMM yyyy")}
                    </td>
                    <td>{salesOrder.customer.customerName}</td>
                    <td>{salesOrder.orderStatus}</td>
                    <td>
                      {format(
                        new Date(salesOrder.expectedDeliveryDate),
                        "dd MMM yyyy"
                      )}
                    </td>
                  </tr>
                );
              }
              return <tr key={idx}></tr>;
            })}
        </tbody>
      </table>
    </div>
  );
};
export default ViewSalesOrderList;
