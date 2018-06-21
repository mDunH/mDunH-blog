import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Input from "../../components/common/inputText";
import { SolidBtn, HollowBtn } from "../../components/common/button";
import PostList from "../../components/post/postList";
import dateFormat from "../../common/js/dateFormat";
import { Config } from "../../common/js/config";
import api from "../../common/js/api";
import { get } from "../../common/js/fetch-proxy";
import CommentModal from "../../components/common/commentModal";

const SearchBox = styled.div`
    padding: 0 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 15px 0;
    .title {
        font-size: 18px;
        border-bottom: 1px solid #ddd;
        padding: 15px 0;
    }
    .content {
        padding: 15px 0;
        text-align: center;
        &>* {
            margin: 0 10px;
        }
        .inputItem {
            display: inline-block;
            vertical-align: top;
        }
    }
`;
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            listTitle: "",
            listDate: null
        }
    }
    changeValue = (e) => {
        const tar = e.target;
        this.setState({
            [tar.name]: tar.value
        });
    }
    resetParams = () => {
        this.setState({
            listTitle: "",
            listDate: null
        });
    }
    handleChange = (e) => {
        this.setState({
            listDate: e
        });
    }
    render() {
        return (
            <SearchBox>
                <div className="title">筛选</div>
                <div className="content">
                    <div className="inputItem">
                        <Input name="listTitle" type="text" onChange={this.changeValue} value={this.state.listTitle} placeholder="标题" />
                    </div>
                    <div className="inputItem">
                        <DatePicker selected={this.state.listDate} onChange={this.handleChange} dateFormat="YYYY/MM/DD" todayButton={"今天"} placeholderText="日期" customInput={<Input />} isClearable={true}  />
                    </div>
                    <div className="btnItem">
                        <SolidBtn value="筛 选" onClick={() => this.props.changeParams(this.state.listTitle, this.state.listDate === null ? "" : `${this.state.listDate._d.getFullYear()}-${this.state.listDate._d.getMonth() + 1}-${this.state.listDate._d.getDate()}`)} />
                        <HollowBtn value="清 空" onClick={this.resetParams} />
                    </div>
                </div>
            </SearchBox>
        );
    }
}

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.pageSize = Config.pageSize;
        this.pageIndex = 1;
        this.title = "";
        this.date = "";
        this.state = {
            tableList: [],
            totalSize: 0,
        }
    }
    componentDidMount() {
        this.getList();
    }
    changeParams = (title, date) => {
        console.log(title, date)
        this.title = title;
        this.date = date;
        this.pageIndex = 1;
        this.getList();
    }
    getList = () => {
        let myParams = {
            title: this.title,
            date: this.date ? dateFormat.dateToTime(this.date) : "",
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
                <Search changeParams={this.changeParams} />
                <PostList tableList={this.state.tableList} pageChange={this.pageChange} totalSize={this.state.totalSize} pageSize={this.pageSize} pageIndex={this.pageIndex} />
                <CommentModal />
            </React.Fragment>
        );
    }
}