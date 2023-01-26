import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import styles from './ManageUsers.module.css'

function ManageUsers() {
    const [userss, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getdata = () => {
        axios.get("http://localhost:5000/api/getAllUsers", { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                setUsers(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getdata()
    }, [])

    const approve = (id) => {
        console.log(id);
        const data = {
            id: id
        }
        axios.post("http://localhost:5000/api/approveUser", data)
            .then(function (response) {
                console.log(response);
                getdata()
            })
            .catch(function (error) { console.log(error); })
    }

    const remove = (id) => {
        console.log(id);
        const data = {
            id: id
        }
        axios.post("http://localhost:5000/api/removeUser", data)
            .then(function (response) {
                console.log(response);
                getdata()
            })
            .catch(function (error) { console.log(error); })
    }

    return (
        <div className={styles.Main}>


            <div className={styles.heads}>

                <h1>Assignment</h1>
            </div>

            <div className={styles.okok}>
                <div className={styles.headss}><p>USERS</p></div>
                <TableContainer   >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" color="#F7F6F2">


                        <TableHead sx={{ color: 'white' }}>
                            <TableRow >
                                <TableCell className={styles.headTitle} >#</TableCell>
                                <TableCell className={styles.headTitle} >Name</TableCell>
                                <TableCell className={styles.headTitle} >Email</TableCell>
                                {/* <TableCell className={styles.headTitle} >Resgistration No</TableCell> */}
                                <TableCell className={styles.headTitle} >Admin Verified</TableCell>
                                <TableCell align='left' className={styles.headTitle} >Approve/Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody >


                            {userss.length === 0 && <TableRow >
                                <TableCell colspan="7" style={{ "text-align": "center", }}>No Assignment Uploaded yet</TableCell>
                            </TableRow>}

                            {userss?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) =>
                            (
                                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell className={styles.ind} align="left">{index + 1}</TableCell>
                                    <TableCell className={styles.ind} component="th" scope="row"><b>{item.name}</b></TableCell>
                                    <TableCell className={styles.ind} component="th">{item.email}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.years + '-' + item.department + "-" + item.rollno}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.emailverify === 1 ? 'YES' : 'NO'}</TableCell>
                                    <TableCell className={styles.ind} component="th">{item.adminverify === 1 ? 'YES' : 'NO'}</TableCell>
                                    <TableCell component="th" align='left'>
                                        <Stack direction="row" spacing={0} sx={{ marginTop: '-15px' }}>

                                            <IconButton color="primary" aria-label="add to shopping cart"><DeleteIcon style={{ color: '#E53472' }} onClick={() => remove(item.id)} /></IconButton>
                                            {item.adminverify === 0 && <IconButton color="primary" aria-label="add to shopping cart"><DoneOutlineIcon style={{ color: '#009EFF' }} onClick={() => approve(item.id)} /></IconButton>}
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

export default ManageUsers
