const express = require("express");
const bodyParser = require("body-parser");
const filter = require("./filter");
const myRouter = require("./router");

const app = express();

// 静态文件
app.use("/uploads", express.static("uploads"));

// body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 处理跨域
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS")
        res.send("cors ok");
    else
        next();
});

// 过滤器
app.use(filter);

// 配置路由
app.use("/", myRouter);

// 错误处理
app.use((err, req, res, next) => {
    res.status(500).send("error: " + err);
});

const server = app.listen("2222", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("express listing at http://%s:%s", host, port);
});