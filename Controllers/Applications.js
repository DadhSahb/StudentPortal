import express from "express";
import dotenv from "dotenv";
import { pool } from "../index.js";
dotenv.config();

export const applications = async (req, res) => {
    const {userId,jobId,resumeId,resumeImg,applicationTime} = req.body
    const query = "INSERT INTO applications (userId,jobId,resumeId,resumeImg,applicationTime) VALUES (?,?,?,?,?)";
    pool.query(query, [userId,jobId,resumeId,resumeImg,applicationTime], (err, row, field) => {
        if(err)
        {
            if(err.code)
            {
                console.log(err.code)
                res.status(500).send({message:'ER_DUP_ENTRY'})
            }
            else
            {
                console.log(err)}
            }
        if(row)
        {
            console.log(row)
            res.send({message:'Success'})
        }
    })
}

export const getAllApplications = async (req, res) => {
    const {jobId} = req.params
    const query = "SELECT applications.id,applications.applicationTime,applications.resumeId,applications.resumeImg,user.name,user.email FROM applications INNER JOIN user ON applications.userId = user.id WHERE jobId=?";
    pool.query(query, [jobId], (err, row, field) => {
        if(err)
        {console.log(err)}
        if(row)
        {
            if(row.length === 0)
            {res.send({data:[]})}
            else
            {
                console.log(row)
                res.send({data:row})
            }
        }
    })
}
