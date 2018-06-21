const mongoose = require("mongoose");
const Config = require("../config");
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(Config.dbServer);

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    portrait: { type: String, required: true },
    token: { type: String, required: true },
    age: { type: String },
    phone: { type: String }
});
exports.User = mongoose.model("User", UserSchema);

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: ObjectId, required: true },
    date: { type: Number, required: true }
});
exports.Post = mongoose.model("Post", PostSchema);

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    postId: { type: ObjectId, required: true },
    userId: { type: ObjectId, required: true },
    date: { type: Number, required: true }
});
exports.Comment = mongoose.model("Comment", CommentSchema);