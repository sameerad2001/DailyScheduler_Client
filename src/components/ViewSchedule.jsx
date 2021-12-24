import React, { useState } from "react";
import ReactDOM from "react-dom"
import axios from 'axios'

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function ViewSchedule(props) {

    let [schedule, setSchedule] = useState(props.schedule)

    // Crete records for each schedule objective
    function createRows(scheduleObjective, index) {
        return <tr key={index}>
            <td> {index + 1} </td>
            <td style={scheduleObjective.isDone ? { textDecoration: "line-through" } : {}}> {scheduleObjective.objective} </td>
            <td>
                <Button variant="text" size="large" name={scheduleObjective.objective} onClick={completeObjective}>
                    {scheduleObjective.isDone ? <DoneIcon color="success" /> : <CloseIcon color="error" />}
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

    function saveAndQuit() {

        let scheduleNumber = props.schedule.scheduleNumber
        let baseURL = "http://localhost:5000/schedules/scheduleNumber/" + scheduleNumber;

        axios.patch(baseURL, schedule)
            .then((res) => {
                console.log(res.data)
                props.closeScheduleViewer()
            })
            .catch((err) => { throw err })
    }

    return ReactDOM.createPortal(
        <div>
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
                    </div>
                </div>

                <div className={"card-body "}>

                    <div id="title">
                        <h3 className="card-title"> {schedule.title}</h3>
                    </div>

                    <div id="info">

                        <blockquote className="blockquote">
                            <p>{schedule.details} </p>
                        </blockquote>

                        <table className="table table-hover">
                            <thead >
                                <tr className="table-dark">
                                    <th scope="col">#</th>
                                    <th scope="col">Objectives</th>
                                    <th scope="col">Completed</th>
                                </tr>
                            </thead>

                            <tbody>
                                {schedule.objectives.map(createRows)}
                            </tbody>
                        </table>


                    </div>
                </div>

                <Button variant="text" size="large" onClick={saveAndQuit}>
                    <VisibilityOffIcon style={{ color: "#056676" }} fontSize="large" />
                </Button>
            </div>
        </div>, document.getElementById("portal"))

}

export default ViewSchedule