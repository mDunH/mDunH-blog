import React from "react";
import ReactModal from "react-modal";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            show: true
        }
    }
    render() {
        return (
            <ReactModal
                isOpen={this.state.show}
                appElement={document.querySelector("body")}>
                <span>123</span>
            </ReactModal>
        )
    }
}