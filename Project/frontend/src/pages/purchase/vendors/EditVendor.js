import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Title from "../../../components/Title";

const EditVendor = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:4500/api/purchases/vendor/${id}`)
      .then((response) => {
        setVendor(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4500/api/purchases/vendors/${id}`, vendor)
      .then(() => {
        navigate("/purchases/vendors");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading vendor info...</div>;
  }

  if (!vendor) {
    return <div>No such vendor</div>;
  }

  return (
    <div>
      <Title name="Update vendor details"></Title>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit} className="p-5 m-5">
        <div className="form-group">
          <label>Vendor Name:</label>
          <input
            required={true}
            value={vendor.vendorName}
            onChange={(e) =>
              setVendor({ ...vendor, vendorName: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-control">
          <label>Company:</label>
          <input
            required={true}
            value={vendor.company}
            onChange={(e) => setVendor({ ...vendor, company: e.target.value })}
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            className="form-control border border-dark m-3 "
            required={true}
            value={vendor.mobile}
            onChange={(e) => setVendor({ ...vendor, mobile: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            required={true}
            value={vendor.email}
            onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input
            required={true}
            value={vendor.website}
            onChange={(e) => setVendor({ ...vendor, website: e.target.value })}
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
export default EditVendor;
