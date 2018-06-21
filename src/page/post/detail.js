import React from "react";
import styled from "styled-components";
import { get, post } from "../../common/js/fetch-proxy";
import api from "../../common/js/api";
import CommentList from "../../components/post/commentList";
import { Config } from "../../common/js/config";
import Textarea from "../../components/common/textarea";
import { SolidBtn } from "../../components/common/button";
import validate from "../../common/js/validate";
import dateFormat from "../../common/js/dateFormat";

const ContentBox = styled.div`
    padding: 15px 0;
    .title {
        font-size: 24px;
        text-align: center;
    }
    .info {
        font-size: 12px;
        color: #999;
        text-align: center;
        padding: 10px 0;
    }
    .content {
        font-size: 14px;
        text-indent: 2em;
        line-height: 1.4;
    }
`;
class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            userName: "",
            date: "",
            content: ""
        }
    }
    componentDidMount() {
        get(api.post, {
            id: this.props.postId
        }).then((res) => {
            console.log(res);
            this.setState({
                title: res.title,
                userName: res.userInfo[0].userName,
                date: res.date,
                content: res.content
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <ContentBox>
                <div className="title">{this.state.title}</div>
                <div className="info">
                    作者: {this.state.userName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 日期: {dateFormat.second(this.state.date)}
                </div>
                <div className="content">{this.state.content}</div>
            </ContentBox>
        );
    }
}

const CommentBox = styled.div`
    padding: 10px 0;
    .title {
        font-size: 18px;
        border-top: 1px solid #ddd;
        padding: 10px 20px;
    }
`;
class Comment extends React.Component {
    constructor() {
        super();
        this.pageSize = Config.pageSize;
        this.pageIndex = 1;
        this.state = {
            tableList: [],
            totalSize: 0,
            commentContent: ""
        }
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        get(api.comments, {
            postId: this.props.postId,
            pageSize: this.pageSize,
            pageIndex: this.pageIndex
        }).then((res) => {
            console.log(res);
            this.setState({
                tableList: res.list,
                totalSize: res.totalSize
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    pageChange = (index) => {
        this.pageIndex = index;
        this.getList();
    }
    changeContent = (e) => {
        this.setState({
            commentContent: e.target.value
        });
    }
    commit = () => {
        validate({
            postContent: this.state.commentContent
        }, () => {
            post(api.comment, {
                content: this.state.commentContent,
                postId: this.props.postId
            }).then((res) => {
                console.log(res);
                this.getList();
                this.setState({
                    commentContent: ""
                });
                alert("评论成功！");
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    render() {
        return (
            <CommentBox>
                <div className="title">评论</div>
                <CommentList tableList={this.state.tableList} pageChange={this.pageChange} totalSize={this.state.totalSize} pageSize={this.pageSize} pageIndex={this.pageIndex} />
                <Textarea placeholder="写点什么。。。" value={this.state.commentContent} onChange={this.changeContent} full />
                <SolidBtn onClick={this.commit} value="提 交" />
            </CommentBox>
        );
    }
}

class PostDetail extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Content postId={this.props.match.params.id} />
                <Comment postId={this.props.match.params.id} />
            </React.Fragment>
        );
    }
}
export default PostDetail;