import { useEffect } from "react";
import { useItemGroupsContext } from "../hooks/useItemGroupsContext";
import axios from "axios";
import Header from "../components/Header";
import Table from "../components/itemgroup/Table";
const ItemGroupsList = () => {
  const { itemGroups, dispatch } = useItemGroupsContext();
  useEffect(() => {
    const fetchItemGroups = () => {
      axios
        .get("http://localhost:4500/api/inventory/item-groups")
        .then((response) => {
          dispatch({ type: "SET_ITEM_GROUPS", payload: response.data });
        });
    };
    fetchItemGroups();
  }, [dispatch]);

  return (
    <div className="item-page">
      <Header to={"/itemgrpadd"}></Header>
      <div className="item-page-body">
        <div>
          <h1>Item groups</h1>
          <div>
            <Table items={itemGroups} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemGroupsList;
