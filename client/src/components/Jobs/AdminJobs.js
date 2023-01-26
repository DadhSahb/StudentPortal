import React, { useEffect, useState } from 'react'
import styles from './AdminJobs.module.css'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function AdminJobs() {
    const user = useSelector((state) => state.user.userInfo);
    const [alljobs, setAllJobs] = useState([]);
    const [page, setPage] = useState(0);
    const navigate = useNavigate()
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [triggerDelete, setTriggerDelete] = useState(false)

    const joinhandle = () => {
        navigate("/CreateJob2")
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = (item) => {
        let data = {
            id: item.id
        }
        axios.post("http://localhost:5000/api/deleteJobs", data, { withCredentials: true })
            .then((res) => {
                if (res?.status === 200) {
                    setTriggerDelete((state) => !state)
                    toast.success('Job Removed', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                else
                    console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/api/getAllJobs", { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                console.log(typeof (res.data));
                setAllJobs(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [triggerDelete])


    return (
        <div className={styles.Main}>

            <div className={styles.heads}>
                <h1>Jobs</h1>
                <div className={styles.buttonHolder}><button className={styles.button1} onClick={joinhandle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" /> </svg>{' '}
                    Add Jobs</button></div>
            </div>

            <div className={styles.courseInfo}>
                <h1 className={styles.hello}>Overview</h1>
                <div className={styles.holll}>
                    <div className={styles.join2}>
                        <div className={styles.totalQuizzes}>
                            <WorkOutlineIcon style={{ fontSize: '40px' }} />
                        </div>
                        <div className={styles.right}>
                            <h1>J O B S</h1>
                            <p>{alljobs.length}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.okok}>
                <div className={styles.headss}><p>J O B S</p></div>
                <TableContainer className={styles.container}  >
                    <Table className={styles.table} sx={{ minWidth: 1 }} aria-label="simple table" color="#F7F6F2">

                        <TableHead sx={{ color: 'white' }}>
                            <TableRow>
                                <TableCell className={styles.headTitle} ></TableCell>
                                <TableCell className={styles.headTitle} >Title</TableCell>
                                <TableCell className={styles.headTitle} >Job Description</TableCell>
                                <TableCell className={styles.headTitle} >Vaccancies</TableCell>
                                <TableCell className={styles.headTitle}>Min exp</TableCell>
                                <TableCell className={styles.headTitle}>Skills</TableCell>
                                <TableCell className={styles.headTitle}>Created By</TableCell>
                                <TableCell className={styles.headTitle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {alljobs?.length === 0 && <TableRow >
                                <TableCell colspan="7" style={{ "text-align": "center", }}>No Job Uploaded yet</TableCell>
                            </TableRow>}

                            {(alljobs || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) =>
                            (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell className={styles.ind} align="left">{index + 1}</TableCell>
                                    <TableCell className={styles.ind} component="th" scope="row"><b>{item.title.toUpperCase()}</b></TableCell>
                                    <TableCell className={styles.ind} component="th">{item.description}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.jobType}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.vaccancies}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.skills}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.rollno}</TableCell>
                                    <TableCell onClick={() => handleDelete(item)} component="th" align='left'><p className={styles.ind2}>REMOVE</p></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[7]}
                    component="div"
                    count={alljobs?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    )
}

export default AdminJobs