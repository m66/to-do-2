import { useCallback, useState } from "react";
import { BACKEND_URL } from "../../../../consts";
import { CardComponent } from "../../CardComponent";
import "./styles.css";

export const Body = ({ tasks, setTasks }) => {
  const [editableState, setEditableState] = useState(null);
  const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);

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

  return (
    <div className="main-section-body">
      <h2>Tasks</h2>
      {tasks.map((todo) => {
        return (
          <CardComponent
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
    </div>
  );
};
