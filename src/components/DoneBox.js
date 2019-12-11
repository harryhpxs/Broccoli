import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 *  DoneBox Component
 *  a "Done" modal displayed after finishing form submission
 *  require: Main.handleClickClose() @components/App.js
 */
class DoneBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="done-pane">
                <p className="form-title italic">All done!</p>
                <div className="form-sep"></div>
                <p className="done-msg">{this.props.doneMsg}</p>
                <div className="btn-done" onClick={this.props.handleClickClose}>OK</div>
            </div>
        )
    }
}

DoneBox.propTypes = {
    doneMsg: PropTypes.string,
    handleClickClose: PropTypes.func
}

export default DoneBox;