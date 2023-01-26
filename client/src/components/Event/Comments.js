import { IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from './Comments.module.css'
import DeleteIcon from '@mui/icons-material/Delete';


function Comments() {
    const location = useLocation()
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const user = useSelector((state) => state.user.userInfo);

    const commentAdd = (index, id) => {

        if (comment === '') {
            toast.error('Please write a comment first', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        else {
            let data = {
                eventId: location.state.eventId,
                commentText: comment,
                rollno: user.years + "-" + user.department + "-" + user.rollno,
            }
            axios.post("http://localhost:5000/api/AddComment", data, { withCredentials: true })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Comment added Succesfully', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                    setComment("")
                    getdata()
                }).catch((err) => {
                    console.log(err);
                    toast.error('Cannot Publish Event', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                })
        }
    }



    const getdata = () => {
        axios.get("http://localhost:5000/api/getComment/" + location.state.eventId, { withCredentials: true })
            .then((res) => {
                setComments(res.data.data)
                console.log(res.data.data);
            }).catch((err) => {
                console.log(err)
            })
    }
    const remove = (id) => {
        console.log(id);
        const data = {
            id: id
        }
        axios.post("http://localhost:5000/api/removeComment", data)
            .then(function (response) {
                console.log(response);
                getdata()
            })
            .catch(function (error) { console.log(error); })
    }

    useEffect(() => {
        getdata()

    }, [])


    return (
        <div className={styles.Main}>
            {comments.length === 0 && <p>No comment added</p>}
            <div className={styles.abcSub}>
                {comments.map((items, indexx) => {
                    return (
                        <div className={styles.abc}>
                            <img src='http://www.clker.com/cliparts/f/a/0/c/1434020125875430376profile.png' />
                            <div className={styles.icon}>
                                <b>{items.rollno}</b>
                                <span>{items.commentText}</span>
                            </div>
                            <div>
                                <IconButton color="primary" aria-label="add to shopping cart"><DeleteIcon style={{ color: '#E53472' }} onClick={() => remove(items.id)} /></IconButton>

                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.commentHolder}>
                <img src='http://www.clker.com/cliparts/f/a/0/c/1434020125875430376profile.png' />
                <input value={comment} onChange={(e) => setComment(e.target.value)} type='text' placeholder='Write a Comment' />
                <button onClick={() => commentAdd()}>Add</button>
            </div>
        </div>
    )
}

export default Comments