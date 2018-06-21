import React from "react";
import styled from "styled-components";
import PostList from "../../components/post/postList";
import { getUserId } from "../../common/js/author";
import { Config } from "../../common/js/config";
import api from "../../common/js/api";
import { get } from "../../common/js/fetch-proxy";

const Title = styled.div`
    text-align: center;
    font-size: 24px;
    color: #333;
    padding: 20px 0 10px 0;
`;
export default class extends React.Component {
    constructor() {
        super();
        this.pageSize = Config.pageSize;
        this.pageIndex = 1;
        this.state = {
            tableList: [],
            totalSize: 0,
        }
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        let myParams = {
            userId: getUserId(),
            pageSize: this.pageSize,
            pageIndex: this.pageIndex
        }
        get(api.posts, myParams).then((res) => {
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
        this.getList(this.props.params);
    }

    render() {
        return (
            <React.Fragment>
                <Title>我的帖子</Title>
                <PostList tableList={this.state.tableList} pageChange={this.pageChange} totalSize={this.state.totalSize} pageSize={this.pageSize} pageIndex={this.pageIndex} />
            </React.Fragment>
        );
    }
}