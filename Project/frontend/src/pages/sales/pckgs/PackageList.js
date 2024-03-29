import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Title from "../../../components/Title";
import Header from "../../../components/Header";
const PackagesList = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState({});
  useEffect(() => {
    axios.get("http://localhost:4500/api/sales/packages").then((res) => {
      setPackages(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Title name="Packages"></Title>
      <Header to={"/addpackage"}></Header>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Package No.</th>
            <th scope="col">Sales Order ref. no.</th>
            <th scope="col">Expected Delivery Date</th>
            <th scope="col">Customer</th>
          </tr>
        </thead>
        <tbody>
          {packages &&
            packages.map((pkg, idx) => {
              return (
                <tr key={pkg._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/viewpackagedetails/${pkg._id}`}>
                      {pkg.packageNo}
                    </Link>
                  </td>
                  <td>{pkg.salesOrder.refNo}</td>
                  <td>
                    {format(
                      new Date(pkg.salesOrder.expectedDeliveryDate),
                      "dd MMM yyyy"
                    )}
                  </td>
                  <td>{pkg.salesOrder.customer.customerName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default PackagesList;
