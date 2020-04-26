const mongoose = require('mongoose');
module.exports = Message = mongoose.model("Message", mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: new Date(),
    }
}));
