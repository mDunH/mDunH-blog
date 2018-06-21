import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import history from "./history";
import routeName from "./routeName";

import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Loading from "../components/common/loading";
import PostBtn from "../components/common/postBtn";

import HomeIndex from "../page/home";

import Login from "../page/account/login";
import Register from "../page/account/register";
import AccountInfo from "../page/account";
import ModifyPassWord from "../page/account/modifyPassWord";

import WritePost from "../page/post/write";
import PostDetail from "../page/post/detail";

const LayoutBox = styled.div`
    position: absolute;
    left: 0;
    top: 80px;
    width: 100%;
    bottom: 30px;
    overflow-y: auto;
    z-index: 1;
`;
class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <PostBtn {...this.props} />
                <LayoutBox>
                    <div className="myContainer">
                        <Switch>
                            <Route exact path={routeName.home} component={HomeIndex} />
                            <Route exact path={routeName.info} component={AccountInfo} />
                            <Route exact path={routeName.modify} component={ModifyPassWord} />
                            <Route exact path={routeName.writePost} component={WritePost} />
                            <Route exact path={`${routeName.PostDetail}/:id`} component={PostDetail} />
                            <Redirect to={routeName.home} />
                        </Switch>
                    </div>
                </LayoutBox>
            </React.Fragment>
        );
    }
}

export default (
    <Router history={history}>
        <React.Fragment>
            <Switch>
                <Route exact path={routeName.login} component={Login} />
                <Route exact path={routeName.register} component={Register} />
                <Route path="/" component={Layout} />
            </Switch>
            <Loading />
            <Footer />
        </React.Fragment>
    </Router>
);