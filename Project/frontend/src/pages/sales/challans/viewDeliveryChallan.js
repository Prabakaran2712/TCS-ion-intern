import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
const DeliveryChallansList = () => {
  const [loading, setLoading] = useState(true);
  const [challans, setChallans] = useState([]);
  useEffect(() => {
    const fetchChallans = () => {
      axios
        .get("http://localhost:4500/api/sales/delivery-challans")
        .then((response) => {
          setChallans(response.data);
          setLoading(false);
        });
    };
    fetchChallans();
  }, []);

  if (loading) {
    return <div>Loading delivery challans...</div>;
  }
  return (
    <div>
      <Title name="Delivery Challan"></Title>
      <Header to={"/addchallan"}></Header>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ref. no.</th>
            <th scope="col">Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {challans &&
            challans.map((challan, idx) => {
              return (
                <tr key={challan._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/viewchallandetail/${challan._id}`}>
                      {challan.refNo}
                    </Link>
                  </td>
                  <td>
                    {format(
                      new Date(challan.deliveryChallanDate),
                      "dd MMM yyyy"
                    )}
                  </td>
                  <td>{challan.customer.customerName}</td>
                  <td>{challan.deliveryChallanType}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default DeliveryChallansList;
