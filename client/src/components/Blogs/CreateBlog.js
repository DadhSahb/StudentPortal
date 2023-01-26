import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
import styles from './CreateBlog.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Storage } from "./../Utils/firebase";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"

function CreateBlog() {
    const navigate = useNavigate()
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [file, setfile] = useState('');
    const user = useSelector((state) => state.user.userInfo);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")



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
            userId: user.id,
            email: user.email,
            rollno: user.years + "-" + user.department + "-" + user.rollno,
            name: name,
            description: description,
            imageURL: imageURL,
            createdTime: yourDate
        }
        if (imageURL === '') {
            toast.error('Please Add Picture', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        else {

            axios.post("http://localhost:5000/api/AddBlog", data, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success('Blogs added successfully', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                }).catch((err) => {
                    if (err) {
                        console.log(err);
                        toast.error('Cannot Add Blog', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                })
        }

    }

    const fileHandler = async (e) => {
        setImage(e.target.files[0]);
        const last_dot = e.target.files[0].name.lastIndexOf('.')
        const ext = e.target.files[0].name.slice(last_dot + 1)
        const name = e.target.files[0].name.slice(0, last_dot)


        if (file == null)
            return;

        console.log(file);
        toast(0, { autoClose: false, toastId: 1 })

        try {
            console.log("uploading")
            const storageRef = ref(Storage, `/courseImages/${e.target.files[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
            console.log("uploaded");
            uploadTask.on('state_changed',
                (snapshot) => {
                    const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    toast.update(1, {
                        // position: toast.POSITION.TOP_CENTER,
                        render: 'Uploading ' + p.toFixed(0) + '%',
                    });
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setImageURL(url);
                        toast.update(1, {
                            type: toast.TYPE.SUCCESS,
                            render: 'File uploaded',
                            autoClose: 1000
                        });
                    });
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className={styles.Main} onSubmit={handleJob}>

            <div className={styles.imageContainer}>
                {/* <img src={user.img} /> */}

                <div className={styles.h1}><h1>ADD AN BLOG</h1></div>
                <div className={styles.joinss}>
                    <img style={{ width: '100px', height: '100px' }} src={imageURL === "" ? "https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-127465079.jpg" : imageURL}></img>
                    <div className={styles.haha} >
                        <label for="files" class="btn">Choose Image</label>
                        <input accept=".png,.jpg,.jpeg,.jfif" onChange={fileHandler} id="files" style={{ visibility: "hidden" }} type="file" />
                    </div>
                </div>
            </div>
            <div className={styles.formContainer}  >
                <TextField className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required name='title' id="outlined-basic" label="B L O G - T I T L E" size='small' variant="outlined" />
                <TextField className={styles.inputDescription} value={description} onChange={(e) => setDescription(e.target.value)} required name='description' multiline rows={9} id="outlined-basic" label="BLOG DESCRIPTION" size='small' type="number" variant="outlined" />
            </div>
            <div className={styles.footer}>
                <button type='submit'>ADD</button>
            </div>
        </form>
    )
}

export default CreateBlog