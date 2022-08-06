import { useEffect } from "react";
import { useItemGroupsContext } from "../hooks/useItemGroupsContext";
import axios from "axios";
import Header from "../components/Header";
import Table from "../components/itemgroup/Table";
import Title from "../components/Title";
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
      <Title name="Item Groups"></Title>
      <Header to={"/itemgrpadd"}></Header>
      <div className="item-page-body">
        <div>
          <div>
            <Table items={itemGroups} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemGroupsList;
