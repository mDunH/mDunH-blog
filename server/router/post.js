const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const { User, Post, Comment } = require("../lib/mongo");
const resultSend = require("./resultSend");
const { routeName } = require("../config");
const router = express.Router();

// 获取帖子列表接口
router.get(routeName.posts.root.path, (req, res, next) => {
    console.log(req.query);
    const size = parseInt(req.query.pageSize) || 10;
    const index = parseInt(req.query.pageIndex) - 1 || 0;
    let data = {};
    if (req.query.title)
        data.title = { $regex: req.query.title }
    const paramsDate = parseInt(req.query.date, 10);
    if (paramsDate)
        data.date = { $gt: paramsDate - 1, $lt: paramsDate + 86400000 - 1 }
    if (req.query.userId)
        data.userId = new ObjectId(req.query.userId)
    Post.count(data).exec().then((count) => {
        console.log(count);
        Post.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $match: data
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $skip: index * size
            },
            {
                $limit: size
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    date: 1,
                    userInfo: {
                        userName: 1,
                        _id: 1
                    }
                }
            }
        ]).exec().then((result) => {
            console.log(result);
            resultSend(res, "获取成功！", {
                list: result,
                totalSize: count,
                pageIndex: index + 1,
                pageSize: size
            });
        }).catch((error) => {
            console.log(error);
            next("获取失败！");
        });
    }).catch((e) => {
        console.log(e);
        next("获取失败！");
    });
});

// 新建帖子接口
router.post(routeName.posts.post.path, (req, res, next) => {
    console.log(req.body, req.get("Authorization"));
    User.findOne({ token: req.get("Authorization") }).exec().then((result) => {
        console.log(result);
        if (result) {
            Post.create({
                userId: result._id,
                title: req.body.title,
                content: req.body.content,
                date: new Date().getTime()
            }).then((response) => {
                console.log(response);
                resultSend(res, "提交成功！");
            }).catch((error) => {
                console.log(error);
                next("提交失败！");
            });
        } else
            resultSend(res, "提交失败！", 20);
    }).catch((error) => {
        console.log(error);
        next("提交失败！");
    });
});

// 获取帖子详情接口
router.get(routeName.posts.post.path, (req, res, next) => {
    console.log(req.query);
    Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userInfo"
            }
        },
        {
            $match: {
                _id: new ObjectId(req.query.id)
            }
        },
        {
            $project: {
                title: 1,
                content: 1,
                date: 1,
                userInfo: {
                    userName: 1
                }
            }
        }
    ]).exec().then((result) => {
        console.log(result);
        if (result.length > 0)
            resultSend(res, "获取成功！", result[0]);
        else
            resultSend(res, "获取失败！", 21);
    }).catch((error) => {
        console.log(error);
        next("获取失败！");
    });
});

// 删除帖子接口
router.delete(routeName.posts.post.path, (req, res, next) => {
    console.log(req.body, req.get("Authorization"));
    User.findOne({
        token: req.get("Authorization")
    }).exec().then( async (result) => {
        console.log(result);
        let success = false;
        await Post.findOneAndRemove({
            userId: result._id,
            _id: req.body.postId
        }).exec().then((response) => {
            console.log(response);
            success = !!response;
        }).catch((err) => {
            console.log(err);
            next("删除失败！");
        });
        await Comment.remove({
            postId: req.body.postId
        }).exec().then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
        if (success)
            resultSend(res, "删除成功！");
        else
            resultSend(res,  "删除失败！", 22);
    }).catch((error) => {
        console.log(error);
        next("删除失败！");
    });
});

module.exports = router;