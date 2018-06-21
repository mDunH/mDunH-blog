import { injectGlobal } from "styled-components";
import { Config } from "../js/config";

injectGlobal`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-style: normal;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    fieldset, img {
        vertical-align: top;
        max-width: 100%;
    }
    ol, ul {
        list-style: none;
    }
    .clearfix:after {
        visibility: hidden;
        font-size: 0;
        display: block;
        height: 0;
        clear: both;
        content: "";
    }
    input, textarea, select {
        -webkit-appearance: none;
        font-size: ${Config.theme.fontSize};
    }
    .autobox {
        text-align: center;
        font-size: 0;
        & > * {
            display: inline-block;
            font-size: ${Config.theme.fontSize};
            vertical-align: middle;
        }
        &:after {
            display: inline-block;
            height: 100%;
            width: 0;
            vertical-align: middle;
            visibility: hidden;
            content: "";
        }
    }
    body {
        font-size: ${Config.theme.fontSize};
        font-family: "微软雅黑", "宋体", "Arial Narrow", Helvetica, sans-serif;
        color: #000;
        line-height: 1.2;
        text-align: left;
    }
    a {
        text-decoration: none;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-track-piece {
        background-color: #ccc;
        -webkit-border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:vertical {
        height: 5px;
        background-color: #999;
        -webkit-border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:horizontal {
        width: 5px;
        background-color: #ccc;
        -webkit-border-radius: 6px;
    }

    .myContainer{
        max-width: 1000px;
        margin: 0 auto;
        &:after {
            visibility: hidden;
            font-size: 0;
            display: block;
            height: 0;
            clear: both;
            content: "";
        }
    }
`