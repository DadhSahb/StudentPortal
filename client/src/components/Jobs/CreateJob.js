import React, { useRef, useState } from 'react'
import styles from './CreateJob.module.css'
import TextField from '@mui/material/TextField';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateJob() {
    const formRef = useRef();
    const [selected, setSelected] = useState('fullTime')
    const user = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate()


    const handleJob = (e) => {
        e.preventDefault()

        function getTime() {
            var date = new Date()
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            return date.toISOString();
        }

        let yourDate = getTime();
        yourDate = yourDate.toString().split("T");
        yourDate[1] = yourDate[1].toString().split(".")[0];
        yourDate = yourDate.toString().replaceAll(",", " ");

        let data = {
            rollno: user.years + "-" + user.department + "-" + user.rollno,
            vaccancies: formRef.current.vaccancies.value,
            title: formRef.current.title.value,
            description: formRef.current.description.value,
            jobType: selected,
            minExperience: formRef.current.minExperience.value,
            createdTime: yourDate,
            skills: formRef.current.skills.value,
        }
        console.log(data)
        axios.post("http://localhost:5000/api/jobs", data, { withCredentials: true })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    toast.success('Job Published Succesfully', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }).catch((err) => {
                if (err.status === 500) {
                    toast.error('Cannot Publish Job', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
    }

    const handleChange = (e) => {
        setSelected(e.target.value)
        console.log(e.target.value)
    }


    return (
        <div className={styles.Main}>
            <div className={styles.h1}><h1>POST A JOB</h1></div>
            <form className={styles.formContainer} ref={formRef} onSubmit={(e) => handleJob(e)}>
                <TextField className={styles.input} required name='title' id="outlined-basic" label="J O B T I T L E" size='small' variant="outlined" />
                <TextField className={styles.input} required name='vaccancies' InputProps={{ inputProps: { min: 1 } }} id="outlined-basic" label="VACCANCIES" size='small' type="number" variant="outlined" />
                <TextField className={styles.inputDescription} required name='description' multiline rows={9} id="outlined-basic" label="JOB DESCRIPTION" size='small' type="number" variant="outlined" />
                <div className={styles.radio}>
                    <FormLabel id="demo-radio-buttons-group-label">Job Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="fullTime"
                        name="radio-buttons-group"
                        required
                        onChange={handleChange}
                        value={selected}
                    >
                        <FormControlLabel value="fullTime" control={<Radio size="small" />} label="Full Time" />
                        <FormControlLabel value="partTime" control={<Radio size="small" />} label="Part Time" />
                        <FormControlLabel value="remote" control={<Radio size="small" />} label="Remote" />
                    </RadioGroup>
                </div>
                <TextField className={styles.input2} required name='minExperience' InputProps={{ inputProps: { min: 1 } }} id="outlined-basic" label="Min Exp (years)" size='small' type="number" variant="outlined" />
                <TextField className={styles.inputDescription} required name='skills' multiline rows={4} id="outlined-basic" label="Skills Required" size='small' type="number" variant="outlined" />
                <div className={styles.footer}>
                    <button type='submit'>Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreateJob