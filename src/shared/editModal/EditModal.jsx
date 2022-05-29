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

const EditTaskForm = ({ onSubmitCallback, setTasks, editableState }) => {
  const [inputsData, setInputsData] = useState({
    title: {
      value: editableState.title,
      error: undefined,
      validations: [isRequired, minLength3, maxLength20],
    },
    description: {
      value: editableState.description,
      error: undefined,
      validations: [isRequired, minLength3, maxLength20],
    },
    date: {
      value: editableState.date,
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
    };

    fetch(`${BACKEND_URL}/task/${editableState._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prev) => {
          return prev.map((item) => {
            if (item._id === editableState._id) {
              return data;
            }
            return item;
          });
        });
        onSubmitCallback();
      });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    let error;
    const { validations } = inputsData[name];

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
          value={inputsData.title.value}
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
          value={inputsData.description.value}
          id="descriptionId"
          name="description"
          placeholder="Task descriptionId"
          type="text"
          onChange={handleChange}
          invalid={!!inputsData.description.error}
        />
        {!!inputsData.description.error && (
          <FormFeedback>{inputsData.description.error}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="dateId">Dead-Line</Label>
        <DatePicker
          // value={inputsData.date.value}
          id="dateId"
          name="date"
          selected={inputsData.date.value}
          // onChange={(selectrdDate) => setDeadLineDate(selectrdDate)}
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
        Edit Task
      </Button>{" "}
      <Button color="primary">Clear</Button>{" "}
    </Form>
  );
};

export const EditModal = ({ onClose, setTasks, editableState }) => {
  return (
    <Modal toggle={onClose} isOpen={true}>
      <ModalHeader toggle={onClose}>Edit Task</ModalHeader>
      <ModalBody>
        <EditTaskForm
          editableState={editableState}
          onSubmitCallback={onClose}
          setTasks={setTasks}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
