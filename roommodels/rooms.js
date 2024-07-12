const mongoose = require('mongoose');
const roomsSchema = mongoose.Schema({
    houseownerid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'houseowners'
    },
    name: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    amenities: [String],
    phone: {
        type: Number,
        required: true
    },
    rentperday: {
        type: Number,
        required: true
    },
    location: [String],
    imageurl: [String],
    curbooking: [
        {
            bookingid: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
            fromdate: { type: String },
            todate: { type: String },
            userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            status: { type: String },
            totalDays: { type: Number },
            totalAmount: { type: Number }
        }
    ],

    type: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    minstay: {
        type: Number,
        required: true
    },
    maxstay: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
})
const roomModel = mongoose.model('rooms', roomsSchema)
module.exports = roomModel

