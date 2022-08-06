import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header";
import { FaPencilAlt } from "react-icons/fa";
import Title from "../../../components/Title";
const VendorsList = () => {
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4500/api/purchases/vendors")
      .then((response) => {
        setVendors(response.data);
      });
  }, []);

  return (
    <div>
      <Title name="Vendors"></Title>
      <Header to={"/purchases/vendors/add"}></Header>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Vendor name</th>
            <th scope="col">Company</th>
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
            <th scope="col">Website</th>
          </tr>
        </thead>
        <tbody>
          {vendors &&
            vendors.map((vendor, idx) => {
              return (
                <tr key={vendor._id}>
                  <td>{idx + 1}</td>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.company}</td>
                  <td>{vendor.mobile}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.website}</td>
                  <Link to={`/purchases/vendors/edit/${vendor._id}`}>
                    <td>
                      <FaPencilAlt />
                    </td>
                  </Link>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default VendorsList;
