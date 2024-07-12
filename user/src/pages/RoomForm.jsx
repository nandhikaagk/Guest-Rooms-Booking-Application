import React, { useState } from "react";
import axios from "axios";
const RoomForm = () => {
  const [name, setName] = useState("");
  const [maxcount, setMaxCount] = useState("");
  const [room, setRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [beds, setBeds] = useState("");
  const [amenities, setAmenities] = useState("");
  const [phone, setPhone] = useState("");
  const [rentperday, setRentPerDay] = useState("");
  const [location, setLocation] = useState("");
  const [imageurl, setImageUrl] = useState([""]);
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [minstay, setMinstay] = useState("")
  const [maxstay, setMaxstay] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const houseowner = JSON.parse(localStorage.getItem('currentHouseowner'));
    const roomData = {
      houseownerid: houseowner._id,
      name,
      maxcount,
      room,
      floor,
      beds,
      amenities: amenities.split(",").map((item) => item.trim()),
      phone,
      rentperday,
      location: location.split(",").map((item) => item.trim()),
      imageurl,
      type,
      desc,
      minstay,
      maxstay,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/rooms/create", roomData);
      console.log(response.data);
      alert("Room created successfully!");

      clearFormFields();

      window.location.href = "/houseowner/view";
    } catch (error) {
      console.error("Room creation failed:", error);
      alert("Room creation failed. Please check the console for details.");
    }
  };

  const clearFormFields = () => {
    setName("");
    setMaxCount("");
    setRoom("");
    setFloor("");
    setBeds("");
    setAmenities("");
    setPhone("");
    setRentPerDay("");
    setLocation("");
    setImageUrl([""]);
    setType("");
    setDesc("");
    setMinstay("");
    setMaxstay("");
  };

  const handleImageUrlChange = (index, e) => {
    const newImageUrl = [...imageurl];
    newImageUrl[index] = e.target.value;
    setImageUrl(newImageUrl);
  };

  const addImageUrlField = () => {
    setImageUrl([...imageurl, ""]);
  };

  return (
    <div className="form-container">
      <center><h2 className="guest">Add Guest Rooms</h2></center>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Max Count"
          value={maxcount}
          onChange={(e) => setMaxCount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
        <input type="number" placeholder="Minstay" value={minstay} onChange={(e) => setMinstay(e.target.value)} required />
        <input type="number" placeholder="Maxstay" value={maxstay} onChange={(e) => setMaxstay(e.target.value)} required />


        <input
          type="text"
          placeholder="Floor"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Amenities "
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rent Per Day"
          value={rentperday}
          onChange={(e) => setRentPerDay(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location "
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        {imageurl.map((url, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Image URL ${index + 1}`}
            value={url}
            onChange={(e) => handleImageUrlChange(index, e)}
            required
          />
        ))}<center>
          <button type="button" className="btn" onClick={addImageUrlField}>Add Image URL</button>&nbsp;&nbsp;&nbsp;

          <button className="btn" type="submit">Create Rooms  </button></center>
      </form>

      {/* Display entered image URLs */}
      <div className="image-preview">
        {imageurl.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Room Image ${index}`}
            onError={(e) => { e.target.src = ''; e.target.alt = 'Invalid URL'; }}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomForm;
