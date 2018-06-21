import React from "react";
import styled from "styled-components";
import { Config } from "../../common/js/config";

const Box = styled.div`
    padding: 10px 0;
    height: 44px;
    line-height: 24px;
`;
const Item = styled.button`
    display: inline-block;
    vertical-align: top;
    min-width: 24px;
    height: 100%;
    padding: 0 5px;
    text-align: center;
    border: 1px solid #999;
    color: #333;
    border-radius: 2px;
    cursor: pointer;
    margin: 0 5px;
    &:hover, &.on {
        border-color: ${Config.theme.color};
        background-color: ${Config.theme.color};
        color: #fff;
    }
`;
export default function(props) {
    const totalPage = Math.ceil(props.totalSize / props.pageSize);
    let pageArr = Array(totalPage).fill(0);
    return (
        <Box>
            <Item onClick={() => props.pageChange(props.pageIndex - 1)} disabled={props.pageIndex === 1}>上一页</Item>
            {
                pageArr.map((item, i) => {
                    return (<Item disabled={props.pageIndex === (i + 1)} onClick={() => props.pageChange(i + 1)} className={(i + 1) === props.pageIndex ? "on" : ""} key={i}>{i + 1}</Item>);
                })
            }
            <Item onClick={() => props.pageChange(props.pageIndex + 1)} disabled={props.pageIndex === totalPage}>下一页</Item>
            每页{props.pageSize}条，共{totalPage}页，{props.totalSize}条数据
        </Box>
    );
}