import express from 'express';
import { applications, getAllApplications } from '../Controllers/Applications.js';
const router = express.Router();

import { EmailVerify, getUser, login, SignUp } from '../Controllers/Auth.js';
import { AddBlog, getAllBlogs, removeBlog } from '../Controllers/Blogs.js';
import { AddComment, AddEvent, approveEvent, getAllEvents, getComment, removeComment, removeEvent } from '../Controllers/Events.js';
import { deleteJob, getAllJobs, getAllJobsForEmployee, getSingleJob, Jobs } from '../Controllers/Jobs.js';
import { approveUser, getAllUsers, removeUser, updateCompanyProfile } from '../Controllers/Profile.js';

router.get('/', (req, res) => {
  console.log('Cookies: ', req.cookies)
  res.send({
    success: '1',
    message: 'This is api working',
  });
});

// LOGIN
router.post('/login', login);
router.post('/signup', SignUp);
router.post('/emailVerification', EmailVerify);
router.post('/removeUser', removeUser);
router.post('/approveUser', approveUser);

//EVENTS
router.post('/AddEvent', AddEvent);
router.get('/getAllEvents', getAllEvents);
router.post('/removeEvent', removeEvent);
router.post('/approveEvent', approveEvent);
router.post('/AddComment', AddComment);
router.get('/getComment/:eventId', getComment);
router.post('/removeComment', removeComment);


//USER DETAILS
router.get('/getUser/:userId', getUser);
router.get('/getAllUsers', getAllUsers);


//JOBS
router.post('/jobs', Jobs);
router.get('/getAllJobs', getAllJobs);
router.post('/deleteJobs', deleteJob);

//BLOGS
router.post('/AddBlog', AddBlog);
router.get('/getAllBlogs', getAllBlogs);
router.post('/removeBlog', removeBlog);



//COMPANY
// router.get('/getAllJobs/:companyId', getAllJobs);
// router.get('/getAllApplications/:jobId', getAllApplications);
// router.post('/deleteJobs', deleteJob);
// router.get('/getSingleJob/:jobId', getSingleJob);
// router.post('/updateCompanyProfile', updateCompanyProfile);

// //EMPLOYEE
// router.get('/getAllJobsForEmployee', getAllJobsForEmployee);
// router.post('/applications', applications);


export default router;
























// import { authenticateToken } from '../Controllers/AuthenticateToken.js';
// import {getUser, updateUser} from "../Controllers/User.js";
// import { refreshToken } from '../Controllers/AuthenticateToken.js';
// router.post('/emailVerification', EmailVerify);
// router.post('/forgotPassword', ForgotPassword);
// router.post('/forgotPasswordChange',ForgotPasswordChange);
// router.post ("/user",authenticateToken,updateUser);
// router.get("/user",authenticateToken,getUser);
// AUTHENTICATION
// router.get("/isAuthorized",authenticateToken,isAuthorized);
// router.get("/refreshToken/:userId/:quizId",refreshToken);