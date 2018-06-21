import { combineReducers  } from "redux";

import { login } from "./login";
import { loading } from "./loading";

const reducers = combineReducers({
    login,
    loading
});
export default reducers;