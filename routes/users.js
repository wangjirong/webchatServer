const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/User');
const {getUserByID, addUserToFriendList, getEleToken} = require('../utils/user');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
//登录
router.post('/login', async (req, res, next) => {
    const user = await User.findOne({nickName: req.body.nickName});
    if (user) {
        const isRight = await bcrypt.compareSync(req.body.password, user.password);
        if (isRight) {
            const token = "Bearer" + getEleToken(user);
            res.status(200).send(token);
        } else
            res.status(211).send("密码错误");
    } else res.status(222).send("该账户不存在")
});
//注册
router.post('/register', async (req, res, next) => {
    const password = req.body.password;
    bcrypt.genSalt(10, async (error, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const user = new User({
                userName: req.body.userName,
                nickName: req.body.nickName,
                password: hash
            }).save();
            if (user) res.status(200).send("注册成功");
            else res.status(211).send("注册失败")
        })
    })
});

//根据账号查找用户
router.get('/searchPerson', async (req, res, next) => {
    const nickName = req.query.nickName;
    const user = await User.findOne({nickName});
    if (user) res.status(200).send({
        _id: user._id,
        userName: user.userName,
        nickName: user.nickName,
        avatar: user.avatar
    });
    else res.status(211).send("没有找到！");
});

//添加好友
router.post('/addFriend', async (req, res, next) => {
    const {id, to_id} = req.body;
    /**
     *@将两个账号分别添加进对方的好友列表中
     * */

    const user = await getUserByID(id);
    const toUser = await getUserByID(to_id);
    const flag1 = await addUserToFriendList(id, toUser);
    const flag2 = await addUserToFriendList(to_id, user);
    if (flag1 && flag2)
        res.status(200).send("success");
})


//获取好友列表
router.get('/friendList', async (req, res, next) => {
    const _id = req.query._id;
    const user = await getUserByID(_id);
    if (user) res.status(200).send(user.friendList);
    else res.status(211).send([]);
})

module.exports = router;
