import { useState } from "react";
import { Button, Input } from "reactstrap";
import { BACKEND_URL } from "../../../../../consts";
import { SharedModal } from "../../../../../shared/SharedModal";
import "./styles.css";

const SortSelect = () => {
  return (
    <Input name="sort_by" type="select">
      <option>Sort By</option>
      <option>Newest First</option>
      <option>Oldest First</option>
      <option>Todo at Newest</option>
    </Input>
  );
};

// const onSearch = (e) => {
//   fetch(`${BACKEND_URL}/task`)
//     .then((res) => res.json())
//     .then((data) =>
//       setTasks(data.filter((task) => task.title.includes === e.target.value))
//     );
// };

const SearchInput = ({ setTasks }) => {
  return (
    <Input
      type="search"
      placeholder="Search"
      name="search"
      onChange={(e) => {
        fetch(`${BACKEND_URL}/task?search=${e.target.value}`)
          .then((res) => res.json())
          .then((data) => setTasks(data));
      }}
    ></Input>
  );
};

export const HeadRight = ({ setTasks }) => {
  const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
  const handleBtnClick = () => {
    if (isShowAddTaskModal) {
      setIsShowAddTaskModal(false);
    } else {
      setIsShowAddTaskModal(true);
    }
  };

  return (
    <div className="main-section-head-right">
      <Button
        color="primary"
        outline
        style={{ width: "100%" }}
        onClick={handleBtnClick}
      >
        Add New Task
      </Button>
      <SortSelect />
      <SearchInput setTasks={setTasks} />
      {isShowAddTaskModal && (
        <SharedModal
          onClose={() => {
            setIsShowAddTaskModal(false);
          }}
          setTasks={setTasks}
        />
      )}
    </div>
  );
};
