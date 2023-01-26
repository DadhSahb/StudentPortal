import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Routes, Route } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from "./components/Auth/VerifyEmail";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Missing from "./components/Auth/Missing/Missing";
import Unauthorized from "./components/Auth/Missing/Unauthorized";
import AdminNavbar from './components/Navbar/AdminNavbar'
import UserNavbar from './components/Navbar/UserNavbar'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ManageUsers from "./components/Users/ManageUsers";
import AdminEvent from "./components/Event/AdminEvent";
import AddEvent from "./components/Event/AddEvent";
import Comments from "./components/Event/Comments";
import UserEvent from "./components/Event/UserEvent";
import Jobs from "./components/Jobs/Jobs";
import CreateJob from "./components/Jobs/CreateJob";
import JobDetails from "./components/Jobs/JobDetails";
import AdminJobs from "./components/Jobs/AdminJobs";
import Blogs from "./components/Blogs/Blogs";
import CreateBlog from "./components/Blogs/CreateBlog";
import ViewBlog from "./components/Blogs/ViewBlog";
import AdminBlogs from "./components/Blogs/AdminBlogs";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Auth />} />
          <Route path="/emailVerification/:id" element={<VerifyEmail />} />


          <Route element={<RequireAuth allowedRoles={'admin'} />}>
            {/* <Route path="AdminDashboard" element={<AdminNavbar><AdminDashboard /></AdminNavbar>} /> */}
            <Route path="ManageUsers" element={<AdminNavbar><ManageUsers /></AdminNavbar>} />
            <Route path="AdminDashboard" element={<AdminNavbar><AdminEvent /></AdminNavbar>} />
            <Route path="AddEvent" element={<AdminNavbar><AddEvent /></AdminNavbar>} />
            <Route path="Comments" element={<AdminNavbar><Comments /></AdminNavbar>} />
            <Route path="CreateJob2" element={<AdminNavbar><CreateJob /></AdminNavbar>} />
            <Route path="AdminJobs" element={<AdminNavbar><AdminJobs /></AdminNavbar>} />
            <Route path="AdminBlogs" element={<AdminNavbar><AdminBlogs /></AdminNavbar>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={'user'} />}>
            <Route path="UserDashboard" element={<UserNavbar><UserEvent /></UserNavbar>} />
            <Route path="AddEvent2" element={<UserNavbar><AddEvent /></UserNavbar>} />
            <Route path="Jobs" element={<UserNavbar><Jobs /></UserNavbar>} />
            <Route path="CreateJob" element={<UserNavbar><CreateJob /></UserNavbar>} />
            <Route path="JobDetails" element={<UserNavbar><JobDetails /></UserNavbar>} />
            <Route path="Blogs" element={<UserNavbar><Blogs /></UserNavbar>} />
            <Route path="CreateBlog" element={<UserNavbar><CreateBlog /></UserNavbar>} />
            <Route path="ViewBlog" element={<UserNavbar><ViewBlog /></UserNavbar>} />
          </Route>


          <Route path="*" element={<Missing />} />
          <Route path="Unauthorized" element={<Unauthorized />} />

        </Route>
      </Routes>

      <ToastContainer autoClose={2000} />

    </>
  );
}

export default App;
