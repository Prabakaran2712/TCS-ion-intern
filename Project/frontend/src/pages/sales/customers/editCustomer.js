import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const EditCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:4500/api/sales/customer/${id}`)
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4500/api/sales/customers/${id}`, customer)
      .then((res) => {
        console.log(res);
        navigate("/customerview");
      })
      .catch((err) => {
        console.log(err);
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading customer info..</div>;
  }
  if (!customer) {
    return <div>No such customer</div>;
  }
  return (
    <div>
      <h1 className="display-6">Update customer details</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input
            required={true}
            value={customer.customerName}
            onChange={(e) =>
              setCustomer({ ...customer, customerName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Company:</label>
          <input
            required={true}
            value={customer.company}
            onChange={(e) =>
              setCustomer({ ...customer, company: e.target.value })
            }
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            required={true}
            value={customer.mobile}
            onChange={(e) =>
              setCustomer({ ...customer, mobile: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            required={true}
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCustomer;
