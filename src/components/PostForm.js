import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

/**
 *  PostForm Component
 *  a request-invite POST form
 *  require: Main.showDoneBox(), Main.handleClickClose() @components/App.js
 */
class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                name: "",
                email: "",
                emailConfirmed: ""
            },
            formData: {
                name: "",
                email: "",
                emailConfirmed: ""
            },
            classes: {
                name: "",
                email: "",
                emailConfirmed: ""
            },
            errMsg: "",
            isSubmit: false,
            submitBtn: "Send"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Validate user input, e.g. name, email
    validateInput(target, fromInput) {
        const { name, value } = target;
        let errors = this.state.errors;
        let classes = this.state.classes;
        const validNameRegex = RegExp(/^[a-zA-Z ]{3,50}$/i);
        const validEmailRegex = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i);

        // Need no validation w/o input
        if (fromInput === true && value.trim().length == 0) {
            this.setState({
                classes: {
                    ...classes,
                    [name]: ""
                }
            });
            return;
        }
        // Validate fields by type
        switch (name) {
            case "name":
                if (validNameRegex.test(value.trim())) {
                    errors.name = "";
                    classes.name = "";
                } else {
                    errors.name = "Please enter at least 3 characters.";
                    classes.name = "input-error";
                }
                break;
            case "email":
                errors.email = "";
                errors.emailConfirmed = "";
                classes.email = "";
                classes.emailConfirmed = "";
                if (!validEmailRegex.test(value.trim())) {
                    errors.email = "Please enter a valid email address.";
                    classes.email = "input-error";
                    break;
                } else {
                    if (this.state.formData.emailConfirmed !== value.trim()) {
                        errors.emailConfirmed = "Two email addresses are not matched.";
                        classes.emailConfirmed = "input-error";
                    }
                }
                break;
            case "emailConfirmed":
                errors.emailConfirmed = "";
                classes.emailConfirmed = "";
                if (!validEmailRegex.test(value.trim())) {
                    errors.emailConfirmed = "Please enter a valid email address.";
                    classes.emailConfirmed = "input-error";
                } else {
                    if (this.state.formData.email !== value.trim()) {
                        errors.emailConfirmed = "Two email addresses are not matched.";
                        classes.emailConfirmed = "input-error";
                    }
                }
                break;
            default:
                break;
        }

        // Set state to display error messages and highlight inputs
        this.setState({
            errors: errors,
            classes: classes
        });
    }

    // Check if no error when submitting
    checkValidErrors(errObj) {
        let isValid = true;
        Object.values(errObj).map(value => {
            if (value !== "") {
                isValid = false;
            }
        });
        return isValid;
    }

    // Check if valid fields when submitting
    checkValidForm(formObj) {
        let isValid = true;
        Object.values(formObj).map(value => {
            if (value.length < 3) {
                isValid = false;
            }
        });
        return isValid;
    }

    // Combine checking methods
    isValidSubmit() {
        if (!this.checkValidErrors(this.state.errors)
            || !this.checkValidForm(this.state.formData)) {
            return false;
        }
        if (this.state.formData.email !== this.state.formData.emailConfirmed) {
            return false;
        }
        return true;
    }

    // Handle input field changes
    handleChange(event) {
        event.preventDefault();
        this.setState({
            errors: {
                ...this.state.errors,
                emailConfirmed: "",
                [event.target.name]: ""
            },
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value,
            }
        });
    }

    // Handle input field blurs
    handleBlur(event) {
        event.preventDefault();
        // Validate from blurred input field
        this.validateInput(event.target, true);
    }

    // Handle form submission
    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            isSubmit: true,
            submitBtn: "Sending, please wait...",
            errMsg: "",
        });
        // Validate from submit button
        event.target.querySelectorAll("input").forEach((el) => {
            this.validateInput(el, false);
        });
        // Check if good to send POST request
        if (!this.isValidSubmit()) {
            this.setState({ isSubmit: false, submitBtn: "Send" });
            return;
        } else {
            axios
                .post(this.props.postURL,
                    {
                        name: this.state.formData.name.trim(),
                        email: this.state.formData.email.trim()
                    })
                .then(res => {
                    if (res.status == 200) {
                        // Good to show DoneBox
                        this.props.showDoneBox();
                    }
                })
                .catch(err => {
                    let errData = err.response.data;
                    if (errData) {
                        this.setState({ errMsg: errData.errorMessage });
                    } else {
                        this.setState({ errMsg: "Error: unknown error. Please try again." });
                    }
                    this.setState({ isSubmit: false, submitBtn: "Send" });
                });
        }
    }

    render() {
        return (
            <div className="form-pane">
                <div className="btn-close" onClick={this.props.handleClickClose}>&times;</div>
                <form onSubmit={this.handleSubmit}>
                    <p className="form-title italic">Request an invite</p>
                    <div className="form-sep"></div>
                    <input type="text" className={this.state.classes.name} name="name" placeholder="Full Name" onChange={this.handleChange} onBlur={this.handleBlur} />
                    <div className="input-error input-name">{this.state.errors.name}</div>
                    <input type="email" className={this.state.classes.email} name="email" placeholder="Email" onChange={this.handleChange} onBlur={this.handleBlur} />
                    <div className="input-error input-email">{this.state.errors.email}</div>
                    <input type="email" className={this.state.classes.emailConfirmed} name="emailConfirmed" placeholder="Confirm email" onChange={this.handleChange} onBlur={this.handleBlur} />
                    <div className="input-error input-email-confirmed">{this.state.errors.emailConfirmed}</div>
                    <button type="submit" disabled={this.state.isSubmit}>{this.state.submitBtn}</button>
                    <div className="err-msg">{this.state.errMsg}</div>
                </form>
            </div>
        );
    }
}
PostForm.propTypes = {
    postURL: PropTypes.string,
    handleClickClose: PropTypes.func,
    showDoneBox: PropTypes.func
}

export default PostForm;