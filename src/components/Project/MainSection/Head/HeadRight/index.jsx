import { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { BACKEND_URL, FILTER_FIELDS } from "../../../../../consts";
import { SharedModal } from "../../../../../shared/SharedModal";
import "./styles.css";

const { SORT_FIELDS } = FILTER_FIELDS;

export const HeadRight = ({ setTasks, handleFilterRequest }) => {
  const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
  const [searchHandler, setSearchHandler] = useState("");
  const [sortHandler, setSortHandler] = useState("");

  const handleBtnClick = () => {
    if (isShowAddTaskModal) {
      setIsShowAddTaskModal(false);
    } else {
      setIsShowAddTaskModal(true);
    }
  };

  useEffect(() => {
    let sendRequestURLStr = `${BACKEND_URL}/task?${
      searchHandler && `search=${searchHandler}&`
    }${sortHandler && `sort=${sortHandler}`}`;
    fetch(sendRequestURLStr)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [searchHandler, sortHandler]);

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
      {/* <Input name="sort_by" type="select" onChange={(e) => {
        setSortHandler(e.target.value);
      }}>
        <option value="created_date_newest">Created newest</option>
        <option value="created_date_oldest">Created oldest</option>
        <option value="completed_date_newest">Completed newest</option>
        <option value="completed_date_oldest">Completed oldest</option>
        <option value="a-z">A - Z</option>
        <option value="z-a">Z - A</option>
      </Input> */}
      <Input
        name="sort_by"
        type="select"
        onChange={(e) => handleFilterRequest("sort", e.target.value)}
      >
        {SORT_FIELDS.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </Input>
      <Input
        type="search"
        placeholder="Search"
        name="search"
        onChange={(e) => {
          // setSearchHandler(e.target.value);
          handleFilterRequest("search", e.target.value)
        }}
      ></Input>
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
