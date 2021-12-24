import React, { useState } from "react";
import ReactDOM from "react-dom"
import axios from 'axios'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

function FilterSchedule(props) {

    let [query, setQuery] = useState({
        title: " ",
        scheduleNumber: "",
        obtained: "",
    })

    return ReactDOM.createPortal(
        <div>
            <div className="overlay" />

            <div className="card  popup-card" >
                <div className={"card-body"}>

                    <h3> I want schedules(s) based on the .... </h3>

                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            name="title"
                            margin="dense"
                            label="Title"
                            value={query.title}
                            onChange={(e) => {
                                let { name, value } = e.target
                                setQuery((preVal) => {
                                    return {
                                        ...preVal,
                                        [name]: value
                                    }
                                })
                            }}
                        />

                        <Button variant="text" size="large" onClick={() => {
                            if (query.title !== "")
                                props.findByTitle(query.title)
                        }}>
                            <SearchIcon color="active" fontSize="large" />
                        </Button>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            required
                            name="scheduleNumber"
                            margin="dense"
                            type="Number"
                            label="Number"
                            value={query.scheduleNumber}
                            onChange={(e) => {
                                let { name, value } = e.target
                                setQuery((preVal) => {
                                    return {
                                        ...preVal,
                                        [name]: value
                                    }
                                })
                            }}
                        />

                        <Button variant="text" size="large" onClick={() => {
                            if (query.scheduleNumber !== "")
                                props.findByScheduleNumber(query.scheduleNumber)
                        }}>
                            <SearchIcon color="active" fontSize="large" />
                        </Button>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            required
                            name="obtained"
                            margin="dense"
                            type="Date"
                            helperText="Date when the schedule(s) was made"
                            value={query.obtained}
                            onChange={(e) => {
                                let { name, value } = e.target
                                setQuery((preVal) => {
                                    return {
                                        ...preVal,
                                        [name]: value
                                    }
                                })
                            }}
                        />

                        <Button variant="text" size="large" onClick={() => {

                            let queryDate = new Date(query.obtained)
                            queryDate.setHours(0);
                            queryDate.setMinutes(0);
                            queryDate.setSeconds(0);

                            console.log(queryDate)

                            if (query.obtained !== "")
                                props.findByDate(queryDate)
                        }}>
                            <SearchIcon color="active" fontSize="large" />
                        </Button>
                    </Stack>

                </div>
                <Button variant="text" size="large" onClick={() => { props.closeFilterSchedule() }}>
                    Find all &nbsp; <AllInclusiveIcon color="active" fontSize="large" />
                </Button>
            </div>
        </div>, document.getElementById("portal"))

}

export default FilterSchedule;