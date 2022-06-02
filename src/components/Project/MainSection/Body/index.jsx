import { useCallback, useState } from "react";
import { Button } from "reactstrap";
import { BACKEND_URL } from "../../../../consts";
import { CardComponent } from "../../CardComponent";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export const Body = ({ tasks, setTasks }) => {
  const [editableState, setEditableState] = useState(null);
  const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
  const [deletingCards, setDeletingCards] = useState(new Set());

  const onEdit = useCallback((todo) => {
    if (isShowAddTaskModal) {
      setIsShowAddTaskModal(false);
      setEditableState(null);
    } else {
      setIsShowAddTaskModal(true);
      setEditableState(todo);
    }
  }, []);

  const onDelete = useCallback((_id) => {
    fetch(`${BACKEND_URL}/task/${_id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks((prev) => prev.filter((task) => task._id !== _id));
    });
  }, []);

  const onDone = useCallback((_id, status, taskStatus, setTaskStatus) => {
    fetch(`${BACKEND_URL}/task/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: taskStatus === "active" ? "done" : "active",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskStatus(data.status);
      });
  }, []);

  const handleDeletingCards = (_id) => {
    setDeletingCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(_id)) {
        newSet.delete(_id);
      } else {
        newSet.add(_id);
      }
      return newSet;
    });
  };

  const onDeleteAllSelectedTasks = () => {
    const deletingTasksArr = Array.from(deletingCards);
    console.log(deletingTasksArr)
    fetch(`${BACKEND_URL}/task`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tasks: deletingTasksArr,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="main-section-body">
      <h2>Tasks</h2>
      <div className="delete-all-selected">
        {!!deletingCards.size && (
          <FontAwesomeIcon
            onClick={onDeleteAllSelectedTasks}
            className="trash-all-btn"
            icon={faTrashCan}
          />
        )}
      </div>
      {/* <div> */}
      {tasks.map((todo) => {
        return (
          <CardComponent
            handleDeletingCards={handleDeletingCards}
            onDone={onDone}
            editableState={editableState}
            onEdit={onEdit}
            setIsShowAddTaskModal={setIsShowAddTaskModal}
            isShowAddTaskModal={isShowAddTaskModal}
            onDelete={onDelete}
            key={todo._id}
            todo={todo}
            setTasks={setTasks}
          />
        );
      })}
      {/* </div> */}
    </div>
  );
};
