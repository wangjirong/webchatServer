const User = require('../model/User')
const jwt = require('jsonwebtoken');

function getEleToken(user) {
    return jwt.sign({
        _id: user._id,
        nickName: user.nickName,
        userName: user.userName,
        avatar: user.avatar
    }, require('../config/user_config').TokenPrivateKey, {
        expiresIn: '1h'
    });
}

/**
 * @根据用户ID查找用户
 * */
function getUserByID(_id) {
    return new Promise((resolve, reject) => {
        User.findOne({_id}).then(user => {
            resolve(user);
        }).catch(error => {
            reject(error);
        })
    })
}

/**
 * @根据用户ID查找到用户-然后将另一个用户添加到好友列表中
 * */
function addUserToFriendList(_id, user) {
    return new Promise(async (resolve, reject) => {
        const p_User = await getUserByID(_id);
        const friendList = p_User.friendList;
        friendList.push(user);
        User.update({_id}, {friendList: friendList}).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = {
    getUserByID,
    addUserToFriendList,
    getEleToken
}