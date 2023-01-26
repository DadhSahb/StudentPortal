import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ViewBlog.module.css'

function ViewBlog() {

    const location = useLocation()
    const [blogDetail, setBlogDetail] = useState(location.state.data)
    console.log(location.state.data);

    return (
        <div className={styles.Main}>

            <div className={styles.card}>
                <div className={styles.art} >
                    <img className={styles.cardImage} src={blogDetail.imageURL} />
                </div>
                <h3>{blogDetail.name}</h3>
                <p className={styles.description}>{blogDetail.description}</p>
            </div>
            <div className={styles.footer}>
                <span>{blogDetail.rollno}</span>
            </div>
        </div>
    )
}

export default ViewBlog