import React, { useState } from "react";
import ReactDOM from "react-dom"
import axios from 'axios'

import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

function EditSchedule(props) {

    let [schedule, setSchedule] = useState(props.schedule)

    let [newObjective, setNewObjective] = useState({
        objective: "",
        isDone: false
    })

    // Create rows of objectives__________________________________________________________________________________
    function createRows(scheduleObjective, index) {
        return <tr key={index}>
            <td> {index + 1} </td>
            <td style={scheduleObjective.isDone ? { textDecoration: "line-through" } : {}}> {scheduleObjective.objective} </td>
            <td>
                <Button variant="text" size="large" name={scheduleObjective.objective} onClick={completeObjective}>
                    {scheduleObjective.isDone ? <DoneIcon color="success" /> : <CloseIcon color="error" />}
                </Button>
            </td>
            <td>
                <Button variant="text" size="large" name={scheduleObjective.objective} onClick={forgetObjective}>
                    <DeleteIcon color="error" />
                </Button>
            </td>

        </tr>
    }

    function completeObjective(event) {
        let objectToComplete = event.currentTarget.name

        const modifiedObjectives = schedule.objectives

        const index = modifiedObjectives.findIndex((objective) => {
            return objective.objective === objectToComplete
        })

        modifiedObjectives[index].isDone = !modifiedObjectives[index].isDone

        setSchedule((preVal) => {
            return {
                ...preVal,
                objectives: modifiedObjectives
            }
        })
    }

    // Delete the current schedule______________________________________________________________________________________
    function forgetSchedule() {
        let baseURL_add = "http://localhost:5000/forgetSchedule";

        // 1. Add schedule to forgotten schedule collection
        // 2. Delete schedule from the schedule collection
        axios.post(baseURL_add, schedule)
            .then(res => {
                console.log(res.data)

                let baseURL_delete = "http://localhost:5000/schedules/scheduleNumber/" + String(schedule.scheduleNumber);

                axios.delete(baseURL_delete)
                    .then(result => {
                        console.log(result.data)
                        props.closeScheduleEditor();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Delete a schedule objective_________________________________________________________________________________________________
    function forgetObjective(event) {
        let objectiveToForget = event.currentTarget.name

        const modifiedSchedule = schedule.objectives.filter((objective, index) => {
            return objective.objective !== objectiveToForget
        })

        setSchedule((preVal) => {
            return {
                ...preVal,
                objectives: modifiedSchedule
            }
        })
    }

    // Modify schedule_________________________________________________________________________________________________
    function modifySchedule() {

        let scheduleNumber = props.schedule.scheduleNumber
        let baseURL = "http://localhost:5000/schedules/scheduleNumber/" + scheduleNumber;

        axios.patch(baseURL, schedule)
            .then((res) => {
                console.log(res.data)
                props.closeScheduleEditor()
            })
            .catch((err) => { throw err })

    }

    // Add objective
    function addObjective() {
        setSchedule((preVal) => {
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

                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            Schedule Number : {schedule.scheduleNumber}
                        </div>

                        <div className="col">
                            Date : {schedule.obtained.split("T")[0]}
                        </div>

                        <div className="col">
                            <Button variant="text" size="small" color="error" onClick={forgetSchedule} >
                                <DeleteIcon fontSize="small" />(Danger)
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={"card-body"}>
                    <TextField
                        className="card-title"
                        fullWidth
                        required
                        name="title"
                        margin="dense"
                        label="Title"
                        value={schedule.title}
                        onChange={(e) => {
                            let { name, value } = e.target
                            setSchedule((preVal) => {
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
                        value={schedule.details}
                        onChange={(e) => {
                            let { name, value } = e.target

                            setSchedule((preVal) => {
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
                                <th scope="col">Completed</th>
                                <th scope="col">Add/Delete</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td >#</td>
                                <td>
                                    <TextField
                                        required
                                        name="objective"
                                        label="Objective name"
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
                                    <Button
                                        variant="text"
                                        size="large"
                                        color={newObjective.isDone ? "success" : "error"}
                                        onClick={() => {
                                            setNewObjective((preVal) => {
                                                return {
                                                    ...preVal,
                                                    isDone: !newObjective.isDone
                                                }
                                            })
                                        }}
                                    >
                                        {newObjective.isDone ?

                                            <DoneIcon style={{
                                                transform: "scale(1.2)"
                                            }} fontSize="large" /> :

                                            <CloseIcon style={{
                                                transform: "scale(1.2)"
                                            }} fontSize="large" />
                                        }
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="text" size="large" color="success" onClick={addObjective}>
                                        <AddIcon style={{
                                            transform: "scale(1.2)"
                                        }} fontSize="large" />
                                    </Button>
                                </td>

                            </tr>

                            {schedule.objectives.map(createRows)}
                        </tbody>
                    </table>
                </div>

                <Stack direction="row" spacing={1}>
                    <Button variant="text" size="large" style={{ width: "50%" }} onClick={() => { props.closeScheduleEditor() }}>
                        <CloseIcon color="active" fontSize="large" />
                    </Button>

                    <Button variant="text" size="large" style={{ width: "50%" }} onClick={modifySchedule}>
                        <BuildIcon color="success" fontSize="large" />
                    </Button>
                </Stack>


            </div>

        </div >, document.getElementById("portal"))

}

export default EditSchedule