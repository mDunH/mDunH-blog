import React from "react";
import styled from "styled-components";
import { Config } from "../../common/js/config";
import ImgCompress from "./imgCompress";
import defaultPortrait from "../../common/images/defaultPortrait.png";

const PortraitBox = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 1;
    .imgBox {
        width: 100%;
        height: 100%;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
        }
        .defaultImg {
            position: static;
        }
    }
    .portraitBox {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 2;
        cursor: pointer;
    }
`;
export default class extends React.Component {
    constructor() {
        super();
        this.fileList = [];
        this.state = {
            imgList: []
        }
    }
    getImgs = (imgs) => {
        console.log(imgs);
        this.setState({
            imgList: imgs
        });
    }
    getFiles = (files) => {
        console.log(files);
        this.fileList = files;
        this.props.onChange(files);
    }
    render() {
        return (
            <PortraitBox>
                <div className="imgBox">
                    <img className="defaultImg" src={this.props.src ? `${Config.serviceUrl}/${this.props.src}` : defaultPortrait} alt="default portrait" />
                    {
                        this.state.imgList.map((item, i) => {
                            return <img src={item} alt="portrait" key={i} />
                        })
                    }
                </div>
                <ImgCompress
                    className="portraitBox"
                    getImgs={this.getImgs}
                    getFiles={this.getFiles}
                    disabled={this.props.disabled}
                    maxSize={1048576} />
            </PortraitBox>
        );
    }
}