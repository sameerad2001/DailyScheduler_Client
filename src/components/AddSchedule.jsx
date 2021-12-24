import React, { useState } from "react";
import ReactDOM from 'react-dom'
import axios from 'axios'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';

function AddSchedule(props) {

    let [newSchedule, setNewSchedule] = useState({
        title: " ",
        obtained: " ",
        scheduleNumber: " ",
        details: " ",
        objectives: []
    })

    let [newObjective, setNewObjective] = useState({
        objective: "",
        isDone: false
    })

    let [isFirstLoad, setIsFirstLoad] = useState(true)

    if (isFirstLoad) {
        setIsFirstLoad(false);
        initNewSchedule()
    }

    function initNewSchedule() {
        var currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);

        setNewSchedule((preVal) => {
            return {
                ...preVal,
                obtained: currentDate,
                scheduleNumber: (props.numberOfSchedules + 1)
            }
        })
    }

    function createRows(ScheduleObjective, index) {
        return <tr key={index}>
            <td> {index + 1} </td>
            <td> {ScheduleObjective.objective} </td>
            <td> </td>
        </tr>
    }

    function createSchedule() {

        let baseURL = "http://localhost:5000/schedules";

        axios.post(baseURL, newSchedule)
            .then(res => {
                console.log(res.data)
                props.closeScheduleMaker();
            })
            .catch(err => {
                console.log(err)
            })
    }

    function addObjective() {
        setNewSchedule((preVal) => {
            return {
                ...preVal,
                objectives: [...preVal.objectives, newObjective]
            }
        })

        setNewObjective({
            objective: "",
            isDone: false
        })
    }

    return ReactDOM.createPortal(
        <div >
            <div className="overlay" />

            <div className="card  popup-card" >
                <div className={"card-body"}>

                    <h3> New daily schedule </h3>

                    <TextField
                        fullWidth
                        required
                        name="title"
                        margin="dense"
                        label="Title"
                        value={newSchedule.title}
                        onChange={(e) => {
                            let { name, value } = e.target
                            setNewSchedule((preVal) => {
                                return {
                                    ...preVal,
                                    [name]: value
                                }
                            })
                        }}
                    />

                    <br />

                    <TextareaAutosize
                        style={{ width: "100%", maxHeight: "10%" }}
                        aria-label="minimum height"
                        name="details"
                        minRows={3}
                        placeholder="Details"
                        maxRows={6}
                        value={newSchedule.details}
                        onChange={(e) => {
                            let { name, value } = e.target

                            setNewSchedule((preVal) => {
                                return {
                                    ...preVal,
                                    [name]: value
                                }
                            })
                        }}
                    />
                    <br />

                    <table className="table table-hover">

                        <thead >
                            <tr className="table-dark">
                                <th scope="col">#</th>
                                <th scope="col">Objectives</th>
                                <th scope="col">Add an objective</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td >#</td>
                                <td>
                                    <TextField
                                        required
                                        name="objective"
                                        label="Objective"
                                        margin="dense"
                                        value={newObjective.objective}
                                        onChange={(e) => {
                                            let { name, value } = e.target

                                            setNewObjective((preVal) => {
                                                return {
                                                    ...preVal,
                                                    [name]: value
                                                }
                                            })
                                        }}
                                    />
                                </td>
                                <td>
                                    <Button variant="text" size="large" color="success" onClick={addObjective}>
                                        <AddIcon style={{
                                            transform: "scale(1.2)"
                                        }} fontSize="large" />
                                    </Button>
                                </td>

                            </tr>

                            {newSchedule.objectives.map(createRows)}

                        </tbody>

                    </table>
                </div>

                <Stack direction="row" spacing={1}>
                    <Button variant="text" size="large" style={{ width: "50%" }} onClick={() => { props.closeScheduleMaker() }}>
                        <CloseIcon style={{
                            transform: "scale(1.2)", color: "#D83A56"
                        }} fontSize="large" />
                    </Button>

                    {"    "}

                    <Button variant="text" size="large" style={{ width: "50%" }} onClick={createSchedule}>
                        <NoteAddIcon style={{
                            transform: "scale(1.2)", color: "#056676"
                        }} fontSize="large" />
                    </Button>
                </Stack>

            </div>

        </div>, document.getElementById("portal"))
}

export default AddSchedule