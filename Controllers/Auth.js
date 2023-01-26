import express from "express";
import dotenv from "dotenv";
import { pool } from "../index.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import Jwt from "jsonwebtoken";
dotenv.config();
// import { tokenList } from './AuthenticateToken.js';

export const login = async (req, res) => {
  // res.send('hello')
  console.log(req.body);
  const { email, password } = req.body;
  const queryUserExists = "SELECT * FROM `users` where `email`=?";
  pool.query(queryUserExists, [email], (err, row, field) => {
    if (row.length === 0) {
      console.log("pass is wrong");
      res.status(403).send({ user: "Password is wrong" });
      return;
    }
    const xyz = compareSync(password, row[0].password);
    if (xyz) {
      let user = { username: row[0].name, userId: row[0].id };
      console.log(user);
      const token = Jwt.sign(
        user,
        process.env.SECRETKEY,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            console.log(err);
            res.send(err);
          }
          if (token) {
            const refreshToken = Jwt.sign(user, process.env.SECRETKEY, {
              expiresIn: "2d",
            });
            // tokenList[refreshToken] = token;
            // res.cookie('token',token,{maxAge:100000000000000});
            // res.cookie('reFreshToken',refreshToken,{maxAge:1000000000000000});
            let data = {
              msg: "Logged in!",
              token: refreshToken,
              user: row[0],
            };

            res.status(200).send({
              msg: "Logged in!",
              token: token,
              user: row[0],
            });
          }
          console.log('response sent');
        }
      );
    } else {
      res.status(400).send({ user: "Password is wrong" });
    }
  });
};

export const SignUp = async (req, res) => {
  const { name, email, password, role, year, department, rollno } = req.body;
  const salt = genSaltSync(10);
  const encryptedPassword = hashSync(req.body.password, salt);

  const queryUserExists = "SELECT * FROM `users` where `email`=?";
  const insertUser = "INSERT INTO users (name,email,password,role,years,department,rollno,emailverify,adminverify) VALUES (?,?,?,?,?,?,?,?,?)";

  pool.query(queryUserExists, [email], (err, row) => {
    if (row.length === 0) {
      pool.query(
        insertUser,
        [name, email, encryptedPassword, role, year, department, rollno, 0, 0],
        (err, row, field) => {
          if (err) {
            console.log(err);
            res.status(500).send({
              success: 0,
              message: "Cannot Register User",
              err: err,
            });
          }
          if (row) {
            res.status(200).send({
              success: 1,
              message: "User Registered",
              data: row,
              id: row.insertId,
              email: email,
              fullName: name,
            });
          }
        }
      );
    } else if (row.length > 0) {
      res.status(400).send({
        success: 0,
        message: "Duplicate Entry",
      });
    }
  });
};

export const EmailVerify = (req, res) => {
  const { id } = req.body;

  pool.query("select emailverify from users where id=?", id, (err, row, field) => {
    if (row[0].emailverify === 1) {
      res.status(400).send("Already Verified");
    }
    else if (row[0].emailverify === 0) {
      pool.query("UPDATE users set emailverify = true where id=?", id, (err, row) => {
        if (err !== null) {
          console.log(err);
          res.send({ err: err });
          return;
        }
        res.status(200).send({ status: "Success" });
      }
      );
    }
  });
};

export const ForgotPassword = (req, res) => {
  const { email } = req.body;
  pool.query("SELECT * FROM user WHERE email=? ", [email], (err, results) => {
    if (err) {
      console.log("error here" + err);
    } else if (results.length === 0) res.status(204).send("No results");
    else {
      if (results[0].verified === "0") {
        res.status(403).send({ message: "Please verify first" });
      } else {
        res.status(200).send({
          success: 1,
          message: "User Registered",
          data: results,
          id: results[0].id,
          email: email,
        });
      }
    }
  });
};

export const ForgotPasswordChange = (req, res) => {
  const id = req.body.id;
  const salt = genSaltSync(10);
  const password = hashSync(req.body.newPassword, salt);

  pool.query(
    "UPDATE user set pass=? where id=?",
    [password, id],
    (err, results) => {
      if (err) {
        console.log("error here" + err);
      } else if (results) res.status(200).send({ message: "Password Changed" });
    }
  );
};

export const isAuthorized = (req, res) => {
  res.status(200).send("Authorized");
};

export const getUser = async (req, res) => {
  const { userId } = req.params
  const query = "SELECT * FROM user where id=?";
  pool.query(query, [userId], (err, row, field) => {
    if (err) { console.log(err) }
    if (row) {
      res.send({ data: row })
      console.log('sent')
    }
  })
}