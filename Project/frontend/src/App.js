import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Item from "./pages/Item";
import ItemGroup from "./pages/ItemGroup";
import ItemAdj from "./pages/Itemadjust";
import ItemAdd from "./pages/ItemForm";
import ItemGroupFrom from "./pages/ItemGroupForm";
import ItemAdjForm from "./pages/ItemAdjustForm";
const data = [
  { name: "Dashboard", link: "/", id: 1 },
  { name: "Item", link: "/item", id: 2 },
  { name: "ItemGroup", link: "/itemgroup", id: 3 },
  { name: "ItemAdjustment", link: "/itemadj", id: 4 },
];
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar details={data} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item" element={<Item />} />
            <Route path="/itemadd" element={<ItemAdd />} />
            <Route path="/itemgrpadd" element={<ItemGroupFrom />} />
            <Route path="/itemgroup" element={<ItemGroup />} />
            <Route path="/itemadj" element={<ItemAdj />} />
            <Route path="/itemadjadd" element={<ItemAdjForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
