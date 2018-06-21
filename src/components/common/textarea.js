import React from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
    width: ${props => props.full ? "100%" : "auto"};
    height: 200px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 10px;
`;
export default function(props) {
    return (
        <Textarea {...props} />
    );
}