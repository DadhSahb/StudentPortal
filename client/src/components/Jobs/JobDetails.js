import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from './JobDetails.module.css'

function JobDetails() {
    const location = useLocation()
    const [jobDetail, setJobDetail] = useState(location.state.data)

    return (
        <div className={styles.Main}>
            <div className={styles.company}>
                <div className={styles.titleHead}>
                    <h3 className={styles.companyName}>{jobDetail.rollno}</h3>
                    <h1 className={styles.title}>{jobDetail.title}</h1>
                    <p>{jobDetail.description}</p>
                </div>
                <div className={styles.img}>
                    <img style={{ height: '100px' }} src={jobDetail.img} />
                </div>
            </div>

            <div className={styles.body}>
                <div className={styles.body2}>
                    <p className={styles.p}><span>Min Experience : </span>{jobDetail.minExperience} years</p>
                    <p className={styles.p}><span>Vaccancies : </span>{jobDetail.vaccancies}</p>
                    <p className={styles.p}><span>Job Type : </span>{jobDetail.jobType}</p>
                    <div className={styles.description}>
                        <p className={styles.p}><span>Description</span></p>
                        <p className={styles.desc}>{jobDetail.description}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default JobDetails