import React from 'react';
import styles from './VerifyEmail.module.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyEmail() {
    let { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

    const verifyEmailHandler = () => {
        axios
            .post('http://localhost:5000/api/emailVerification', { id })
            .then(function (response) {
                if (response.status === 200) {
                    toast.success('Email verified', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setTimeout(function () {
                        navigate('/');
                    }, 3700); //run this after 3 seconds.
                }
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    toast.error('Email Already verified', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setTimeout(function () {
                        navigate('/');
                    }, 5700); //run this after 3 seconds.
                }
            });
    };

    return (
        <div className={styles.Main}>
            <div className={styles.EmailVerifyImage}>
                {/* <img src={image} alt="logo"></img> */}
            </div>
            <div className={styles.EmailVerifyContainer}>
                <h3 className={styles.p}>Click button below to verify your email.</h3>
                <button onClick={verifyEmailHandler} className={styles.Button}>
                    Verify Email
                </button>
            </div>
        </div>
    );
}

export default VerifyEmail;
