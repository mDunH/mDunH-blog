import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const store = createStore(
    rootReducer,
    composeWithDevTools(),
    compose(
        applyMiddleware(thunk, createLogger())
    )
);
if (module.hot) {
    module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer)
    })
}
export default store;