import { useState } from "react";
import axios from "axios";
import Title from "../../../components/Title";
const AddCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4500/api/sales/customers", customer)
      .then(() => {
        setSuccess("A new customer was added");
        setCustomer({});
      })
      .catch((err) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <Title name="Add a new customer"></Title>
      <div>
        <form onSubmit={submitHandler} className="m-5 p-5">
          {error && <div className="alert alert-danger w-75">{error}</div>}
          {success && <div className="alert alert-success w-75">{success}</div>}
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              required={true}
              value={customer.customerName || ""}
              onChange={(e) => {
                setCustomer({ ...customer, customerName: e.target.value });
              }}
              className="form-control border border-dark m-3"
            ></input>
          </div>
          <div className="form-group">
            <label>Company:</label>
            <input
              required={true}
              value={customer.company || ""}
              onChange={(e) => {
                setCustomer({ ...customer, company: e.target.value });
              }}
              className="form-control border border-dark m-3"
            ></input>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              required={true}
              value={customer.email || ""}
              onChange={(e) => {
                setCustomer({ ...customer, email: e.target.value });
              }}
              className="form-control border border-dark m-3"
            ></input>
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input
              required={true}
              value={customer.mobile || ""}
              onChange={(e) => {
                setCustomer({ ...customer, mobile: e.target.value });
              }}
              className="form-control border border-dark m-3"
            ></input>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="form-control border border-dark m-3 my-5"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCustomer;
