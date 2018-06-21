import React from "react";
import styled from "styled-components";
import Input from "../../components/common/inputText";
import { SolidBtn } from "../../components/common/button";
import Textarea from "../../components/common/textarea";
import validate from "../../common/js/validate";
import { post } from "../../common/js/fetch-proxy";
import api from "../../common/js/api";
import routeName from "../../routes/routeName";

const WriteBox = styled.div`
    width: 800px;
    margin: 50px auto;
    text-align: center;
    .write-btn {
        margin-top: 20px;
    }
`;

class WritePost extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: ""
        }
    }
    changeState = (e) => {
        const tar = e.target;
        this.setState({
            [tar.name]: tar.value
        });
    }
    commit = () => {
        validate({
            postTitle: this.state.title,
            postContent: this.state.content
        }, () => {
            post(api.post, {
                title: this.state.title,
                content: this.state.content
            }).then((res) => {
                console.log(res);
                this.props.history.replace(routeName.home);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    render() {
        return (
            <WriteBox>
                <Input name="title" full type="text" placeholder="请输入标题" value={this.state.title} onChange={this.changeState} />
                <Textarea name="content" full placeholder="请输入正文" value={this.state.content} onChange={this.changeState} />
                <SolidBtn onClick={this.commit} className="write-btn" value="发 帖" />
            </WriteBox>
        );
    }
}
export default WritePost;