import React from "react";
import ReactDOM from "react-dom";
import { Main, Header, Footer } from "./components/App";
import "./main.scss";

/**
 *  Props
 *  contents inserted to DOM
 */
let formProps = {
    postURL: `https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth`
};

let doneBoxProps = {
    doneMsg: "You will be one of the first to experience Broccoli & Co. when we launch."
};

let mainProps = {
    className: "main-content",
    headingRows: ["A better way", "to enjoy every day."],
    content: "Be the first to know when we launch.",
    btnText: "Request an invite",
    formProps: formProps,
    doneProps: doneBoxProps
};


let headerProps = {
    className: "header-mid",
    headerTitleClass: "header-title",
    headerTitle: "Broccoli & Co."
};

let footerProps = {
    className: "footer-mid",
    pClass: "italic",
    contentRows: ["Made with \u2665 in Melbourne.",
        "\u00A9 " + new Date().getFullYear() + " Broccoli & Co. All rights reserved."]
};

ReactDOM.render(
    <Header {...headerProps} />,
    document.getElementById("header")
);

ReactDOM.render(
    <Main {...mainProps} />,
    document.getElementById("main")
);

ReactDOM.render(
    <Footer {...footerProps} />,
    document.getElementById("footer")
);