import { Body } from "./Body";
import { Head } from "./Head";
import "./styles.css";

export const MainSection = ({tasks, setTasks, handleFilterRequest}) => {
  return (
    <div className="main-section">
      <Head setTasks={setTasks} handleFilterRequest={handleFilterRequest}/>
      <Body setTasks={setTasks} tasks={tasks} />
    </div>
  );
};
