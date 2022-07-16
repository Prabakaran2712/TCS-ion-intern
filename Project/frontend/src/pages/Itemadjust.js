import Header from "../components/Header";
import { useEffect } from "react";
import { useItemAdjContext } from "../hooks/ItemAdjustmentContext";
import axios from "axios";
import "./Item.css";
import Table from "../components/itemadjust/Table";
const Item = () => {
  const { itemAdj, dispatch } = useItemAdjContext();
  useEffect(() => {
    const fetchItems = () => {
      axios
        .get("http://localhost:4500/api/inventory/adjustments")
        .then((response) => {
          dispatch({ type: "SET_ITEM_ADJ", payload: response.data });
        });
    };
    fetchItems();
  }, [dispatch]);
  return (
    <div className="item-page">
      <Header to={"/itemadjadd"}></Header>
      <div className="item-page-body">
        <div>
          <h1>Item Adjustment</h1>
          <div>
            <Table items={itemAdj} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Item;
