import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import { FaRegTrashAlt } from "react-icons/fa";
import Title from "../../../components/Title";
const AddVendorCredit = () => {
  // form states
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // sales order
  const [vendorCredit, setVendorCredit] = useState({
    creditNoteNo: "",
    date: new Date(),
    vendor: "",
  });

  // form input states
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [curItem, setCurItem] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/purchases/vendors")
      .then((response) => {
        setVendors(response.data);
        axios
          .get("http://localhost:4500/api/inventory/items")
          .then((itemsRes) => {
            setItems(itemsRes.data);
            setLoading(false);
          });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      setError("Select atleast one item");
      return;
    }
    let amount = 0;
    for (let i = 0; i < selectedItems.length; i++) {
      amount += items.find(
        (item) => item._id === selectedItems[i]
      ).sellingPrice;
    }
    axios
      .post(`http://localhost:4500/api/purchases/vendor-credits/`, {
        ...vendorCredit,
        items: selectedItems,
        amount,
      })
      .then(() => {
        setSuccess("Vendor Credit added successfully");
        setError("");
        setVendorCredit({
          creditNoteNo: "",
          date: new Date(),
          vendor: "",
        });
        setSelectedItems([]);
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
      });
  };

  if (loading) {
    return <div>Loading vendor details...</div>;
  }

  return (
    <div>
      <Title name="Add a new Vendor Credit"></Title>

      <form onSubmit={handleSubmit} className="p-5 m-5">
        {error && <div className="alert alert-danger w-75">{error}</div>}
        {success && <div className="alert alert-success w-75">{success}</div>}
        <div className="form-group">
          <label>Credit note no.:</label>
          <input
            required={true}
            value={vendorCredit.creditNoteNo}
            onChange={(e) =>
              setVendorCredit({ ...vendorCredit, creditNoteNo: e.target.value })
            }
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker
            required={true}
            value={vendorCredit.date}
            onChange={(e) => setVendorCredit({ ...vendorCredit, date: e })}
            className="form-control border border-dark m-3"
          />
        </div>
        <div className="form-group">
          <label>Vendor:</label>
          <select
            value={vendorCredit.vendor}
            onChange={(e) =>
              setVendorCredit({ ...vendorCredit, vendor: e.target.value })
            }
            className="form-select border border-dark m-3"
            required={true}
          >
            <option value="">Select a vendor</option>
            {vendors &&
              vendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                  {vendor.vendorName}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <h3>Items in this credit</h3>
          <div>
            <div className="form-group">
              <select
                value={curItem}
                onChange={(e) => setCurItem(e.target.value)}
                className="form-select border border-dark m-3"
              >
                <option value="">Choose an item to add</option>
                {items &&
                  items.map((item) => {
                    if (!selectedItems.includes(item._id)) {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      );
                    }
                  })}
              </select>
              <div
                className="btn btn-secondary "
                onClick={() => {
                  if (curItem) {
                    setSelectedItems([...selectedItems, curItem]);
                    setCurItem("");
                  }
                }}
              >
                Add Item
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems &&
                selectedItems.map((item, idx) => {
                  const thisItem = items.find((i) => i._id === item);
                  return (
                    <tr key={item}>
                      <td>{idx + 1}</td>
                      <td>{thisItem.name}</td>
                      <td>{thisItem.brand}</td>
                      <td>{thisItem.sellingPrice}</td>
                      <td>
                        <FaRegTrashAlt
                          onClick={(e) => {
                            setSelectedItems(
                              selectedItems.filter((id) => {
                                return id !== item;
                              })
                            );
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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
export default AddVendorCredit;
