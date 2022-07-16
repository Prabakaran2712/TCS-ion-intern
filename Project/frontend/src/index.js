import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ItemsContextProvider } from "./context/ItemsContext";
import { ItemGroupsContextProvider } from "./context/ItemGroupsContext";
import { ItemAdjContextProvider } from "./context/ItemAdjustmentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ItemsContextProvider>
      <ItemGroupsContextProvider>
        <ItemAdjContextProvider>
          <App />
        </ItemAdjContextProvider>
      </ItemGroupsContextProvider>
    </ItemsContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
