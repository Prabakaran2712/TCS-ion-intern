import { createContext, useReducer } from "react";

export const ItemAdjContext = createContext();

export const itemAdjReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEM_ADJ":
      return {
        itemAdj: action.payload,
      };
    case "CREATE_ITEM_ADJ":
      return {
        itemAdj: [action.payload, ...state.itemAdj],
      };
    default:
      return state;
  }
};

export const ItemAdjContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemAdjReducer, {
    itemAdj: null,
  });
  return (
    <ItemAdjContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItemAdjContext.Provider>
  );
};
