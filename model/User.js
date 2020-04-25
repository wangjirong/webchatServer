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
    avatar: {
        type: String,
        default: "https://erics-bucket.oss-cn-beijing.aliyuncs.com/WebChat/Avatar/avatar.jpg"
    },
    friendList: {
        type: Array,
        default: []
    },
    groupList: {
        type: Array,
        default: []
    },
    createdTime: {
        type: Date,
        default: new Date()
    }
}))
