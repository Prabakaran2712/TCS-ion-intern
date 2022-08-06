import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import Title from "../../../components/Title";

const AddPayment = () => {
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState({});
  const [customers, setCustomers] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4500/api/sales/customers").then((res) => {
      setCustomers(res.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4500/api/sales/payments", payment)
      .then(() => {
        setSuccess("Payment added successfully");
        setError("");
      })
      .catch((error) => {
        setSuccess("");
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  return (
    <div>
      <Title name="Add a new Payment"></Title>

      <form onSubmit={handleSubmit} className="p-5 m-5">
        {error && <div className="alert alert-danger w-75">{error}</div>}
        {success && <div className="alert alert-success w-75">{success}</div>}
        <div className="form-group">
          <label>Payment. No.:</label>
          <input
            required={true}
            value={payment.paymentNo || ""}
            onChange={(e) =>
              setPayment({ ...payment, paymentNo: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Payment Date:</label>
          <DatePicker
            className="form-control border border-dark m-3"
            required={true}
            value={payment.paymentDate || ""}
            onChange={(e) => setPayment({ ...payment, paymentDate: e })}
          />
        </div>
        <div className="form-group">
          <label>Payment Mode</label>
          <select
            value={payment.paymentMode || ""}
            required={true}
            onChange={(e) =>
              setPayment({ ...payment, paymentMode: e.target.value })
            }
            className="form-select border border-dark m-3"
          >
            <option value="">Select a mode</option>
            <option value="Card">Card</option>
            <option value="Net banking">Net banking</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <div className="form-group">
          <label>Customer:</label>
          <select
            className="form-select border border-dark m-3"
            value={payment.customer || ""}
            onChange={(e) =>
              setPayment({ ...payment, customer: e.target.value })
            }
            required={true}
          >
            <option value="">Select a customer</option>
            {customers &&
              customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.customerName}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            className="form-control border border-dark m-3"
            type="number"
            required={true}
            value={payment.amount || ""}
            onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
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
export default AddPayment;
