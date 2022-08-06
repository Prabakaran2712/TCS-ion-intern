import axios from "axios";
import Table from "../../../components/customerview/Table";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
const ViewCustomers = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4500/api/sales/customers")
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading customer info..</div>;
  }
  if (!customer) {
    return <div>No such customer</div>;
  }
  return (
    <div>
      <Title name="Customers"></Title>
      <Header to={"/customeradd"}></Header>
      {error && <div>{error}</div>}
      <Table items={customer} />{" "}
    </div>
  );
};
export default ViewCustomers;
