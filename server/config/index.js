const dbServer = "mongodb://127.0.0.1:27017/mDunH";
const jwtTokenSecret = "yuhui.jian@gtomato.com";
const routeName = {
    account: {
        path: "/account",
        login: { path: "/login" },
        register: { path: "/register" },
        userInfo: { path: "/userInfo" },
        modifyPassWord: { path: "/modifyPassWord" }
    },
    posts: {
        path: "/posts",
        root: { path: "/" },
        post: { path: "/post" }
    },
    comments: {
        path: "/comments",
        root: { path: "/" },
        comment: { path: "/comment" }
    }
};
const ignoreFilterRoute = [
    {
        path: routeName.account.path + routeName.account.login.path
    },
    {
        path: routeName.account.path + routeName.account.register.path
    },
    {
        path: routeName.posts.path,
        method: "GET"
    },
    {
        path: routeName.posts.path + routeName.posts.post.path,
        method: "GET"
    },
    {
        path: routeName.comments.path,
        method: "GET"
    }
];

module.exports = {
    dbServer,
    jwtTokenSecret,
    routeName,
    ignoreFilterRoute
}