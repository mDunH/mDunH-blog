import React from "react";
import styled from "styled-components";
import { Config } from "../../common/js/config";

const FooterBox = styled.footer`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background-color: ${Config.theme.color};
    z-index: 10;
`;
export default function(props) {
    return (
        <FooterBox>粤ICP备17118852号-1</FooterBox>
    );
}