import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import Title from "../../../components/Title";

const AddSalesReturn = () => {
  const [loading, setLoading] = useState(true);
  const [salesReturn, setSalesReturn] = useState({});
  const [salesOrders, setSalesOrders] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4500/api/sales/salesorders").then((res) => {
      setSalesOrders(res.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4500/api/sales/sales-returns", salesReturn)
      .then(() => {
        setSuccess("Sales return added successfully");
        setError("");
      })
      .catch((error) => {
        setSuccess("");
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading sales orders...</div>;
  }

  return (
    <div>
      <Title name=" Add a new Sales return"></Title>

      <form onSubmit={handleSubmit} className="p-5 m-5">
        {error && <div className="alert alert-danger w-75">{error}</div>}
        {success && <div className="alert alert-success w-75">{success}</div>}

        <div className="form-control">
          <label>Select a sales order ref. no.</label>
          <select
            className="form-select border border-dark m-3"
            required={true}
            value={salesReturn.salesOrder}
            onChange={(e) =>
              setSalesReturn({ ...salesReturn, salesOrder: e.target.value })
            }
          >
            <option value="">Select a sales order</option>
            {salesOrders &&
              salesOrders.map((salesOrder) => {
                return (
                  <option key={salesOrder._id} value={salesOrder._id}>
                    {salesOrder.refNo}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker
            required={true}
            value={salesReturn.date || ""}
            onChange={(e) => setSalesReturn({ ...salesReturn, date: e })}
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="form-control border border-dark m-3 my-5"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddSalesReturn;
