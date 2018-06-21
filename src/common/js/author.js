import { accountLogin, accountLogout } from "../../redux/actions/accountLog";
import history from "../../routes/history";
import routeName from "../../routes/routeName";

const storage = sessionStorage;

function goDispatch(action) {
    return require("../../redux").default.dispatch(action);
}

export function setLogin(userId, userName, token) {
    storage.setItem("userId", userId);
    storage.setItem("userName", userName);
    storage.setItem("token", token);
    goDispatch(accountLogin);
    history.replace(routeName.home);
}

export function setLogout() {
    storage.removeItem("userId");
    storage.removeItem("userName");
    storage.removeItem("token");
    goDispatch(accountLogout);
    history.replace(routeName.login);
}

export function isLogin() {
    return !!storage.getItem("userId");
}

export function getUserId() {
    return storage.getItem("userId");
}

export function getUserName() {
    return storage.getItem("userName");
}

export function getToken() {
    return storage.getItem("token");
}