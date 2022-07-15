import "./Home.css";
import { useEffect, useState } from "react";
import Item from "../components/itempage/Item";
const Home = () => {
  const [tasks, setTask] = useState(null);
  useEffect(() => {
    const fetchtask = async () => {
      const response = await fetch("http://localhost:3000/api/task/");
      const json = await response.json();
      if (response.ok) {
        setTask(json);
      }
    };
    fetchtask();
  }, []);
  return (
    <div className="home">
      <div className="tasks">
        {tasks && tasks.map((a) => <Item key={a._id} taskinfo={a} />)}
      </div>
    </div>
  );
};
export default Home;
