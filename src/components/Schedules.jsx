import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"
import Masonry from 'react-masonry-css'

import AddSchedule from "./AddSchedule";
import EditSchedule from "./EditSchedule";
import ViewSchedule from "./ViewSchedule";
import FilterSchedule from "./FilterSchedule";

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import BuildIcon from '@mui/icons-material/Build';
import Stack from '@mui/material/Stack';

function Schedules() {
    const fetchSchedules = () => {
        let baseURL = "http://localhost:5000/schedules";

        axios.get(baseURL)
            .then((res) => {
                setScheduleList(res.data.reverse())
                setNumberOfSchedules(res.data[0] ? res.data[0].scheduleNumber : 0)
            })
            .catch((err) => { throw err })
    }

    // When loading the page fetch all the schedules
    let [isFirstLoad, setIsFirstLoad] = useState(true)

    if (isFirstLoad) {
        setIsFirstLoad(false);
        fetchSchedules();
    }

    let [scheduleList, setScheduleList] = useState([])

    let [numberOfSchedules, setNumberOfSchedules] = useState(0)

    let [scheduleToBeViewed, setScheduleToBeViewed] = useState({})

    function createScheduleCard(schedule, index) {


        return <div key={schedule.scheduleNumber}>

            <div className="card " >
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            Schedule # : {schedule.scheduleNumber}
                        </div>

                        <div className="col">
                            Date : {schedule.obtained.split("T")[0]}
                        </div>

                        <div className="col">
                            <Button variant="text" fullWidth size="small" style={{ color: "#79A8A9" }} onClick={() => {
                                setIsEditingSchedule(true)
                                setScheduleToBeViewed(schedule)
                            }}>

                                <BuildIcon />

                            </Button>
                        </div>
                    </div>
                </div>

                <div className={"card-body"}>

                    <div id="title">
                        <h3 className="card-title"> {schedule.title}</h3>
                    </div>

                    <div id="info">
                        <blockquote className="blockquote">
                            <p>{schedule.details} </p>
                        </blockquote>

                    </div>
                </div>

                <Stack direction="row" spacing={1}>
                    <Button variant="text" size="large" style={{ width: "100%" }} onClick={() => {
                        setIsViewingSchedule(true)
                        setScheduleToBeViewed(schedule)

                    }}>

                        <RemoveRedEyeSharpIcon style={{
                            transform: "scale(1)", color: "#056676"
                        }} fontSize="large" />

                    </Button>
                </Stack>
            </div>

        </div >
    }

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    // Popup : Add Schedule____________________________________________________________________________________
    let [isAddingSchedule, setIsAddingSchedule] = useState(false)

    function closeScheduleMaker() {
        setIsAddingSchedule(false)
        fetchSchedules();
    }

    // Popup : Edit Schedule__________________________________________________________________________________
    let [isEditingSchedule, setIsEditingSchedule] = useState(false)

    function closeScheduleEditor() {
        setIsEditingSchedule(false)
        fetchSchedules();
    }

    // Popup : View Schedule__________________________________________________________________________________
    let [isViewingSchedule, setIsViewingSchedule] = useState(false)

    function closeScheduleViewer() {
        setIsViewingSchedule(false)
        fetchSchedules();
    }

    // Popup : View Schedule__________________________________________________________________________________
    let [isFilteringSchedule, setIsFilteringSchedule] = useState(false)

    function closeFilterSchedule() {
        setIsFilteringSchedule(false)
        fetchSchedules();
    }

    // Query functions______________________________________________________________________________________
    // Based on the schedule number : Single record => If not found do nothing 
    function findByScheduleNumber(key) {
        let baseURL = "http://localhost:5000/schedules/scheduleNumber/" + String(key);
        axios.get(baseURL)
            .then((res) => {

                if (res.data) {
                    let resultArray = []
                    resultArray.push(res.data)
                    setScheduleList(resultArray)
                }

                setIsFilteringSchedule(false)
            })
            .catch((err) => { throw err })
    }
    // Multiple records possible => If not found set schedule list to empty
    // Based on the schedule title
    function findByTitle(key) {
        let baseURL = "http://localhost:5000/schedules/title/" + key;

        axios.get(baseURL)
            .then((res) => {
                setScheduleList(res.data.reverse())
                setIsFilteringSchedule(false)
            })
            .catch((err) => { throw err })
    }
    // Based on the date 
    function findByDate(key) {
        let baseURL = "http://localhost:5000/schedules/obtained/" + String(key);

        axios.get(baseURL)
            .then((res) => {
                console.log(res.data)
                setScheduleList(res.data.reverse())
                setIsFilteringSchedule(false)
            })
            .catch((err) => { throw err })
    }

    return <div className="container-fluid">

        <h2 className="pageTitle">
            Schedule List
        </h2>

        <div className="options">

            <Button variant="text" size="large" onClick={() => { setIsAddingSchedule(true) }}>
                <NoteAddIcon style={{
                    transform: "scale(1.2)", color: "#056676"
                }} fontSize="large" />
            </Button>

            <Button variant="text" size="large" onClick={() => { setIsFilteringSchedule(true) }}>
                <FilterAltIcon style={{
                    transform: "scale(1.2)", color: "#056676"
                }} fontSize="large" />
            </Button>

        </div>


        {/* Popups _____________________________________________________________________________________________ */}
        {isAddingSchedule && <AddSchedule closeScheduleMaker={closeScheduleMaker} numberOfSchedules={numberOfSchedules} />}

        {isEditingSchedule && <EditSchedule scrollable={true} closeScheduleEditor={closeScheduleEditor} schedule={scheduleToBeViewed} />}

        {isViewingSchedule && <ViewSchedule closeScheduleViewer={closeScheduleViewer} schedule={scheduleToBeViewed} />}

        {isFilteringSchedule && <FilterSchedule
            closeFilterSchedule={closeFilterSchedule}
            findByScheduleNumber={findByScheduleNumber}
            findByTitle={findByTitle}
            findByDate={findByDate}
            findAll={fetchSchedules}
        />}

        <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {scheduleList.map(createScheduleCard)}

        </Masonry>

    </div >
}

export default Schedules;