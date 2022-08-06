import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../../../components/Title";
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
      <Title name={"Update customer details"}> </Title>

      <form onSubmit={handleSubmit} className="m-5 p-5">
        {error && <div className="alert alert-danger w-75">{error}</div>}

        <div className="form-group">
          <label>Customer Name:</label>
          <input
            required={true}
            value={customer.customerName}
            onChange={(e) =>
              setCustomer({ ...customer, customerName: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input
            required={true}
            value={customer.company}
            onChange={(e) =>
              setCustomer({ ...customer, company: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            required={true}
            value={customer.mobile}
            onChange={(e) =>
              setCustomer({ ...customer, mobile: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            required={true}
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="form-control border border-dark m-3 my-5"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
