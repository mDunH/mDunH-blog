import React from "react";
import styled from "styled-components";
import MyPost from "./myPost";
import Mine from "./mine";

const Box = styled.div`
    display: flex;
    padding: 20px 0;
    .mine {
        width: 250px;
        padding-right: 20px;
        flex-shrink: 0;
    }
    .myPost {
        flex-grow: 1;
    }
`;
export default function(props) {
    return (
        <Box>
            <div className="mine"><Mine {...props} /></div>
            <div className="myPost"><MyPost /></div>
        </Box>
    );
}