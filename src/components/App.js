import React, { Component } from "react";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import DoneBox from "./DoneBox";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopup: false,
            isForm: false,
            popupClass: "popup-box hide"
        }
        this.handleClickRequest = this.handleClickRequest.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.showDoneBox = this.showDoneBox.bind(this);
    }

    handleClickRequest(event) {
        event.preventDefault();
        this.setState({
            isPopup: true,
            isForm: true,
            popupClass: "popup-box"
        });
    }

    handleClickClose() {
        this.setState({
            isPopup: false,
            isForm: false,
            popupClass: "popup-box hide"
        })
    }

    showDoneBox() {
        this.setState({
            isPopup: true,
            isForm: false, // hide form
            popupClass: "popup-box"
        })
    }

    render() {
        let popupContent = "";
        if (this.state.isPopup && this.state.isForm) {
            popupContent = <PostForm
                {...this.props.formProps}
                handleClickClose={this.handleClickClose}
                showDoneBox={this.showDoneBox}
            />
        } else if (this.state.isPopup && !this.state.isForm) {
            popupContent = <DoneBox
                {...this.props.doneProps}
                handleClickClose={this.handleClickClose}
            />
        }

        return (
            <div className={this.props.className}>
                {this.props.headingRows.map((item, index) =>
                    <h1 key={index}>{item}</h1>
                )}
                <p>{this.props.content}</p>
                <button className="btn-request" onClick={this.handleClickRequest}>Request an invite</button>
                <div className={this.state.popupClass}>
                    {popupContent}
                </div>
            </div>
        );
    }
}
Main.propTypes = {
    className: PropTypes.string,
    headingRows: PropTypes.array,
    content: PropTypes.string,
    formProps: PropTypes.object,
    doneProps: PropTypes.object
}

class Header extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <h2 className={this.props.headerTitleClass}>
                    {this.props.headerTitle}
                </h2>
            </div>
        );
    }
}
Header.propTypes = {
    className: PropTypes.string,
    headerTitleClass: PropTypes.string,
    headerTitle: PropTypes.string
}

class Footer extends Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.contentRows.map((item, index) =>
                    <p className={this.props.pClass} key={index}>
                        {item}
                    </p>
                )}
            </div>
        );
    }
}
Footer.propTypes = {
    className: PropTypes.string,
    pClass: PropTypes.string,
    contentRows: PropTypes.array
};

export { Main, Header, Footer };