import React from "react";
import { useHistory } from "react-router-dom";

import Button from '@mui/material/Button';

import brand from "../img/brand.png"

function Home() {
    const history = useHistory();

    return <div className="container-fluid">

        <h1 id="homeHeading">Record your <span className="elegant">"daily schedule" </span> here</h1>

        <Button variant="text" size="large" onClick={() => { history.push("/schedules"); }}>

            {/* <RemoveRedEyeSharpIcon style={{
                transform: "scale(2)", color: "#056676"
            }} fontSize="large" /> */}

            <img src={brand} id="scheduleImg" alt="brand-logo" />

        </Button>


    </div>
}

export default Home;