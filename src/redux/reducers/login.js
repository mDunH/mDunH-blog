import { isLogin } from "../../common/js/author";

export function login(state, action) {
    switch(action.type) {
        case "ACCOUNT_LOGIN":
            return { state: true };
        case "ACCOUNT_LOGOUT":
            return { state: false };
        default:
            return { state: isLogin() };
    }
}