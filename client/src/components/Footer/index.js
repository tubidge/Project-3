import React from "react";
import "./style.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <span className="repo-link">GoalDone
                    <span><a href="https://github.com/tubidge/Project-3">{" "}GitHub Repository</a></span>
                </span>
                <span className="contact-link"><a href="#">Contact the Team</a></span>
            </div>
        </footer>
    )
};

export default Footer;