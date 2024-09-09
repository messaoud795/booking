import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./CreateBookingModal.css";
import { useDispatch } from "react-redux";
import { createBooking } from "../../actions/bookingsActions";
import {
  arePropsEqual,
  formatDateForUserDispaly,
  formatDateToISOStringWithTimezone,
} from "../../utils/utils";

const CreateBookingModal = ({ show, setShow, selectedEvent }) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { start, end } = selectedEvent;

  const handleConfirmBtn = () => {
    setShow(false);
    const newBooking = {
      username,
      startDate: formatDateToISOStringWithTimezone(start),
      endDate: formatDateToISOStringWithTimezone(end),
    };
    dispatch(createBooking(newBooking));
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-dialog-centered"
    >
      <Modal.Header closeButton>
        <Modal.Title>New Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <span className="modal-text">
          You are about to create a new booking
        </span>
        <input
          className="modal-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Please enter your name"
        />
        <span>Start : {formatDateForUserDispaly(start)}</span>
        <span>End : {formatDateForUserDispaly(end)}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleConfirmBtn}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(CreateBookingModal, arePropsEqual);
