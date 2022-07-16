import { useContext } from "react";
import { ItemAdjContext } from "../context/ItemAdjustmentContext";

export const useItemAdjContext = () => {
  const context = useContext(ItemAdjContext);
  if (!context) {
    throw Error("incorrect usage of context");
  }
  return context;
};
