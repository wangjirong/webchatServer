const jwt = require('jsonwebtoken');
 function getEleToken(user) {
    return jwt.sign({
        _id: user._id,
        nickName:user.nickName,
        userName:user.userName,
        avatar:user.avatar
    }, require('../config/user_config').TokenPrivateKey, {
        expiresIn: '1h'
    });
}
module.exports = {
    getEleToken
}