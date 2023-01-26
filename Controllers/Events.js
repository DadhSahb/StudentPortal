import express from "express";
import dotenv from "dotenv";
import { pool } from "../index.js";
dotenv.config();

export const AddEvent = async (req, res) => {
    const { userId, name, email, rollno, description, createdTime, imageURL } = req.body
    const query = "INSERT INTO events (userId, name, email,rollno, description, createdTime, imageURL,approved) VALUES (?,?,?,?,?,?,?,?)";
    pool.query(query, [userId, name, email, rollno, description, createdTime, imageURL, 0], (err, row, field) => {
        if (err) { console.log(err) }
        if (row) {
            console.log(row);
            res.status(200).send({
                message: "Event published successfully",
            });
        }
    })
}


export const getAllEvents = async (req, res) => {
    const query = "SELECT * FROM events";
    pool.query(query, (err, row, field) => {
        if (err) { console.log(err) }
        if (row) {
            if (row.length === 0) {
                res.send({ data: [] })
                console.log('data sent')
            }
            else {
                row.forEach((value, index) => {
                    pool.query("SELECT * FROM comments WHERE eventId=?", [value.id], (error, rows, fields) => {
                        if (error) { console.log(err) }
                        if (rows) {
                            row[index].comment = rows
                            if (row.length === index + 1) {
                                row.reverse()
                                res.send({ data: row })
                            }
                        }
                    })
                })
            }
        }
    })
}

export const removeEvent = async (req, res) => {
    const { id } = req.body
    const query = "DELETE FROM events where id=?";
    pool.query(query, [id], (err, row, field) => {
        if (err) { console.log(err) }
        if (row) { res.status(200).send({ message: 'updated' }) }
    }
    )
}

export const approveEvent = async (req, res) => {
    const { id } = req.body
    const query = "UPDATE events set approved=1 where id=?";
    pool.query(query, [id], (err, row, field) => {
        if (err) { console.log(err) }
        if (row) { res.status(200).send({ message: 'updated' }) }
    }
    )
}

export const AddComment = async (req, res) => {
    const { eventId, commentText, rollno } = req.body
    if (rollno === 'SP19-BCS-7') {

        const query = "INSERT INTO comments (eventId, commentText,rollno ) VALUES (?,?,?)";
        pool.query(query, [eventId, commentText, 'ADMIN'], (err, row, field) => {
            if (err) { console.log(err) }
            if (row) {
                console.log(row);
                res.status(200).send({
                    message: "Event published successfully",
                });
            }
        })
    }
    else {

        const query = "INSERT INTO comments (eventId, commentText,rollno ) VALUES (?,?,?)";
        pool.query(query, [eventId, commentText, rollno], (err, row, field) => {
            if (err) { console.log(err) }
            if (row) {
                console.log(row);
                res.status(200).send({
                    message: "Event published successfully",
                });
            }
        })
    }
}

export const getComment = async (req, res) => {
    const { eventId } = req.params
    const query = "SELECT * FROM comments where eventId=?";
    pool.query(query, [eventId], (err, row, field) => {
        if (err) { console.log(err) }
        if (row) {
            res.status(200).send({ data: row })
        }
    }
    )
}

export const removeComment = async (req, res) => {
    const { id } = req.body
    const query = "DELETE FROM comments where id=?";
    pool.query(query, [id], (err, row, field) => {
        if (err) { console.log(err) }
        if (row) { res.status(200).send({ message: 'updated' }) }
    }
    )
}