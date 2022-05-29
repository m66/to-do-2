import { memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import { EditModal } from "../../../shared/editModal/EditModal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'

export const CardComponent = memo(
  ({
    onDone,
    editableState,
    onEdit,
    isShowAddTaskModal,
    setIsShowAddTaskModal,
    onDelete,
    todo: { title, description, created_at, _id, status },
    todo,
    setTasks,
  }) => {
    const [taskStatus, setTaskStatus] = useState(status);
    console.log("rerender");

    return (
      <Card
        style={{ width: "300px", minHeight: "300px", marginBottom: "20px", position: "relative" }}
      >
        {status === 'done' && <div style={{position: 'absolute', right: '-10px', top: '-20px', fontSize: '35px', color: 'green'}} className="onDone-icon"><FontAwesomeIcon icon={faCheckCircle} /></div>}
        <CardImg
          alt="Card image cap"
          src="https://picsum.photos/318/180"
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">
            <Link to={_id}>{title}</Link>
          </CardTitle>
          <CardText>{description.length > 30 ? `${description.slice(0, 30)}...`: description}</CardText>
          <CardText>
            {created_at.toLocaleString().split("T").join(" ")}
          </CardText>
          <Button
            onClick={() => onDone(_id, status, taskStatus, setTaskStatus)}
            style={{ background: taskStatus === "active" ? "orange" : "green" }}
          >
            {taskStatus === "active" ? "Done" : "Completed"}
          </Button>
          {"  "}
          <Button style={{ background: "red" }} onClick={() => onDelete(_id)}>
            Delete
          </Button>
          {"  "}
          <Button
            style={{ background: "blueviolet" }}
            onClick={() => onEdit(todo)}
          >
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
  }
);
