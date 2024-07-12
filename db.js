const mongoose = require("mongoose");
const mongoURL = 'mongodb://localhost:27017/Guest-Room'
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
const connection = mongoose.connection
//callbaction function whether it is connecting to db
connection.on('error', () => {
    console.log("Mongo Db Connection failed")
})
connection.on('connected', () => {
    console.log("Mongo DB Connection Successful")
})
module.exports = mongoose;
