import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './UserEvent.module.css'
import dayjs from "dayjs";


function UserEvent() {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [comment, setComment] = useState("")
    const user = useSelector((state) => state.user.userInfo);

    const joinhandle = () => {
        navigate("/AddEvent2")
    }

    const getdata = () => {
        axios.get("http://localhost:5000/api/getAllEvents", { withCredentials: true })
            .then((res) => {
                setEvents(res.data.data)
                console.log(res.data.data);
            }).catch((err) => {
                console.log(err)
            })
    }

    const commentAdd = (index, id) => {

        if (comment === '') {
            toast.error('Please write a comment first', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        else {
            let data = {
                eventId: id,
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




    useEffect(() => {
        getdata()
    }, [])

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



    return (
        <div className={styles.Main}>
            <div className={styles.heads}>
                <h1>Events</h1>
                <div className={styles.buttonHolder}><button className={styles.button1} onClick={joinhandle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" /> </svg>{' '}
                    Add Event</button></div>
            </div>

            <div className={styles.eventHolder}>
                {events.map((item, index) => {
                    if (item.approved === 1) {
                        return (
                            <div className={styles.card}>
                                <div className={styles.time}>
                                    <b>{getDifference(item.createdTime)} ago</b>
                                </div>
                                <div className={styles.art} >
                                    <img className={styles.cardImage} src={item.imageURL} />
                                </div>
                                <h3>{item.name}</h3>
                                <p className={styles.description}>{item.description}</p>
                                <hr></hr>
                                <h4>Comments</h4>
                                <div className={styles.abcSub}>
                                    {item.comment.map((items, indexx) => {
                                        return (
                                            <div className={styles.abc}>
                                                <img src='http://www.clker.com/cliparts/f/a/0/c/1434020125875430376profile.png' />
                                                <div className={styles.icon}>
                                                    <b>{items.rollno}</b>
                                                    <span>{items.commentText}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={styles.commentHolder}>
                                    <img src='http://www.clker.com/cliparts/f/a/0/c/1434020125875430376profile.png' />
                                    <input value={comment} onChange={(e) => setComment(e.target.value)} type='text' placeholder='Write a Comment' />
                                    <button onClick={() => commentAdd(index, item.id)}>Add</button>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    )
}

export default UserEvent