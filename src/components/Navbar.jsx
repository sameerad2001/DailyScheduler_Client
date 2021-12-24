import React from "react";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import brand from "../img/brand.png"

function Navbar() {
    return <div>

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

            <div className="navbar-brand">
                <Link to="/" className="link" >
                    <h3 id="brand"> <img src={brand} id="brandImg" alt="brand-logo" /> <span id="brandName">Daily Scheduler</span></h3>
                </Link>
            </div>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarGlobal">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarGlobal">
                <ul className="navbar-nav ms-auto mt-lg-0">

                    <li className="nav-item">
                        <span className="nav-link">
                            <Link to="/" className="link" > Home </Link>
                        </span>
                    </li>

                    <li className="nav-item">
                        <span className="nav-link">
                            <Link to="/schedules" className="link" > Schedules </Link>
                        </span>
                    </li>
                </ul>
            </div>

        </nav>

    </div>
}

export default Navbar;