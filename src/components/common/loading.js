import React from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { Config } from "../../common/js/config";

const loadKeyframes = keyframes`
    0%, 100% {
        height: 40px;
        background: white;
    }
    50% {
        height: 70px;
        margin-top: -15px;
        margin-bottom: -15px;
        background: ${Config.theme.color};
    }
`
const LoadingBox = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 20;
    .loading {
        width: 80px;
        height: 40px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        span {
            display: inline-block;
            width: 8px;
            height: 100%;
            border-radius: 4px;
            background: white;
            margin-right: 8px;
            -webkit-animation: ${loadKeyframes} 1s ease infinite;
        }
        span:nth-child(2) {
            -webkit-animation-delay: 0.2s;
        }
        span:nth-child(3) {
            -webkit-animation-delay: 0.4s;
        }
        span:nth-child(4) {
            -webkit-animation-delay: 0.6s;
        }
        span:nth-child(5) {
            -webkit-animation-delay: 0.8s;
            margin-right: 0;
        }
    }
`;
function Loading(props) {
    console.log(props);
    return (
        <React.Fragment>
            {
                props.loading ?
                    <LoadingBox>
                        <div className="loading">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </LoadingBox>
                    :
                    null
            }
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(Loading);