import { CardComponent } from "../../CardComponent";
import "./styles.css";

//componentDidMount (Works only one time)
// useEffect(() => {

// }, []);

//componentDidUpdate (Works after any update)
// useEffect(() => {

// });

export const Body = ({ tasks }) => {
  return (
    <div className="main-section-body">
      {tasks.map((todo) => {
        return <CardComponent key={todo._id} todo={todo} />;
      })}
    </div>
  );
};
