import { useState } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { isRequired, maxLength20, minLength3 } from "../../helpers/validations";
import { BACKEND_URL } from "../../consts";
import DatePicker from "react-datepicker";
import moment from "moment";

const AddTaskForm = ({ onSubmitCallback, setTasks }) => {
  const [deadLineDate, setDeadLineDate] = useState(new Date());
  const [inputsData, setInputsData] = useState({
    title: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, maxLength20],
    },
    description: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, maxLength20],
    },
    date: {
      value: "",
      error: undefined,
      validations: [isRequired],
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      title: { value: title },
      description: { value: description },
    } = inputsData;

    const formData = {
      title,
      description,
      date: moment(deadLineDate).format("YYYY-MM-DD"),
    };

    fetch(`${BACKEND_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prev) => {
          return [...prev, data];
        });
        onSubmitCallback();
      });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    const { validations } = inputsData[name];

    let error;

    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      const errorMessage = validation(value);

      if (errorMessage) {
        error = errorMessage;
        break;
      }
    }

    setInputsData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error,
        },
      };
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="titleId">Title</Label>
        <Input
          id="titleId"
          name="title"
          placeholder="Task title"
          type="text"
          onChange={handleChange}
          invalid={!!inputsData.title.error}
        />
        {!!inputsData.title.error && (
          <FormFeedback>{inputsData.title.error}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="descriptionId">Description</Label>
        <Input
          id="descriptionId"
          name="description"
          invalid={!!inputsData.description.error}
          placeholder="Task descriptionId"
          type="text"
          onChange={handleChange}
        />
        {!!inputsData.description.error && (
          <FormFeedback>{inputsData.description.error}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="dateId">Dead-Line</Label>
        <DatePicker
          id="dateId"
          name="date"
          selected={deadLineDate}
          onChange={(selectrdDate) => setDeadLineDate(selectrdDate)}
          dateFormat="yyyy-mm-dd"
          minDate={new Date()}
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          isClearable
        />
        {!!inputsData.date.error && (
          <FormFeedback>{inputsData.date.error}</FormFeedback>
        )}
      </FormGroup>
      {/* Date Picker */}
      <Button color="primary" onClick={onSubmit}>
        Add Task
      </Button>{" "}
      <Button color="primary">Clear</Button>{" "}
    </Form>
  );
};

export const SharedModal = ({ onClose, setTasks }) => {
  return (
    <Modal toggle={onClose} isOpen={true}>
      <ModalHeader toggle={onClose}>Add new task</ModalHeader>
      <ModalBody>
        <AddTaskForm onSubmitCallback={onClose} setTasks={setTasks} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
