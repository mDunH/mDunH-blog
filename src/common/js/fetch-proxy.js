import querystring from "query-string";
import { Config } from "./config";
import { setLogout, getToken } from "./author";
import { startLoading, endLoading } from "../../redux/actions/loadingChange";

function goDispatch(action) {
    return require("../../redux").default.dispatch(action);
}

export function get(url, data) {
    return setRequest(url, data, "GET");
}

export function post(url, data) {
    return setRequest(url, data, "POST");
}

export function put(url, data) {
    return setRequest(url, data, "PUT");
}

export function deleteItem(url, data) {
    return new Promise((res, rej) => {
        if (window.confirm("确定要删除吗？"))
            res();
        else
            rej("取消操作");
    }).then(res => {
        return setRequest(url, data, "DELETE");
    }, rej => {
        throw rej;
    }).catch(err => {
        throw err;
    });
}

function setRequest(url, data, method) {
    const headers = new Headers();
    headers.append("Authorization", getToken());
    if (!url.startsWith("http")) url = Config.serviceUrl + url;
    const myInit = {
        method
    };
    if (method === "GET") {
        url += `?${querystring.stringify(data)}`;
    } else {
        let sendData;
        if (data instanceof FormData) {
            sendData = data;
        } else {
            headers.append("Content-Type", "application/json; charset=utf-8");
            sendData = JSON.stringify(data);
        }
        myInit.body = sendData;
    }
    myInit.headers = headers;
    return action(url, myInit);
}

function action(url, init) {
    let myInit = new Request(url, init);
    let done = true;
    const showLoading = setTimeout(() => {
        done = false;
        goDispatch(startLoading);
    }, 200);
    return fetch(myInit).then(async d => {
        clearTimeout(showLoading);
        if (!done)
            goDispatch(endLoading);
        if (!d.ok) {
            let err = await d.text();
            throw new TypeError(err);
        }
        let response = await d.json();
        switch (response.status) {
            case 0:
                return response.detail;
            case 999:
                setLogout();
                throw response.message;
            default:
                throw response.message;
        }
    }).catch((err) => {
        if (!done)
            goDispatch(endLoading);
        alert(err);
        throw err;
    });
}