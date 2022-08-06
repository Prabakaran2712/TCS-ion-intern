import { useState } from "react";
import { useItemGroupsContext } from "../hooks/useItemGroupsContext";
import axios from "axios";
import "./ItemGroupForm.css";
import Title from "../components/Title";
const ItemGroupsForm = () => {
  const { dispatch } = useItemGroupsContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemGroup = { name, description };

    axios
      .post("http://localhost:4500/api/inventory/item-groups", itemGroup)
      .then((response) => {
        setName("");
        setDescription("");
        dispatch({ type: "CREATE_ITEM_GROUP", payload: response.data });
      });
  };

  return (
    <div>
      <Title name="Add a New Item Group"></Title>
      <form className="create p-5 m-5 " onSubmit={handleSubmit}>
        <div className="form-group p-3">
          <label>Item Group Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-control border border-dark m-2 w-75"
          />
        </div>
        <div className="form-group p-3">
          <label>Description:</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control border border-dark m-2 w-75"
          />
        </div>
        <div className="form-group p-3">
          <button className="form-control border border-dark m-3 w-75">
            Add Item Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemGroupsForm;
