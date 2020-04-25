const mongoose = require('mongoose');
module.exports = User = mongoose.model("User", mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: new Date()
    }
}))
