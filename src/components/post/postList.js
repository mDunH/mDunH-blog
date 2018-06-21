import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routeName from "../../routes/routeName";
import Page from "../common/page";
import NoData from "../common/noData";
import { deleteItem } from "../../common/js/fetch-proxy";
import { getUserId } from "../../common/js/author";
import dateFormat from "../../common/js/dateFormat";
import { Config } from "../../common/js/config";
import api from "../../common/js/api";

const ListBox = styled.div`
    padding: 10px 0;
`;
const ListItem = styled(Link)`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin: 10px 0;
    display: block;
    transition: box-shadow .2s;
    position: relative;
    .title {
        font-size: 20px;
        color: #333;
    }
    &:hover {
        box-shadow: 4px 4px 4px #ddd;
        .title {
            color: ${Config.theme.color};
            text-decoration: underline;
        }
    }
    .info {
        font-size: 12px;
        color: #999;
        padding: 5px 0;
    }
    .content {
        font-size: 16px;
        color: #555;
    }
    .delete {
        color: red;
        position: absolute;
        right: 10px;
        top: 10px;
        &:hover {
            text-decoration: underline;
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
    deletePost = (event) => {
        event.preventDefault();
        deleteItem(api.post, {
            postId: this.props.data._id
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
        const data = this.props.data;
        if (!data) return null;
        return (
            <React.Fragment>
                {
                    this.state.remove ?
                        null
                        :
                        <ListItem to={`${routeName.PostDetail}/${data._id}`}>
                            <p className="title">{data.title}</p>
                            <div className="info">{`作者: ${data.userInfo ? data.userInfo[0].userName : "其他"}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`时间: ${dateFormat.second(data.date)}`}</div>
                            <pre className="content">{data.content}</pre>
                            {
                                this.props.data.userInfo[0]._id === getUserId() ?
                                    <span className="delete" onClick={this.deletePost}>删除</span>
                                    :
                                    null
                            }
                        </ListItem>
                }
            </React.Fragment>
        );
    }
}
export default function(props) {
    return (
        <React.Fragment>
            {
                props.tableList.length > 0 ?
                    <React.Fragment>
                        <ListBox>
                            {
                                props.tableList.map((item, i) => {
                                    return (<Item data={item} key={i} />);
                                })
                            }
                        </ListBox>
                        <Page pageChange={props.pageChange} totalSize={props.totalSize} pageSize={props.pageSize} pageIndex={props.pageIndex} />
                    </React.Fragment>
                    :
                    <NoData />
            }
        </React.Fragment>
    );
}