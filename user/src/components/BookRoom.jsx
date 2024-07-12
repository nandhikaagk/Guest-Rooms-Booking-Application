import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';
const BookRoom = ({ room, fromdate, todate }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="book-room-card">
            <div className="room-image">
                <img src={room.imageurl[0]} alt="Room" className="smallimg" />
            </div>
            <div className="room-details">
                <h2 className="roomsd">{room.name}</h2>
                <p><b>Stay Count:</b> {room.maxcount}</p>
                <p><b>Phone Number:</b> {room.phone}</p>
                <p className="rent"><b>RentPerDay:</b>${room.rentperday}</p>
                <p><b>No of Beds:</b> {room.beds}</p>
                {/* <p><b>Amenities:</b> {room.amenities}</p>
                <p><b>Type:</b> {room.type}</p>
                <p><b>location:</b> {room.location}</p> */}
                <div>
                    {(fromdate && todate) && (
                        <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className="btn bookroom ">Book Rooms</button>
                        </Link>

                    )}&nbsp;&nbsp;&nbsp;

                    <button className="btn bookroom1 " onClick={handleShow}>View Rooms</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size='md'>
                <Modal.Header>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageurl.map((url, index) => (
                            <Carousel.Item key={index}>
                                <img className="d-block w-100 bigimg" src={url} alt={`Slide ${index}`} />
                                <p><b>Room No:</b> {room.room}</p>
                                <p><b>Floor:</b> {room.floor}</p>
                                <p><b>Amenities:</b> {room.amenities}</p>
                                <p><b>Type:</b> {room.type}</p>
                                <p><b>location:</b> {room.location}</p>
                                <p><b>Description:</b>{room.desc}</p>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BookRoom;
