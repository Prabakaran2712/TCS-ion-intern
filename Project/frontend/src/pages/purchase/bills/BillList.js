import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
const BillsList = () => {
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  useEffect(() => {
    const fetchBills = () => {
      axios
        .get("http://localhost:4500/api/purchases/bills")
        .then((response) => {
          setBills(response.data);
          setLoading(false);
        });
    };
    fetchBills();
  }, []);

  if (loading) {
    return <div>Loading bills...</div>;
  }
  return (
    <div>
      <Title name="Bill"></Title>
      <Header to={"/purchases/bills/add"}></Header>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order. no.</th>
            <th scope="col">Date</th>
            <th scope="col">Vendor</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills &&
            bills.map((bill, idx) => {
              return (
                <tr key={bill._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/purchases/bills/${bill._id}`}>
                      {bill.orderNo}
                    </Link>
                  </td>
                  <td>{format(new Date(bill.date), "dd MMM yyyy")}</td>
                  <td>{bill.vendor.vendorName}</td>
                  <td>{bill.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default BillsList;
