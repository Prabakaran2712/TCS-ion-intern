import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Title from "../../../components/Title";
const InvoicesList = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const fetchInvoices = () => {
      axios.get("http://localhost:4500/api/sales/invoices").then((response) => {
        setInvoices(response.data);
        setLoading(false);
      });
    };
    fetchInvoices();
  }, []);

  if (loading) {
    return <div>Loading invoices...</div>;
  }
  return (
    <div>
      <Title name="Invoices"></Title>
      <Header to={"/addinvoice"}></Header>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order. no.</th>
            <th scope="col">Invoice Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices &&
            invoices.map((invoice, idx) => {
              return (
                <tr key={invoice._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/invoicedetail/${invoice._id}`}>
                      {invoice.orderNo}
                    </Link>
                  </td>
                  <td>
                    {format(new Date(invoice.invoiceDate), "dd MMM yyyy")}
                  </td>
                  <td>{invoice.customer.customerName}</td>
                  <td>{invoice.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default InvoicesList;
