import React from "react";
import styled from "styled-components";

const fullStyle = `
    width: 100%;
    display: block;
`;
const autoStyle = `
    vertical-align: middle;
`;
const InputText = styled.input`
    margin: 15px auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 30px;
    padding: 0 10px;
    ${props => props.full ? fullStyle : autoStyle};
`;

export default class extends React.Component {
    render() {
        return (
            <InputText {...this.props} />
        );
    }
}