import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import Title from "../../../components/Title";

const AddCreditNotes = () => {
  const [loading, setLoading] = useState(true);
  const [creditNote, setCreditNote] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4500/api/sales/invoices").then((res) => {
      setInvoices(res.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4500/api/sales/credit-notes", creditNote)
      .then(() => {
        setSuccess("Credit note added successfully");
        setError("");
      })
      .catch((error) => {
        setSuccess("");
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading invoices...</div>;
  }

  return (
    <div>
      <Title name="Add a new Credit Note"></Title>

      <form onSubmit={handleSubmit} className="p-5 m-5">
        {error && <div className="alert alert-danger w-75">{error}</div>}
        {success && <div className="alert alert-success w-75">{success}</div>}
        <div className="form-group">
          <label>Select a invoice order ref. no.</label>
          <select
            required={true}
            value={creditNote.invoiceNo}
            onChange={(e) =>
              setCreditNote({ ...creditNote, invoiceNo: e.target.value })
            }
            className="form-select border border-dark m-3"
          >
            <option value="">Select a invoice</option>
            {invoices &&
              invoices.map((invoice) => {
                return (
                  <option key={invoice._id} value={invoice._id}>
                    {invoice.orderNo}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Reason:</label>
          <input
            required={true}
            value={creditNote.reason || ""}
            onChange={(e) =>
              setCreditNote({ ...creditNote, reason: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker
            className="form-control border border-dark m-3"
            required={true}
            value={creditNote.creditNoteDate || ""}
            onChange={(e) =>
              setCreditNote({ ...creditNote, creditNoteDate: e })
            }
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-control border border-dark m-3">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddCreditNotes;
