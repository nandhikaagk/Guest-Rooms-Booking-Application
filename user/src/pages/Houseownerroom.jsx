import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import '../pages/HouseOwner.css';
function Houseownerroom() {
    const houseowner = JSON.parse(localStorage.getItem('currentHouseowner'));
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedRoomData, setEditedRoomData] = useState({
        _id: '',
        name: '',
        maxcount: '',
        room: '',
        floor: '',
        beds: '',
        amenities: '',
        phone: '',
        rentperday: '',
        location: '',
        imageurl: [],
        type: '',
        desc: '',
        maxstay: '',
        minstay: '',
        houseownerid: ''
    });

    useEffect(() => {
        async function fetchRoomDetails() {
            try {
                setLoading(true);
                const response = await axios.post('/api/rooms/getdetailsbyownerid', { houseownerid: houseowner._id });
                setRooms(response.data);
                setLoading(false);
                setCurrentImageIndex(response.data.reduce((acc, room) => {
                    acc[room._id] = 0;
                    return acc;
                }, {}));
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }

        fetchRoomDetails();
    }, [houseowner._id]);

    const handleNextImage = (roomId) => {
        setCurrentImageIndex((prevIndex) => ({
            ...prevIndex,
            [roomId]: (prevIndex[roomId] + 1) % (rooms.find(room => room._id === roomId).imageurl.length || 1)
        }));
    };

    const handlePrevImage = (roomId) => {
        setCurrentImageIndex((prevIndex) => ({
            ...prevIndex,
            [roomId]: (prevIndex[roomId] - 1 + (rooms.find(room => room._id === roomId).imageurl.length || 1)) % (rooms.find(room => room._id === roomId).imageurl.length || 1)
        }));
    };

    const openEditModal = (selectedRoom) => {
        const {
            _id,
            name,
            maxcount,
            room,
            floor,
            beds,
            amenities,
            phone,
            rentperday,
            location,
            imageurl,
            type,
            desc,
            maxstay,
            minstay,
            houseownerid
        } = selectedRoom;

        setEditedRoomData({
            _id,
            name,
            maxcount,
            room,
            floor,
            beds,
            amenities: amenities.join(", "),
            phone,
            rentperday,
            location: location.join(", "),
            imageurl,
            type,
            desc,
            maxstay,
            minstay,
            houseownerid
        });

        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditedRoomData({
            _id: '',
            name: '',
            maxcount: '',
            room: '',
            floor: '',
            beds: '',
            amenities: '',
            phone: '',
            rentperday: '',
            location: '',
            imageurl: [],
            type: '',
            desc: '',
            maxstay: '',
            minstay: '',
            houseownerid: ''
        });
        setEditModalOpen(false);
    };

    const handleEditRoom = async () => {
        try {
            const response = await axios.put(`/api/rooms/${editedRoomData._id}`, editedRoomData);
            const updatedRoomIndex = rooms.findIndex(room => room._id === editedRoomData._id);
            if (updatedRoomIndex !== -1) {
                const updatedRooms = [...rooms];
                updatedRooms[updatedRoomIndex] = response.data;
                setRooms(updatedRooms);
            }
            closeEditModal();
        } catch (error) {
            console.log('Error editing room:', error);

        }
    };

    const handleDeleteRoom = async (roomId) => {
        try {
            setLoading(true);
            await axios.delete(`/api/rooms/${roomId}`);
            setRooms(rooms.filter(room => room._id !== roomId));
            setLoading(false);
            window.location.href = "/houseowner";
        } catch (error) {
            console.log('Error deleting room:', error);
            setLoading(false);
            setError(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRoomData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <div className="room-details-container">
            <center><h2 className="view-details">View Your Rooms</h2></center>

            {rooms.length > 0 ? (
                rooms.map(room => (
                    <div key={room._id} className="room-details">
                        <div className="room-images">
                            <img src={room.imageurl[currentImageIndex[room._id]]} alt={room.name} />
                            <div className="carousel-controls">
                                <button className="carousel-control" onClick={() => handlePrevImage(room._id)}>‹</button>
                                <button className="carousel-control" onClick={() => handleNextImage(room._id)}>›</button>
                            </div>
                        </div>
                        <h3>{room.name}</h3>
                        <p>Amenity: {room.amenities}</p>
                        <p>Floor Size: {room.floor}</p>
                        <p>Number of Beds: {room.beds}</p>
                        <p>Rent per Day: {room.rentperday}</p>
                        <p>Phone Number: {room.phone}</p>
                        <p>Location: {room.location}</p>
                        <p>Description: {room.desc}</p>
                        <p>MinStay: {room.minstay}</p>
                        <p>MaxStay: {room.maxstay}</p>
                        <p>Type: {room.type}</ p>
                        <center><button className="btn edit" onClick={() => openEditModal(room)}>Edit</button>&nbsp;&nbsp;&nbsp;
                            <button className='btn edit' onClick={() => handleDeleteRoom(room._id)}>Delete</button></center>
                    </div>
                ))
            ) : (
                <p>No rooms available.</p>
            )}

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <center className='view-details'><h2>Edit Your Room</h2></center>
                        <form onSubmit={handleEditRoom}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={editedRoomData.name} onChange={handleChange} required />
                            <label htmlFor="maxcount">Max Count:</label>
                            <input type="number" id="maxcount" name="maxcount" value={editedRoomData.maxcount} onChange={handleChange} required />
                            <label htmlFor="room">Room:</label>
                            <input type="text" id="room" name="room" value={editedRoomData.room} onChange={handleChange} required />
                            <label htmlFor="floor">Floor:</label>
                            <input type="text" id="floor" name="floor" value={editedRoomData.floor} onChange={handleChange} required />
                            <label htmlFor="beds">Beds:</label>
                            <input type="number" id="beds" name="beds" value={editedRoomData.beds} onChange={handleChange} required />
                            <label htmlFor="amenities">Amenities:</label>
                            <input type="text" id="amenities" name="amenities" value={editedRoomData.amenities} onChange={handleChange} required />
                            <label htmlFor="phone">Phone:</label>
                            <input type="number" id="phone" name="phone" value={editedRoomData.phone} onChange={handleChange} required />
                            <label htmlFor="rentperday">Rent per Day:</label>
                            <input type="text" id="rentperday" name="rentperday" value={editedRoomData.rentperday} onChange={handleChange} required />
                            <label htmlFor="location">Location:</label>
                            <input type="text" id="location" name="location" value={editedRoomData.location} onChange={handleChange} required />
                            <label htmlFor="type">Type:</label>
                            <input type="text" id="type" name="type" value={editedRoomData.type} onChange={handleChange} required />
                            <label htmlFor="desc">Description:</label>
                            <textarea id="desc" name="desc" value={editedRoomData.desc} onChange={handleChange} required />
                            <label htmlFor="desc">Minstay:</label>
                            <textarea id="minstay" name="minstay" value={editedRoomData.minstay} onChange={handleChange} required />
                            <label htmlFor="desc">Maxstay:</label>
                            <textarea id="maxstay" name="maxstay" value={editedRoomData.maxstay} onChange={handleChange} required />
                            <button type="submit">Save Your Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Houseownerroom;
