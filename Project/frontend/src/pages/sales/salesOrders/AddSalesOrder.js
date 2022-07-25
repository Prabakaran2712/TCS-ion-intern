import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import { FaPencilAlt } from "react-icons/fa";
const AddSalesOrder = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [salesOrder, setSalesOrder] = useState({});
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  var [selectedItems, setSelectedItems] = useState([]);
  const [curItem, setCurItem] = useState("");

  useEffect(() => {
    const fetchCustomers = () => {
      axios.get("http://localhost:4500/api/sales/customers").then((res) => {
        setCustomers(res.data);
        axios
          .get("http://localhost:4500/api/inventory/items")
          .then((itemsRes) => {
            setItems(itemsRes.data);
            setLoading(false);
          });
      });
    };
    fetchCustomers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      setError("Select atleast one item");
      return;
    }
    axios
      .post(`http://localhost:4500/api/sales/salesorders/`, {
        ...salesOrder,
        items: selectedItems,
      })
      .then(() => {
        setSuccess("Sales Order added successfully");
        setError("");
        setSalesOrder({});
        setSelectedItems([]);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setSuccess("");
      });
  };

  if (loading) {
    return <div>Loading customer details...</div>;
  }

  return (
    <div>
      <h1 className="display-6">Add a new Sales order</h1>
      {error && <div className="alert alert-danger w-50">{error}</div>}
      {success && <div className="alert alert-success w-50">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ref. No.:</label>
          <input
            required={true}
            value={salesOrder.refNo || ""}
            onChange={(e) =>
              setSalesOrder({ ...salesOrder, refNo: e.target.value })
            }
          />
        </div>
        <div>
          <label>Order Date:</label>
          <DatePicker
            required={true}
            value={salesOrder.orderDate || ""}
            onChange={(e) => setSalesOrder({ ...salesOrder, orderDate: e })}
          />
        </div>
        <div>
          <label>Shipment Date:</label>
          <DatePicker
            required={true}
            value={salesOrder.shipmentDate || ""}
            onChange={(e) => setSalesOrder({ ...salesOrder, shipmentDate: e })}
          />
        </div>
        <div>
          <label>Expected Delivery Date:</label>
          <DatePicker
            required={true}
            value={salesOrder.expectedDeliveryDate || ""}
            onChange={(e) =>
              setSalesOrder({ ...salesOrder, expectedDeliveryDate: e })
            }
          />
        </div>
        <div>
          <label>Customer:</label>
          <select
            value={salesOrder.customer || ""}
            onChange={(e) =>
              setSalesOrder({ ...salesOrder, customer: e.target.value })
            }
            required={true}
          >
            <option value="">Select a customer</option>
            {customers &&
              customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.customerName}
                </option>
              ))}
          </select>
        </div>
        <div>
          <h3>Items in this order</h3>
          <div>
            <div>
              <select
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
                        <FaPencilAlt
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default AddSalesOrder;
