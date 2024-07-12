
const express = require("express");
const router = express.Router();
const Booking = require("../roommodels/booking");
const Room = require('../roommodels/rooms');

router.post("/bookroom", async (req, res) => {
  const {
    room,
    userid,
    fromdate,
    todate,
    totalAmount,
    totalDays,
    transactionId
  } = req.body;

  try {
    if (!totalAmount || !totalDays) {
      throw new Error('Total amount and total days are required');
    }

    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalAmount,
      totalDays,
      transactionId,
      status: 'booked'
    });

    const booking = await newBooking.save();
    const roomtemp = await Room.findOne({ _id: room._id });

    if (!roomtemp) {
      throw new Error("Room not found");
    }

    roomtemp.curbooking.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: booking.status,
      totalDays: totalDays,
      totalAmount: totalAmount
    });

    await roomtemp.save();

    res.status(201).json({ message: 'Room booked successfully', booking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(400).json({ error: error.message });
  }
});
router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid
  try {
    const bookings = await Booking.find({ userid: userid })
    res.send(bookings)
  }
  catch (error) {
    return res.status(400).json({ error })
  }
})
router.post('/cancelbooking', async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {

    const booking = await Booking.findById(bookingid);
    if (booking) {
      booking.status = 'cancelled';
      await booking.save();


      const room = await Room.findById(roomid);
      if (room) {
        room.curbooking = room.curbooking.filter(b => b.bookingid.toString() !== bookingid);
        await Room.updateOne({ _id: roomid }, { curbooking: room.curbooking });
        res.status(200).json({ message: 'Booking cancelled successfully' });
      }
      else
      {
        res.status(404).json({ message: 'Room not found' });
      }
    } 
    else
     {
      res.status(404).json({ message: 'Booking not found' });
     }
  }
   catch (error) {
    console.error('Error cancelling booking:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
