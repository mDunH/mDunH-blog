import React from "react";
import styled from "styled-components";
import md5 from "md5";
import Input from "../../components/common/inputText";
import { SolidBtn } from "../../components/common/button";
import validate from "../../common/js/validate";
import { post } from "../../common/js/fetch-proxy";
import api from "../../common/js/api";
import { setLogout } from "../../common/js/author";

const ModifyBox = styled.div`
    width: 300px;
    margin: 50px auto;
    text-align: center;
`;
class ModifyPassWord extends React.Component {
    constructor() {
        super();
        this.state = {
            oldPassWord: "",
            newPassWord: "",
            againPassWord: ""
        }
    }
    changeState = (e) => {
        const tar = e.target;
        this.setState({
            [tar.name]: tar.value
        });
    }
    modify = () => {
        validate({
            password: this.state.oldPassWord
        }, () => {
            validate({
                password: this.state.newPassWord
            }, () => {
                if (this.state.oldPassWord === this.state.newPassWord) {
                    alert("新旧密码不能相同！");
                    return;
                }
                if (this.state.newPassWord !== this.state.againPassWord) {
                    alert("两次输入的新密码不一致！");
                    return;
                }
                post(api.modifyPassWord, {
                    oldPassWord: md5(this.state.oldPassWord),
                    newPassWord: md5(this.state.newPassWord)
                }).then((res) => {
                    console.log(res);
                    setLogout();
                    alert("修改成功！请重新登陆。");
                }).catch((err) => {
                    console.log(err);
                });
            });
        });
    }
    render() {
        return (
            <ModifyBox>
                <Input full type="password" placeholder="请输入旧密码" onChange={this.changeState} value={this.state.oldPassWord} name="oldPassWord" />
                <Input full type="password" placeholder="请输入新密码" onChange={this.changeState} value={this.state.newPassWord} name="newPassWord" />
                <Input full type="password" placeholder="请重复新密码" onChange={this.changeState} value={this.state.againPassWord} name="againPassWord" />
                <SolidBtn value="修 改" onClick={this.modify} />
            </ModifyBox>
        );
    }
}
export default ModifyPassWord;