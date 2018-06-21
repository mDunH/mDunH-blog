import React from "react";
import styled from "styled-components";
import { setTheme } from "../../common/style/theme";

const fullStyle = `
    width: 100%;
    display: block;
`;
const autoStyle = `
    width: auto;
    vertical-align: middle;
    padding-left: 15px;
    padding-right: 15px;
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
`;
const Btn = styled.input.attrs({ type: "button" })`
    margin-top: 0;
    margin-bottom: 0;
    line-height: 30px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    border: 1px solid ${props => setTheme(props.color, "color")};
    ${props => props.full ? fullStyle : autoStyle};
`;

const Solid = Btn.extend`
    background-color: ${props => setTheme(props.color, "color")};
    color: #fff;
    &:hover {
        opacity: .9;
    }
`;

const Hollow = Btn.extend`
    background-color: #fff;
    color: ${props => setTheme(props.color, "color")};
    &:hover {
        background-color: ${props => setTheme(props.color, "color")};
        color: #fff;
    }
`;

export function SolidBtn(props) {
    return (
        <Solid {...props} />
    );
}

export function HollowBtn(props) {
    return (
        <Hollow {...props} />
    );
}