import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import { BACKEND_URL } from "../../../consts";
import { EditModal } from "../../../shared/editModal/EditModal";

export const CardComponent = ({
  todo,
  todo: { title, description, created_at, _id, status },
  setTasks,
}) => {
  const [editableState, setEditableState] = useState(null);
  const [taskStatus, setTaskStatus] = useState(status);
  const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);

  const handleBtnClick = () => {
    if (isShowAddTaskModal) {
      setIsShowAddTaskModal(false);
      setEditableState(null);
    } else {
      setIsShowAddTaskModal(true);
      setEditableState(todo);
    }
  };

  const onDelete = () => {
    fetch(`${BACKEND_URL}/task/${_id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks((prev) => prev.filter((task) => task._id !== _id));
    });
  };

  const onDone = () => {
    fetch(`${BACKEND_URL}/task/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "done" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskStatus(data.status);
      });
  };

  return (
    <Card style={{ width: "300px", minHeight: "300px", marginBottom: "20px" }}>
      <CardImg
        alt="Card image cap"
        src="https://picsum.photos/318/180"
        top
        width="100%"
      />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText>{description}</CardText>
        <CardText>{created_at.toLocaleString().split("T").join(" ")}</CardText>
        <Button
          onClick={onDone}
          style={{ background: taskStatus === "active" ? "orange" : "green" }}
          disabled={taskStatus === "done" ? "disabled" : ""}
        >
          {taskStatus === "active" ? "Done" : "Completed"}
        </Button>
        {"  "}
        <Button style={{ background: "red" }} onClick={onDelete}>
          Delete
        </Button>
        {"  "}
        <Button style={{ background: "blueviolet" }} onClick={handleBtnClick}>
          Edit
        </Button>
        {isShowAddTaskModal && (
          <EditModal
            editableState={editableState}
            onClose={() => {
              setIsShowAddTaskModal(false);
            }}
            setTasks={setTasks}
          />
        )}
      </CardBody>
    </Card>
  );
};
