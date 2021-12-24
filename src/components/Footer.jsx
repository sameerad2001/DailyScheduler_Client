import React from "react";

function Footer() {
    let currentYear = new Date().getFullYear();

    return <div className="footer">
        <a href="https://github.com/sameerad2001">
            &copy; <strong>Sameer Ahmed</strong> (sameerad2001@gmail.com) {currentYear}
        </a>
    </div>
}

export default Footer;