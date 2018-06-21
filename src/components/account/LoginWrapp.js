import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routeName from "../../routes/routeName";

const LoginBox = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
`;
const LoginForm = styled.form`
    width: 400px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
`;

const LoginLink = styled(Link)`
    display: inline-block;
    margin-top: 10px;
`;

function LoginWrapp(props) {
    return (
        <LoginBox className="autobox">
            <LoginForm encType="multipart/form-data">
                {props.children}
                <LoginLink to={props.isRegister ? routeName.login : routeName.register}>{ props.isRegister ? "登 陆" : "注 册" }</LoginLink>
            </LoginForm>
        </LoginBox>
    );
}
export default LoginWrapp;