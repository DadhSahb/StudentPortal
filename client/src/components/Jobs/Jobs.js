import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Jobs.module.css'
import dayjs from "dayjs";


function Jobs() {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])

    const joinhandle = () => {
        navigate("/CreateJob")
    }

    const handleJobDetails = (item) => {
        navigate("/JobDetails", { state: { data: item } })
    }


    function getDifference(createdAt) {
        const firstDate = dayjs(createdAt);
        const currentDate = dayjs();
        const differenceInMinutes = currentDate.diff(firstDate, "minute");
        const minutesInDay = 1440;
        const minutesInWeek = 10080;
        const minutesInMonth = 43800;
        const minutesInYear = 525600;

        if (differenceInMinutes < 60) {
            return `${differenceInMinutes}m`;
        } else if (differenceInMinutes > 60 && differenceInMinutes < minutesInDay) {
            return `${currentDate.diff(firstDate, "hour")}h`;
        } else if (
            differenceInMinutes > minutesInDay &&
            differenceInMinutes < minutesInWeek
        ) {
            return `${currentDate.diff(firstDate, "day")}d`;
        } else if (
            differenceInMinutes > minutesInWeek &&
            differenceInMinutes < minutesInMonth
        ) {
            return `${currentDate.diff(firstDate, "week")}w`;
        } else if (
            differenceInMinutes > minutesInMonth &&
            differenceInMinutes < minutesInYear
        ) {
            return `${currentDate.diff(firstDate, "month")}m`;
        } else if (differenceInMinutes >= minutesInYear) {
            return `${currentDate.diff(firstDate, "year")}y`;
        } else {
            return `${currentDate.diff(firstDate, "day")}d`;
        }
    }

    const getdata = () => {
        axios.get("http://localhost:5000/api/getAllJobs", { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                setJobs(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getdata()
    }, [])


    return (
        <div className={styles.Main}>
            <div className={styles.heads}>
                <h1>Jobs</h1>
                <div className={styles.buttonHolder}><button className={styles.button1} onClick={joinhandle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" /> </svg>{' '}
                    Add Jobs</button></div>
            </div>

            <div className={styles.cardContainer}>

                {jobs.map((item, index) => {
                    return (
                        <div key={item.id} className={styles.job}>
                            <div className={styles.head}>
                                <div className={styles.companyLogo} style={{ backgroundImage: `url(https://i.pinimg.com/736x/6b/39/f4/6b39f42c184684135f0e4dfb151cf6ea.jpg)`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                                <b>{item.rollno}</b>
                            </div>
                            <p className={styles.jobTitle}>{item.title}</p>
                            <p className={styles.jobDescription}>{item.description}</p>
                            <div className={styles.abc}>
                                <div className={styles.hold}>{item.jobType}</div>
                                <div className={styles.hold}>{item.vaccancies} postions</div>
                            </div>
                            <div className={styles.footer}>
                                <p>Posted: <span>{getDifference(item.createdTime)} ago</span> </p>
                                <button className={styles.apply} onClick={event => {
                                    event.stopPropagation(); // <-- this stops the click going through to the parent div
                                    console.log('apply');
                                    handleJobDetails(item)
                                }}>Details</button>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default Jobs