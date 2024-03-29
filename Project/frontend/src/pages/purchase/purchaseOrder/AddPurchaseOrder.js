import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import { FaRegTrashAlt } from "react-icons/fa";
import Title from "../../../components/Title";
const AddPurchaseOrder = () => {
  // form states
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // purchase order
  const [purchaseOrder, setPurchaseOrder] = useState({});

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
    axios
      .post(`http://localhost:4500/api/purchases/purchasesorders/`, {
        ...purchaseOrder,
        items: selectedItems,
      })
      .then(() => {
        setSuccess("Purchase Order added successfully");
        setError("");
        setPurchaseOrder({});
        setSelectedItems([]);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setSuccess("");
      });
  };

  if (loading) {
    return <div>Loading vendor details...</div>;
  }

  return (
    <div>
      <Title name="Add a new Puchase Order" />

      <form onSubmit={handleSubmit} className="p-5 m-5">
        {error && <div className="alert alert-danger w-75">{error}</div>}
        {success && <div className="alert alert-success w-75">{success}</div>}
        <div className="form-group">
          <label>Ref. No.:</label>
          <input
            required={true}
            value={purchaseOrder.refNo || ""}
            onChange={(e) =>
              setPurchaseOrder({ ...purchaseOrder, refNo: e.target.value })
            }
            className="form-control border border-dark m-2"
          />
        </div>
        <div className="form-group">
          <label>Order Date:</label>
          <DatePicker
            required={true}
            value={purchaseOrder.orderDate || ""}
            onChange={(e) =>
              setPurchaseOrder({ ...purchaseOrder, orderDate: e })
            }
            className="form-control border border-dark m-2"
          />
        </div>
        <div className="form-group">
          <label>Vendor:</label>
          <select
            className="form-select border border-dark m-2"
            value={purchaseOrder.vendor || ""}
            onChange={(e) =>
              setPurchaseOrder({ ...purchaseOrder, vendor: e.target.value })
            }
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
        <div>
          <h3>Items in this order</h3>
          <div>
            <div>
              <select
                className="form-select border border-dark m-2"
                value={curItem}
                onChange={(e) => setCurItem(e.target.value)}
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
              <div className="form-group">
                <div
                  className="btn btn-secondary mx-3"
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
          <button type="submit" className="form-control border border-dark m-2">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddPurchaseOrder;
