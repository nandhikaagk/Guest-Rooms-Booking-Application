const express = require("express");
const router = express.Router();
const multer = require("multer");
const Room = require("../roommodels/rooms")
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({})
    res.send(rooms)
  }
  catch (error) {
    return res.status(400).json({ message: error });
  }
})
router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid
  try {
    const room = await Room.findOne({ _id: roomid })
    res.send(room)
  }
  catch (error) {
    return res.status(400).json({ message: error });
  }
})

router.post('/create', async (req, res) => {
  console.log(req.body); // Debugging
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).send({ message: 'Room created successfully', room });
  } catch (error) {
    console.error(error); // Debugging
    res.status(400).send({ error: error.message });
  }
});


router.post("/getdetailsbyownerid", async (req, res) => {
  const { houseownerid } = req.body;
  try {
    const rooms = await Room.find({ houseownerid })
    res.send(rooms)
  } catch (error) {
    console.error("Error fetching room details:", error.message)
    return res.status(400).json({ error: error.message })
  }
})
//update
router.put('/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoom);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
//delete
router.delete('/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
module.exports = router;
