const mongoose = require('mongoose');


module.exports = Message = mongoose.model("Message", mongoose.Schema({
    /**
     * @每两个人之间对应一条数据-数据保存到数组里-若没有这条数据则新增
     * @findOneAndUpdate
     * */
    user: {
        type: Object,
        required: true,
    },
    receiver: {
        type: Object,
        required: true
    },
    messages: {
        type: Array,
        default: []
    },
}));
