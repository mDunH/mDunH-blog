import React from "react";
import styled from "styled-components";
import PortraitInput from "../../components/common/portraitBox";
import Input from "../../components/common/inputText";
import { SolidBtn, HollowBtn } from "../../components/common/button";
import routeName from "../../routes/routeName";
import { get, post } from "../../common/js/fetch-proxy";
import api from "../../common/js/api";
import { getUserId } from "../../common/js/author";
import validate from "../../common/js/validate";

const MineBox = styled.form`
    text-align: center;
    .item {
        position: relative;
        padding-left: 50px;
        label {
            position: absolute;
            left: 0;
            top: 50%;
            width: 50px;
            text-align: left;
            line-height: 20px;
            margin-top: -10px;
        }
    }
`;
class Mine extends React.Component {
    constructor() {
        super();
        this.state = {
            modify: false,
            userName: "",
            age: "",
            phone: "",
            portrait: ""
        }
    }
    componentDidMount() {
        get(api.userInfo, {
            userId: getUserId()
        }).then(res => {
            console.log(res);
            this.setState({
                userName: res.userName,
                age: res.age || "",
                phone: res.phone || "",
                portrait: res.portrait
            });
        }).catch(err => {
            console.log(err);
        });
    }
    changeState = (e) => {
        const tar = e.target;
        this.setState({
            [tar.name]: tar.value
        });
    }
    modify = () => {
        this.setState((preValue) => ({
            modify: !preValue.modify
        }));
    }
    fileChange = (files) => {
        console.log(files)
        this.portraitFiles = files;
    }
    save = () => {
        const formData = new FormData(this.form);
        console.log(this.portraitFiles)
        if (this.portraitFiles.length > 0)
            formData.append("portrait", this.portraitFiles[0]);
        validate({
            age: this.state.age,
            phone: this.state.phone
        }, () => {
            post(api.userInfo, formData).then(res => {
                console.log(res);
                alert("修改成功！");
                this.setState({
                    modify: false
                });
            }).catch(err => {
                console.log(err);
            });
        });
    }
    changePassWord = () => {
        this.props.history.push(routeName.modify);
    }
    render() {
        return (
            <MineBox encType="multipart/form-data" innerRef={e => this.form = e}>
                <PortraitInput onChange={this.fileChange} src={this.state.portrait} disabled={!this.state.modify} />
                <div className="item">
                    <label>用户名</label>
                    <Input type="text" full disabled value={this.state.userName} />
                </div>
                <div className="item">
                    <label>年龄</label>
                    <Input name="age" type="number" onChange={this.changeState} full disabled={!this.state.modify} value={this.state.age} />
                </div>
                <div className="item">
                    <label>手机号</label>
                    <Input name="phone" type="number" onChange={this.changeState} full disabled={!this.state.modify} value={this.state.phone} />
                </div>
                {
                    !this.state.modify ?
                    (<HollowBtn value="修改信息" onClick={this.modify} />)
                    :
                    (<SolidBtn value="保存修改" onClick={this.save} />)
                }
                <HollowBtn color="#ea7474" value="修改密码" onClick={this.changePassWord} />
            </MineBox>
        );
    }
}

export default Mine;