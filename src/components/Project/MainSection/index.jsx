import { useEffect, useState } from "react";
import { Body } from "./Body";
import { Head } from "./Head";
import "./styles.css";
import { getTasks } from "../../../api";

export const MainSection = () => {
  /* Local State */
  const [tasks, setTasks] = useState([]);

  /* useEffects */
  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  /* Event handlers */

  return (
    <div className="main-section">
      <Head setTasks={setTasks} />
      <Body setTasks={setTasks} tasks={tasks} />
    </div>
  );
};
