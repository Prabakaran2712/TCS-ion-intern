import Header from "../components/Header";
import { useEffect } from "react";
import { useItemsContext } from "../hooks/useItemsContext";
import axios from "axios";
import "./Item.css";
import Table from "../components/itempage/Table";
import Title from "../components/Title";
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
      <Title name="Items"></Title>
      <Header to={"/itemadd"}></Header>
      <div className="item-page-body">
        <div>
          <div>
            <Table items={items} />
          </div>
          i{" "}
        </div>
      </div>
    </div>
  );
};
export default Item;
