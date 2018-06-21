import React from "react";
import md5 from "md5";
import { post } from "../../common/js/fetch-proxy";
import LoginWrapp from "../../components/account/LoginWrapp";
import InputText from  "../../components/common/inputText";
import { SolidBtn } from "../../components/common/button";
import validate from "../../common/js/validate";
import { setLogin } from "../../common/js/author";
import api from "../../common/js/api";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            passWord: ""
        }
    }
    stateChange = (e) => {
        const tar = e.target;
        this.setState(() => ({
            [tar.name]: tar.value
        }));
    }
    action = () => {
        validate({
            username: this.state.userName,
            password: this.state.passWord
        }, () => {
            let params = {
                userName: this.state.userName,
                passWord: md5(this.state.passWord)
            };
            post(api.login, params).then((res) => {
                console.log(res);
                setLogin(res.userId, res.userName, res.token);
            }).catch((err) => {
                console.error(err);
            });
        });
    }
    render() {
        return (
            <LoginWrapp>
                <InputText full name="userName" defaultValue={this.state.userName} type="text" onChange={this.stateChange} placeholder="用户名" />
                <InputText full name="passWord" defaultValue={this.state.passWord} type="password" onChange={this.stateChange} placeholder="密码" />
                <SolidBtn onClick={this.action} value="登 陆" full />
            </LoginWrapp>
        );
    }
}

export default Login;