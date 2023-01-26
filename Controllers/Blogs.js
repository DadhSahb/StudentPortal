import express from "express";
import dotenv from "dotenv";
import { pool } from "../index.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import Jwt from "jsonwebtoken";
dotenv.config();

export const AddBlog = async (req, res) => {
    const { userId, name, email, rollno, description, createdTime, imageURL } = req.body
    const query = "INSERT INTO blogs (userId, name, email,rollno, description, createdTime, imageURL) VALUES (?,?,?,?,?,?,?)";
    pool.query(query, [userId, name, email, rollno, description, createdTime, imageURL], (err, row, field) => {
        if (err) { console.log(err) }
        if (row) {
            console.log(row);
            res.status(200).send({
                message: "Blogs published successfully",
            });
        }
    })
}


export const getAllBlogs = async (req, res) => {
    const query = "SELECT * FROM blogs";
    pool.query(query, (err, row, field) => {
        if (err) { console.log(err) }
        if (row) {
            if (row.length === 0) {
                res.send({ data: [] })
                console.log('data sent')
                console.log(row);
            }
            else {
                row.reverse()
                res.send({ data: row })
                console.log(row);
            }
        }
    })
}

export const removeBlog = async (req, res) => {
    const { id } = req.body
    const query = "DELETE FROM blogs where id=?";
    pool.query(query, [id], (err, row, field) => {
        if (err) { console.log(err) }
        if (row) { res.status(200).send({ message: 'updated' }) }
    }
    )
}