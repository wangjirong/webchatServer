const Message = require('../model/Message');

class Mess {
    constructor(text, time) {
        this.text = text;
        this.time = time;
    }
}


function addMessage(user, receiver, message) {
    return new Promise((resolve, reject) => {
        Message.findOneAndUpdate({user, receiver}, {
            '$push': {
                message: new Mess(message, new Date())
            }
        }).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = {addMessage};