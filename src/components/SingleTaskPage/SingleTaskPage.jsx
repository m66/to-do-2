import "./SingleTaskPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../consts";
import single_task_img_active from "../../images/c++_online_help.png";
import single_task_img_done from "../../images/images.png";
import loading_gif from "../../images/loading-gif.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getSingleTask } from "../../api";

function SingleTaskPage() {
  const [singleTask, setSingleTask] = useState(null);
  const navigate = useNavigate();

  let { taskId } = useParams();

  useEffect(() => {
    getSingleTask(taskId).then((data) => setSingleTask(data));
  }, [taskId]);

  if (!singleTask) {
    return (
      <div className="loading-field">
        <img src={loading_gif} />
      </div>
    );
  }

  const { title, description, status, created_at, updated_at } = singleTask;

  const changeText = () => {
    const changedText = document.getElementById("changedText").textContent;
    const data = {
      ...singleTask,
      description: changedText,
    };

    fetch(`${BACKEND_URL}/task/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="single-task-page">
      <div className="single-task-content">
        <h1>{title}</h1>
        <div className="single-task-general-info">
          <img
            src={
              status === "active"
                ? single_task_img_active
                : single_task_img_done
            }
            alt="Single Task Img"
          />
          <div className="single-task-info-wrapper">
            <p className="description-text">
              <spna className="task-info-field-title">Description</spna>
              <p
                id="changedText"
                contenteditable="true"
                style={{ display: "inline" }}
                onBlur={changeText}
              >
                {description ? description : "There are no description"}
              </p>
            </p>
            <p>
              <spna className="task-info-field-title">Status: </spna>
              {status}
            </p>
            <p>
              <spna className="task-info-field-title">Created at: </spna>
              {`${created_at}`.slice(0, 10)}
            </p>
            <p>
              <spna className="task-info-field-title">Update at: </spna>
              {`${updated_at}`.slice(0, 10)}
            </p>
            <button className="back-navigate" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} /> Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleTaskPage;
