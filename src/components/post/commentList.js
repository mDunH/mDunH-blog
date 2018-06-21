import React from "react";
import styled from "styled-components";
import Page from "../../components/common/page";
import NoData from "../../components/common/noData";
import { Config } from "../../common/js/config";
import { deleteItem } from "../../common/js/fetch-proxy";
import api from "../../common/js/api";
import { getUserId } from "../../common/js/author";
import dateFormat from "../../common/js/dateFormat";

const Box = styled.div`
`;
const ListItem = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    .portrait {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #ddd;
        flex-shrink: 0;
    }
    .box {
        padding-left: 10px;
        position: relative;
        flex-grow: 1;
        .name {
            font-size: 14px;
            padding: 7px 0;
            span {
                font-size: 12px;
                padding: 0 10px;
                color: #999;
            }
        }
        .content {
            word-break: break-all;
            width: 100%;
        }
        .delete {
            position: absolute;
            cursor: pointer;
            color: red;
            top: 0;
            right: 0;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;
class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            remove: false
        }
    }
    deleteComment = () => {
        deleteItem(api.comment, {
            commentId: this.props.data._id
        }).then((res) => {
            console.log(res);
            this.setState({
                remove: true
            });
            alert("删除成功！");
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <React.Fragment>
                {
                    this.state.remove ?
                        null
                        :
                        <ListItem>
                            <img className="portrait" src={`${Config.serviceUrl}/${this.props.data.userInfo[0].portrait}`} alt="portrait" />
                            <div className="box">
                                <div className="name">
                                    {this.props.data.userInfo[0].userName}
                                    <span>{dateFormat.second(this.props.data.date)}</span>
                                </div>
                                <div className="content">{this.props.data.content}</div>
                                {
                                    this.props.data.userInfo[0]._id === getUserId() ?
                                        <span className="delete" onClick={this.deleteComment}>删除</span>
                                        :
                                        null
                                }
                            </div>
                        </ListItem>
                }
            </React.Fragment>
        );
    }
}
export default function CommentList(props) {
    return (
        <Box>
            {
                props.tableList.length > 0 ?
                    (
                        <React.Fragment>
                            {
                                props.tableList.map((item, i) => {
                                    return <Item data={item} key={i} />
                                })
                            }
                            <Page pageChange={props.pageChange} totalSize={props.totalSize} pageSize={props.pageSize} pageIndex={props.pageIndex} />
                        </React.Fragment>
                    )
                    :
                    <NoData value="还没有评论！" />
            }
        </Box>
    );
}