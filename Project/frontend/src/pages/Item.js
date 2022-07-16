import Header from "../components/Header";
import { useEffect } from "react";
import { useItemsContext } from "../hooks/useItemsContext";
import axios from "axios";
import "./Item.css";
import Table from "../components/itempage/Table";
const Item = () => {
  const { items, dispatch } = useItemsContext();
  useEffect(() => {
    const fetchItems = () => {
      axios
        .get("http://localhost:4500/api/inventory/items")
        .then((response) => {
          dispatch({ type: "SET_ITEMS", payload: response.data });
        });
    };
    fetchItems();
  }, [dispatch]);
  return (
    <div className="item-page">
      <Header to={"/itemadd"}></Header>
      <div className="item-page-body">
        <div>
          <h1>Items</h1>
          <div>
            <Table items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Item;
