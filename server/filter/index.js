const { User }  = require("../lib/mongo");
const resultSend = require("../router/resultSend");
const { ignoreFilterRoute } = require("../config");

// 过滤token
module.exports = (req, res, next) => {
    for (let i = 0; i < ignoreFilterRoute.length; i++) {
        if (req.path === ignoreFilterRoute[i].path && (!ignoreFilterRoute[i].method || req.method === ignoreFilterRoute[i].method)) {
            next();
            return;
        }
    }
    User.findOne({
        token: req.get("Authorization")
    }).exec().then((result) => {
        if (result)
            next();
        else
            resultSend(res, "token无效！", 999);
    }).catch((error) => {
        console.log(error);
        next("出错！");
    });
};