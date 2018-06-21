export const Config =  {
    serviceUrl: process.env.NODE_ENV === "development" ? "http://localhost:2222/api" : "http://jianyh.cn:2222",
    pageSize: 10,
    theme: {
        color: "#409EFF",
        fontSize: "12px"
    }
}