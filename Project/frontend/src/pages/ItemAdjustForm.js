import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useItemsContext } from "../hooks/useItemsContext";
import DatePicker from "react-date-picker";

const AdjustmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const { items, dispatch } = useItemsContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newVal, setNewVal] = useState("");

  useEffect(() => {
    const fetchItems = () => {
      console.log();
      axios
        .get("http://localhost:4500/api/inventory/items")
        .then((response) => {
          dispatch({ type: "SET_ITEMS", payload: response.data });
          setLoading(false);
        });
    };
    fetchItems();
  }, [dispatch]);

  const addAdjustment = async (data) => {
    const postAdjustment = async () => {
      await axios
        .post("http://localhost:4500/api/inventory/adjustments", {
          ...data,
          date,
        })
        .then(() => {
          reset();
          setNewVal("");
          setDate(new Date());
          setSuccess("Adjustment made successfully");
          setError("");
        })
        .catch((err) => {
          setSuccess("");
          setError(err.message);
        });
    };

    if (data.mode === "quantity") {
      axios
        .patch(`http://localhost:4500/api/inventory/items/${data.items}`, {
          openingStock: newVal,
        })
        .then(() => postAdjustment());
    } else {
      axios
        .patch(`http://localhost:4500/api/inventory/items/${data.items}`, {
          sellingPrice: newVal,
        })
        .then(() => postAdjustment());
    }
  };

  if (loading) {
    return <div>Loading available items...</div>;
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
      <form onSubmit={handleSubmit(addAdjustment)}>
        <div>
          <label>Mode of adjustment</label>
          <select
            {...register("mode", {
              required: "Mode of adjustment is required",
            })}
          >
            <option value="">Select a mode of adjustment</option>
            <option value="quantity">Quantity</option>
            <option value="value">Value</option>
          </select>
          {errors.mode && <span>{errors.mode.message}</span>}
        </div>
        <div>
          <label>New Value of quantity/value</label>
          <input
            type="number"
            required={true}
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
          />
        </div>
        <div>
          <label>Reference No.</label>
          <input
            {...register("refno", { required: "Reference No. is required" })}
          />
          {errors.refno && <span>{errors.refno.message}</span>}
        </div>
        <div>
          <label>Date</label>
          <DatePicker
            onChange={(dateVal) => {
              // add timezone offset
              setDate(
                new Date(
                  dateVal.getTime() - dateVal.getTimezoneOffset() * 60000
                )
              );
            }}
            value={date}
          />
        </div>
        <div>
          <label>Reason</label>
          <input {...register("Reason", { required: "Reason is required" })} />
          {errors.Reason && <span>{errors.Reason.message}</span>}
        </div>
        <div>
          <label>Description</label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div>
          <label>Item</label>
          <select {...register("items", { required: "Item is required" })}>
            <option value="">Select an item</option>
            {items &&
              items.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          {errors.items && <span>{errors.items.message}</span>}
        </div>
        <div>
          <button type="submit">Make adjustment</button>
        </div>
      </form>
    </div>
  );
};
export default AdjustmentForm;
