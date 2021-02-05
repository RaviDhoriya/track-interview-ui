import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Api from "../config/Api";

const ActivityModal = forwardRef((props, ref) => {
  const blankActivity = {
    body: "",
    is_schedule: false,
    schedule_date: new Date(),
    schedule_done: false,
  };

  const [show, setShow] = useState(false);
  const [isEdit, setISEdit] = useState(false);
  const [activity, setActivity] = useState(blankActivity);
  const [date, setDate] = useState(new Date());

  const job = props.job;
  useImperativeHandle(ref, () => {
    return {
      showModal: (oldAct) => {
        setShow(true);
        if (oldAct == null) {
          setISEdit(false);
          setActivity(blankActivity);
        } else {
          setISEdit(true);
          oldAct.schedule_date = new Date(oldAct.schedule_date);
          if (oldAct.is_schedule) {
            oldAct.is_schedule = true;
          } else {
            oldAct.is_schedule = false;
          }
          if (oldAct.schedule_done) {
            oldAct.schedule_done = true;
          } else {
            oldAct.schedule_done = false;
          }
          setActivity(oldAct);
        }
      },
    };
  });
  const submitForm = () => {
    var body = {};
    body.job_id = job._id;
    body.body = activity.body;
    body.is_schedule = activity.is_schedule;
    body.schedule_date = activity.schedule_date;
    body.schedule_done = activity.schedule_done;
    if (isEdit) {
      body.activity_id = activity._id;
      Api.editActivity(body, (resp) => {
        if(resp.status){
          setShow(false);
          props.parentCallback();
        }
      });
    } else {
      Api.newActivity(body, (resp) => {
        if(resp.status){
          setShow(false);
          props.parentCallback();
        }
      });
    }
  };
  return (
    <Modal show={show} onHide={() => {}}>
      <ModalHeader>
        <ModalTitle>{isEdit ? "Edit Activity" : "New Activity"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl
              type="text"
              placeholder="Description"
              value={activity.body}
              onChange={(e) =>
                setActivity({ ...activity, body: e.target.value })
              }
            ></FormControl>
          </FormGroup>
          <FormLabel>Set Reminder</FormLabel>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Checkbox
                checked={activity.is_schedule}
                onChange={(e) =>
                  setActivity({
                    ...activity,
                    is_schedule: !activity.is_schedule,
                  })
                }
              />
            </InputGroup.Prepend>
            <ReactDatePicker
              as={FormControl}
              selected={activity.schedule_date}
              onChange={(dt) =>
                setActivity({ ...activity, schedule_date: new Date(dt) })
              }
            />
          </InputGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={submitForm}>
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setShow(false);
            props.parentCallback();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default ActivityModal;
