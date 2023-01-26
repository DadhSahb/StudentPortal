import express from "express";
import dotenv from "dotenv";
import { pool } from "../index.js";
dotenv.config();
// import { tokenList } from './AuthenticateToken.js';

export const Jobs = async (req, res) => {
    const { rollno, title, vaccancies, description, jobType, minExperience, createdTime, skills } = req.body
    const query = "INSERT INTO jobs (rollno,title,vaccancies,description,jobType,minExperience,createdTime,skills) VALUES (?,?,?,?,?,?,?,?)";
    if (rollno === 'SP19-BCS-7') {
        pool.query(query, ['ADMIN', title, vaccancies, description, jobType, minExperience, createdTime, skills], (err, row, field) => {
            if (err) { console.log(err) }
            if (row) {
                res.status(200).send({
                    message: "Job published successfully",
                });
            }
        })
    }
    else {
        pool.query(query, [rollno, title, vaccancies, description, jobType, minExperience, createdTime, skills], (err, row, field) => {
            if (err) { console.log(err) }
            if (row) {
                res.status(200).send({
                    message: "Job published successfully",
                });
            }
        })
    }
}

export const getAllJobs = async (req, res) => {
    const query = "SELECT * FROM jobs";
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

export const deleteJob = async (req, res) => {
    const { id } = req.body
    const query = "DELETE FROM jobs where id=?";
    pool.query(query, [id], (err, row, field) => {
        if (err)
            console.log(err)
        if (res) {
            res.status(200).send({ message: 'DELETED' })
        }
    })
}

export const getAllJobsForEmployee = async (req, res) => {
    const { userId } = req.params
    console.log(userId)
    const query = "SELECT jobs.id,jobs.companyId,jobs.title,jobs.vaccancies,jobs.decription,jobs.jobType,jobs.minExperience,jobs.createdTime,user.name,user.img,user.description,user.location FROM jobs INNER JOIN user ON jobs.companyId = user.id; ";
    pool.query(query, (err, row, field) => {
        if (err)
            console.log(err)
        if (row) {
            row.reverse()
            row.forEach((item, index) => {
                pool.query('SELECT * from companyskills where jobId =?', [item.id], (errr, rows, field) => {
                    if (errr)
                        console.log(errr)
                    if (rows) {
                        let newArr = []
                        rows.forEach((value, ins) => {
                            newArr.push(value.skill.toLowerCase())
                            if (rows.length === ins + 1) {
                                row[index].skills = newArr
                            }
                        })
                        if (row.length === index + 1) {
                            row.reverse()
                            res.send({ data: row })
                        }
                    }
                })
            })
        }
    })
}

export const getSingleJob = async (req, res) => {
    const { jobId } = req.params
    const query = "SELECT * FROM jobs where id=?";
    pool.query(query, [jobId], (err, row, field) => {
        if (err) { console.log(err) }
        if (row) {
            if (row.length === 0) {
                res.send({ data: [] })
                console.log('data sent')
            }
            else {
                pool.query("SELECT * FROM companyskills where jobId=?", [jobId], (error, rows, fields) => {
                    if (error) { console.log(err) }
                    if (rows) {
                        let Skills = rows.map((item, index) => {
                            return item.skill
                        })
                        row[0].skill = Skills
                        res.send({ data: row })
                    }
                })
            }
        }
    })
}
