import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
const VendorCreditDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [credit, setCredit] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:4500/api/purchases/vendor-credits/${id}`)
      .then((response) => {
        setCredit(response.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading details...</div>;
  }

  return (
    <div className="container">
      <h1 className="display-6">Vendor Credit Details</h1>

      <div className="my-2">
        <span className="h4 me-4">Credit Node Number:</span>
        <span>{credit.creditNoteNo}</span>
      </div>

      <div className="my-2">
        <span className="h4 me-4"> Date:</span>
        <span>{format(new Date(credit.date), "dd MMM yyyy")}</span>
      </div>

      <div className="my-2">
        <span className="h4 me-4">Vendor Name:</span>
        <span>{credit.vendor.vendorName}</span>
      </div>
      <div className="my-2">
        <span className="h4 me-4">Amount:</span>
        <span>{credit.amount}</span>
      </div>

      <div className="my-2">
        <h3 className="mt-3">Items </h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {credit.items &&
              credit.items.map((item, idx) => {
                return (
                  <tr key={item._id}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.sellingPrice}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default VendorCreditDetails;
