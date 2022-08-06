import { useState } from "react";
import axios from "axios";
import Title from "../../../components/Title";

const AddVendor = () => {
  const [vendor, setVendor] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4500/api/purchases/vendors/`, vendor)
      .then(() => {
        setSuccess("Vendor added successfully");
        setError("");
        setVendor({});
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setSuccess("");
      });
  };

  return (
    <div>
      <Title name="Add a new vendor"></Title>

      <form onSubmit={handleSubmit} className="p-5 m-5">
        {error && <div className="alert alert-danger w-75">{error}</div>}
        {success && <div className="alert alert-success w-75">{success}</div>}
        <div className="form-group">
          <label>Vendor Name:</label>
          <input
            required={true}
            value={vendor.vendorName || ""}
            onChange={(e) =>
              setVendor({ ...vendor, vendorName: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input
            required={true}
            value={vendor.company || ""}
            onChange={(e) => setVendor({ ...vendor, company: e.target.value })}
            className="  form-control
            border
            border-dark
            m-3"
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            required={true}
            value={vendor.mobile || ""}
            onChange={(e) => setVendor({ ...vendor, mobile: e.target.value })}
            className="form-control border border-dark m-3"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            required={true}
            value={vendor.email || ""}
            onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input
            required={true}
            value={vendor.website || ""}
            onChange={(e) => setVendor({ ...vendor, website: e.target.value })}
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="form-control border border-dark mx-3 my-5"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddVendor;
