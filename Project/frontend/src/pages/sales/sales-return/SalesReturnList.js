import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
const SalesReturnsList = () => {
  const [loading, setLoading] = useState(true);
  const [salesReturns, setSalesReturns] = useState({});
  useEffect(() => {
    axios.get("http://localhost:4500/api/sales/sales-returns").then((res) => {
      setSalesReturns(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Title name="Sales Returns"></Title>
      <Header to={"/addsalesreturn"}></Header>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sales Order ref. no.</th>
            <th scope="col">Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {salesReturns &&
            salesReturns.map((salesReturn, idx) => {
              return (
                <tr key={salesReturn._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/salesreturndetail/${salesReturn._id}`}>
                      {salesReturn.salesOrder.refNo}
                    </Link>
                  </td>
                  <td>{format(new Date(salesReturn.date), "dd MMM yyyy")}</td>
                  <td>{salesReturn.salesOrder.customer.customerName}</td>
                  <td>{salesReturn.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default SalesReturnsList;
