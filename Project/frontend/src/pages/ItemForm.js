import { useEffect, useState } from "react";
import { useItemGroupsContext } from "../hooks/useItemGroupsContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import Title from "../components/Title";

const ItemForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(true);
  const { itemGroups, dispatch } = useItemGroupsContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const fetchItemGroups = () => {
      axios
        .get("http://localhost:4500/api/inventory/item-groups")
        .then((response) => {
          dispatch({ type: "SET_ITEM_GROUPS", payload: response.data });
          setLoading(false);
        });
    };
    fetchItemGroups();
  }, [dispatch]);
  const addItem = (data) => {
    axios
      .post("http://localhost:4500/api/inventory/items", data)
      .then(() => {
        reset();
        setError("");
        setSuccess("Item was added successfully");
      })
      .catch((error) => {
        setSuccess("");
        setError(error.message);
      });
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Title name="Create an Item"></Title>

      <form onSubmit={handleSubmit(addItem)} className="p-5 m-5">
        {error && <div className="alert alert-danger w-75">{error}</div>}
        {success && <div className="alert alert-success w-75">{success}</div>}
        <div className="form-group p-3">
          <label>Item name</label>
          <input
            className="form-control border border-dark m-2 w-75"
            {...register("name", { required: "Item name is required" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Unit</label>
          <input
            className="form-control border border-dark m-2 w-75"
            {...register("unit", { required: "Unit is required" })}
          />
          {errors.unit && <span>{errors.unit.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Dimensions</label>
          <input
            className="form-control border border-dark m-2 w-75"
            {...register("dimensions", { required: "Dimensions are required" })}
          />
          {errors.dimensions && <span>{errors.dimensions.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Weight</label>
          <input
            className="form-control border border-dark m-2 w-75"
            type="number"
            {...register("weight", { required: "Weight is required" })}
          />
          {errors.weight && <span>{errors.weight.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Manufacturer</label>
          <input
            className="form-control border border-dark m-2 w-75"
            {...register("manufacturer", {
              required: "Manufacturer is required",
            })}
          />
          {errors.manufacturer && <span>{errors.manufacturer.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Brand</label>
          <input
            className="form-control border border-dark m-2 w-75"
            {...register("brand", {
              required: "Brand is required",
            })}
          />
          {errors.brand && <span>{errors.brand.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Selling Price</label>
          <input
            className="form-control border border-dark m-2 w-75"
            type="number"
            {...register("sellingPrice", {
              required: "Selling Price is required",
            })}
          />
          {errors.sellingPrice && <span>{errors.sellingPrice.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Cost Price</label>
          <input
            className="form-control border border-dark m-2 w-75"
            type="number"
            {...register("costPrice", {
              required: "Cost Price is required",
            })}
          />
          {errors.costPrice && <span>{errors.costPrice.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Description</label>
          <input
            className="form-control border border-dark m-2 w-75"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Opening Stock</label>
          <input
            className="form-control border border-dark m-2 w-75"
            type="number"
            {...register("openingStock", {
              required: "Opening Stock is required",
            })}
          />
          {errors.openingStock && <span>{errors.openingStock.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Reorder Point</label>
          <input
            className="form-control border border-dark m-2 w-75"
            type="number"
            {...register("reorderPoint", {
              required: "Reorder Point is required",
            })}
          />
          {errors.reorderPoint && <span>{errors.reorderPoint.message}</span>}
        </div>
        <div className="form-group p-3">
          <label>Preferred Vendor</label>
          <input
            className="form-control border border-dark m-2 w-75"
            {...register("preferredVendor", {
              required: "Preferred Vendor is required",
            })}
          />
          {errors.preferredVendor && (
            <span>{errors.preferredVendor.message}</span>
          )}
        </div>
        <div className="form-group p-3">
          <label>Item Group</label>
          <select
            className="form-select border border-dark m-2 w-75"
            {...register("itemGroup", { required: "Item Group is required" })}
          >
            <option value="">Select an item group</option>
            {itemGroups &&
              itemGroups.map((itemGrp) => {
                return (
                  <option key={itemGrp._id} value={itemGrp._id}>
                    {itemGrp.name}
                  </option>
                );
              })}
          </select>
          {errors.itemGroup && <span>{errors.itemGroup.message}</span>}
        </div>
        <button
          type="submit"
          className="form-control border border-dark m-3 w-75"
        >
          Add item
        </button>
      </form>
    </div>
  );
};
export default ItemForm;
