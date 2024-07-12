const mongoose = require("mongoose");
const houseownerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    }
)
const houseownerModel = mongoose.model('houseowners', houseownerSchema)
module.exports = houseownerModel