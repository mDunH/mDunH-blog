import React from "react";
import styled from "styled-components";
import routeName from "../../routes/routeName";
import { Config } from "../../common/js/config";

const PostBtnBox = styled.div`
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${Config.theme.color};
    cursor: pointer;
    color: #fff;
    text-align: center;
    line-height: 50px;
    z-index: 10;
    &:hover {
        opacity: .9;
    }
`;

export default function PostBtn(props) {
    const writePost = () => {
        props.history.push(routeName.writePost);
    }
    return (
        <PostBtnBox onClick={writePost}>发帖</PostBtnBox>
    );
}