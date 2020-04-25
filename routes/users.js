const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/User');


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
            const {getEleToken} = require('../utils/user')
            const token = "Bearer" + getEleToken(user);
            res.status(200).send(token);
        } else
            res.status(403).send("密码错误");
    } else res.status(404).send("该账户不存在")
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
            else res.status(500).send("注册失败")
        })
    })
});
module.exports = router;
