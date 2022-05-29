import "./styles.css";
import { HeadRight } from "./HeadRight";
export const Head = ({ setTasks, handleFilterRequest }) => {
  return (
    <div className="main-section-head">
      <HeadRight setTasks={setTasks} handleFilterRequest={handleFilterRequest} />
    </div>
  );
};
