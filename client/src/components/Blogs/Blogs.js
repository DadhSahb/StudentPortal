import React, { useEffect, useState } from 'react'
import styles from './Blogs.module.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Blogs() {

    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [comment, setComment] = useState("")
    const user = useSelector((state) => state.user.userInfo);
    const [data, setData] = useState([])

    const joinhandle = () => {
        navigate("/CreateBlog")
    }

    const handleBlogDetails = (item) => {
        navigate("/ViewBlog", { state: { data: item } })
    }

    const getdata = () => {
        axios.get("http://localhost:5000/api/getAllBlogs", { withCredentials: true })
            .then((res) => {
                setData(res.data.data)
                console.log(res.data.data);
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
                <h1>Blogs</h1>
                <div className={styles.buttonHolder}><button className={styles.button1} onClick={joinhandle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" /> </svg>{' '}
                    Add Blog</button></div>
            </div>

            <div className={styles.cardsMain}>
                {data.map((item, index) => {
                    return (
                        <div key={index} className={styles.card}>
                            <img src={item.imageURL} />
                            <h1>{item.name}</h1>
                            <div className={styles.desc}>
                                <p>{item.description}</p>
                            </div>
                            <div className={styles.button}>
                                <b style={{ color: "#B2B2B2", textDecoration: 'underline' }}>{item.rollno}</b>
                                <button className={styles.apply} onClick={() => handleBlogDetails(item)}>OPEN</button>
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default Blogs