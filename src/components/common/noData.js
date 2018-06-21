import React from "react";
import styled from "styled-components";

const Box = styled.div`
    font-size: 30px;
    text-align: center;
    padding: 50px 0;
    color: #333;
`;
export default function(props) {
    return (
        <Box>{props.value ? props.value : "没有数据！"}</Box>
    );
}