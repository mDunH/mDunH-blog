import React from "react";
import md5 from "md5";
import { post } from "../../common/js/fetch-proxy";
import LoginWrapp from "../../components/account/LoginWrapp";
import InputText from  "../../components/common/inputText";
import PortraitInput from "../../components/common/portraitBox";
import { SolidBtn } from "../../components/common/button";
import validate from "../../common/js/validate";
import { setLogin } from "../../common/js/author";
import api from "../../common/js/api";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            passWord: "",
            passWordAgain: "",
            portrait: null
        }
    }
    stateChange = (e) => {
        const tar = e.target;
        this.setState(() => ({
            [tar.name]: tar.value
        }));
    }
    fileChange = (files) => {
        this.setState(() => ({
            portrait: files[0]
        }));
    }
    action = () => {
        if (!this.state.portrait) {
            alert("请上传你的头像！");
            return;
        }
        validate({
            username: this.state.userName,
            password: this.state.passWord
        }, () => {
            if (this.state.passWord !== this.state.passWordAgain) {
                alert("两次输入的密码不匹配！");
                return;
            }
            let params = new FormData();
            params.append("userName", this.state.userName);
            params.append("passWord", md5(this.state.passWord));
            params.append("portrait", this.state.portrait);
            post(api.register, params).then((res) => {
                console.log(res);
                setLogin(res.userId, res.userName, res.token);
            }).catch((err) => {
                console.error(err);
            });
        });
    }
    render() {
        return (
            <LoginWrapp isRegister>
                <PortraitInput name="portrait" onChange={this.fileChange} />
                <InputText full name="userName" defaultValue={this.state.userName} type="text" onChange={this.stateChange} placeholder="用户名" />
                <InputText full name="passWord" defaultValue={this.state.passWord} type="password" onChange={this.stateChange} placeholder="密码" />
                <InputText full name="passWordAgain" type="password" onChange={this.stateChange} placeholder="请再次输入密码" />
                <SolidBtn onClick={this.action} value="注 册" full />
            </LoginWrapp>
        );
    }
}

export default Register;