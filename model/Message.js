const mongoose = require('mongoose');
module.exports = Message = mongoose.model("Message", mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    message:{
        type:String,
        required: true
    },
    time:{
        type:Date,
        default:new Date(),
    }
}))
