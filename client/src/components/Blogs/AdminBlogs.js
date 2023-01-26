import React, { useEffect, useState } from 'react'
import styles from './../Event/AdminEvent.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';


function AdminBlogs() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate()
    const [userss, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);


    const getdata = () => {
        axios.get("http://localhost:5000/api/getAllBlogs", { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                setEvents(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getdata()
    }, [])

    const joinhandle = () => {
        navigate('/AddEvent')
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const remove = (id) => {
        console.log(id);
        const data = {
            id: id
        }
        axios.post("http://localhost:5000/api/removeBlog", data)
            .then(function (response) {
                console.log(response);
                toast.success('Blog Removed', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getdata()
            })
            .catch(function (error) { console.log(error); })
    }
    return (
        <div className={styles.Main}>

            <div className={styles.heads}>

                <h1>Events</h1>
                <div className={styles.buttonHolder}><button className={styles.button1} onClick={joinhandle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" /> </svg>{' '}
                    Add Event</button></div>


            </div>

            <div className={styles.okok}>
                <div className={styles.headss}><p>Events</p></div>
                <TableContainer   >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" color="#F7F6F2">


                        <TableHead sx={{ color: 'white' }}>
                            <TableRow >
                                <TableCell className={styles.headTitle} >#</TableCell>
                                <TableCell className={styles.headTitle} >Email</TableCell>
                                <TableCell className={styles.headTitle} >RollNo</TableCell>
                                <TableCell className={styles.headTitle} >Posted Time</TableCell>
                                <TableCell className={styles.headTitle} >Name</TableCell>
                                <TableCell className={styles.headTitle} >Description</TableCell>
                                <TableCell className={styles.headTitle} >Image</TableCell>
                                <TableCell align='left' className={styles.headTitle} >Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody >


                            {events.length === 0 && <TableRow >
                                <TableCell colspan="7" style={{ "text-align": "center", }}>No Event Added yet</TableCell>
                            </TableRow>}

                            {events?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) =>
                            (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell className={styles.ind} align="left">{index + 1}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.email}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.rollno}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.createdTime}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.name}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.description}</TableCell>
                                    <TableCell className={styles.ind} component="th"><a href={item.imageURL}>IMAGE</a></TableCell>
                                    <TableCell component="th" align='center'>
                                        <Stack direction="row" spacing={0} sx={{ marginTop: '-15px' }}>

                                            <IconButton color="primary" aria-label="add to shopping cart"><DeleteIcon style={{ color: '#E53472' }} onClick={() => remove(item.id)} /></IconButton>
                                            {/* {item.adminverify === 0 && <IconButton color="primary" aria-label="add to shopping cart"><DoneOutlineIcon style={{ color: '#009EFF' }} onClick={() => approve(item.id)} /></IconButton>} */}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[7]}
                    component="div"
                    count={userss.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>



        </div>
    )
}

export default AdminBlogs