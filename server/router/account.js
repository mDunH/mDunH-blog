const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const { User } = require("../lib/mongo");
const resultSend = require("./resultSend");
const { jwtTokenSecret, routeName } = require("../config");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 登陆接口
router.post(routeName.account.login.path, (req, res, next) => {
    const token = jwt.sign({ userName: req.body.userName }, jwtTokenSecret, {});
    User.findOneAndUpdate({
        userName: req.body.userName,
        passWord: req.body.passWord
    }, { $set: { token: token } }).exec().then((success) => {
        console.log(success);
        if (success) {
            resultSend(res, "登陆成功！", {
                userName: success.userName,
                token: token,
                userId: success._id
            });
        } else
            resultSend(res, "用户名密码不匹配！", 11);
    }).catch((err) => {
        console.log(err);
        next("登陆失败！");
    });
});

// 注册接口
router.post(routeName.account.register.path, upload.single("portrait"), (req, res, next) => {
    console.log(req.file);
    const file = req.file;
    User.find({ userName: req.body.userName }).exec().then((result) => {
        console.log(result);
        if (result.length === 0) {
            const token = jwt.sign({ userName: req.body.userName }, jwtTokenSecret, {});
            const mime = file.mimetype.split("/")[1];
            User.create({ userName: req.body.userName, passWord: req.body.passWord, portrait: `uploads/${file.filename}.${mime}`, token: token }).then((response) => {
                fs.renameSync(`uploads/${file.filename}`, `uploads/${file.filename}.${mime}`);
                console.log(response)
                resultSend(res, "注册成功！", {
                    userName: response.userName,
                    token: response.token,
                    userId: response._id
                });
            }).catch((err) => {
                console.log(err);
                fs.unlinkSync(`uploads/${file.filename}`);
                next("注册失败！");
            });
        } else {
            fs.unlinkSync(`uploads/${file.filename}`);
            resultSend(res, "用户名已存在！", 12);
        }
    }).catch((error) => {
        console.log(error);
        fs.unlinkSync(`uploads/${file.filename}`);
        next("注册失败！");
    });
});

// 用户信息获取接口
router.get(routeName.account.userInfo.path, (req, res, next) => {
    console.log(req.query);
    User.findOne({ _id: req.query.userId }).exec().then((result) => {
        console.log(result);
        if (result) {
            resultSend(res, "获取成功！", {
                portrait: result.portrait,
                userName: result.userName,
                age: result.age,
                phone: result.phone
            });
        } else {
            resultSend(res, "找不到该用户！", 13);
        }
    }).catch((error) => {
        console.log(error);
        next("获取失败！");
    });
});

// 用户信息修改接口
router.post(routeName.account.userInfo.path, upload.single("portrait"), (req, res, next) => {
    console.log(req.file, req.body, req.get("Authorization"));
    const file = req.file;
    const params = req.body;
    let updateData = { age: params.age, phone: params.phone };
    if (file) {
        const mime = file.mimetype.split("/")[1];
        fs.renameSync(`uploads/${file.filename}`, `uploads/${file.filename}.${mime}`);
        updateData.portrait = `uploads/${file.filename}.${mime}`;
    }
    User.findOneAndUpdate({ token: req.get("Authorization") }, { $set: updateData }).exec().then((success) => {
        console.log(success);
        if (success) {
            resultSend(res, "修改成功！");
            if (file)
                fs.unlinkSync(success.portrait);
        } else {
            resultSend(res, "修改失败！", 14);
            if (file)
                fs.unlinkSync(`uploads/${file.filename}.${mime}`);
        }
    }).catch((err) => {
        next("修改失败！");
        console.log(err);
        if (file)
            fs.unlinkSync(`uploads/${file.filename}.${mime}`);
    });
});

// 修改密码接口
router.post(routeName.account.modifyPassWord.path, (req, res, next) => {
    console.log(req.body.token, req.get("Authorization"));
    User.findOneAndUpdate({ token: req.get("Authorization"), passWord: req.body.oldPassWord }, { $set: { passWord: req.body.newPassWord } }).exec().then((success) => {
        console.log(success);
        if (success)
            resultSend(res, "修改成功！");
        else
            resultSend(res, "修改失败！", 15);
    }).catch((err) => {
        console.log(err);
        next("修改失败！");
    });
});

module.exports = router;