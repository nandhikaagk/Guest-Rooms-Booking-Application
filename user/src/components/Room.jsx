import React, { useState } from "react"
import { Modal, Button } from 'react-bootstrap'
import roomModel from "../../../roommodels/rooms";
const Room = (room) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={roomModel.imageurl[0]} className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          {" "}
          <p>Max Count:{room.maxcount}</p>
          <p>Contact:{room.phone}</p>
          <p>Type:{room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          <button className="btn btn-primary">View Details</button>
        </div>

      </div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
export default Room;