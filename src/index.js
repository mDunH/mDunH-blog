import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import "./common/js/polyfill";
import routes from "./routes";
import store from "./redux";
import "./common/style";

ReactDOM.render((
    <Provider store={store}>
        {routes}
    </Provider>
), document.getElementById('root'));