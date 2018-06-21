const express = require("express");
const accountRouter = require("./account");
const postRouter = require("./post");
const commentRouter = require("./comment");
const { routeName } = require("../config");
const router = express.Router();

router.use(routeName.account.path, accountRouter);
router.use(routeName.posts.path, postRouter);
router.use(routeName.comments.path, commentRouter);

module.exports = router;