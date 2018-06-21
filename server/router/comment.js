const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const { User, Post, Comment } = require("../lib/mongo");
const resultSend = require("./resultSend");
const { routeName } = require("../config");
const router = express.Router();

// 获取文章评论列表
router.get(routeName.comments.root.path, (req, res, next) => {
    console.log(req.query);
    const size = parseInt(req.query.pageSize) || 10;
    const index = parseInt(req.query.pageIndex) - 1 || 0;
    Comment.count({
        postId: new ObjectId(req.query.postId)
    }).exec().then((count) => {
        console.log(count);
        Comment.aggregate([
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
                    postId: new ObjectId(req.query.postId)
                }
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
                    content: 1,
                    date: 1,
                    userInfo: {
                        userName: 1,
                        portrait: 1,
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
        }).catch((err) => {
            console.log(err);
            next("获取失败！");
        });
    }).catch((error) => {
        console.log(error);
        next("获取失败！");
    });
});

// 创建评论
router.post(routeName.comments.comment.path, (req, res, next) => {
    console.log(req.body, req.get("Authorization"));
    const params = req.body;
    User.findOne({
        token: req.get("Authorization")
    }).exec().then((result) => {
        console.log(result);
        Comment.findOne({
            userId: new ObjectId(result._id),
            postId: new ObjectId(params.postId)
        }).exec().then((response) => {
            console.log(response);
            if (!response) {
                Comment.create({
                    content: params.content,
                    postId: params.postId,
                    userId: result._id,
                    date: new Date().getTime()
                }).then((r) => {
                    console.log(r);
                    resultSend(res, "评论成功！");
                }).catch((e) => {
                    console.log(e);
                    next("评论失败！");
                });
            } else
                resultSend(res, "只能评论一次！", 30);
        }).catch((err) => {
            console.log(err);
            next("评论失败！");
        });
    }).catch((error) => {
        console.log(error);
        next("评论失败！");
    });
});

// 删除评论
router.delete(routeName.comments.comment.path, (req, res, next) => {
    console.log(req.body, req.get("Authorization"));
    User.findOne({
        token: req.get("Authorization")
    }).exec().then((result) => {
        console.log(result);
        Comment.findOneAndRemove({
            userId: new ObjectId(result._id),
            _id: new ObjectId(req.body.commentId)
        }).exec().then((response) => {
            console.log(response);
            resultSend(res, "删除成功！", response);
        }).catch((err) => {
            console.log(err);
            next("删除失败！");
        });
    }).catch((error) => {
        console.log(error);
        next("删除失败！");
    });
});

module.exports = router;