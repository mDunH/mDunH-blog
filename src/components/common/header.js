import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../../common/style/theme";
import { getUserName, setLogout } from "../../common/js/author";
import routeName from "../../routes/routeName";

const Header = styled.header`
    width: 100%;
    left: 0;
    top: 0;
    height: 80px;
    line-height: 80px;
    color: #fff;
    background-color: ${props => setTheme(props.color, "color")};
    position: fixed;
    z-index: 10;
    .link {
        color: #fff;
        &:hover {
            text-decoration: underline;
        }
    }
`;
const Headerleft = styled.div`
    float: left;
    font-size: 24px;
`;
const HeaderRight = styled.div`
    float: right;
    font-size: 0;
    &>* {
        color: #fff;
        display: inline-block;
        vertical-align: top;
        padding: 0 10px;
        cursor: pointer;
        font-size: 16px;
        line-height: 24px;
        margin: 28px 0;
        &:hover {
            text-decoration: underline;
        }
    }
`;

function HeaderComponent(props) {
    return (
        <Header>
            <div className="myContainer">
                <Headerleft><Link className="link" to={routeName.home}>欢迎来到！</Link></Headerleft>
                <HeaderRight>
                    {
                        props.state ?
                            (<React.Fragment>
                                <Link to={routeName.info}>欢迎你：{getUserName()}</Link>
                                <span onClick={setLogout}>退出</span>
                            </React.Fragment>)
                            :
                            <React.Fragment>
                                <Link to={routeName.login}>登陆</Link>
                                <Link to={routeName.register}>注册</Link>
                            </React.Fragment>
                    }
                </HeaderRight>
            </div>
        </Header>
    );
}

const mapStateToProps = (state) => {
    return state.login
}
export default connect(mapStateToProps)(HeaderComponent);