import React, { useState } from 'react'
import steps from './../../Assets/undraw_icons_wdp4.svg'
import icons from './../../Assets/undraw_icons_wdp4.svg'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useDispatch } from "react-redux";
import { userActions } from "../Redux/user-slice"


function Auth() {
    const [change, setChange] = useState(false)
    const [year, setYear] = useState("FA01")
    const [department, setDepartment] = useState("BBA")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const MailService = async (data) => {
        console.log("IN MAILSERVICE FUNCTION");

        data.link = 'http://localhost:3000/emailVerification/' + data.id;
        data.from_name = 'ALUMNI ASSOCIATION'
        emailjs
            .send('service_vimsp8b', 'template_mkl0oq6', data, '_skPtTuhpdi0bie5x')
            .then(
                (result) => {
                    console.log(result.text);
                    toast.success('Success', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            rollno: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string()
                .required('Valid email required')
                .email('Valid email required'),
            password: Yup.string().required('Password is required'),
            confirmpassword: Yup.string().required('Confirm Password is required').oneOf(
                [Yup.ref('password'), null],
                'Passwords must match'
            ),
            rollno: Yup.string().required('Roll No is required')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            console.log(department);
            console.log(year);

            axios.post('http://localhost:5000/api/signup', {
                name: values.username,
                email: values.email,
                password: values.password,
                role: 'user',
                year: year,
                department: department,
                rollno: values.rollno,
            },)
                .then(function (response) {
                    console.log(response);
                    if (response?.status === 200) {
                        console.log(response.data)
                        MailService(response.data);
                        toast.success('Check your Email to verify', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        navigate('/');
                    } else if (response?.response?.status === 400) {
                        toast.error('Account with this email already exists', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                })
                .catch(function (error) {
                    if (error.response.status === 400) {
                        toast.error('Account with this email already exists', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    } else if (error.response.status === 500) {
                        toast.error('Error Registering User', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                });
        },
    });

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(inputs)
        let data = {
            email: inputs.username,
            password: inputs.password,
        };
        axios
            .post("http://localhost:5000/api/login", data)

            .then(function (response) {
                // console.log(response.data.user);
                let obj = response.data.user;
                obj.token = response.data.token;
                console.log(obj);
                // dispatch(userActions.userInfo(obj));
                if (obj.emailverify === 0) {
                    toast.error("Verify your Email First", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }

                if (obj.emailverify === 1 && obj.adminverify === 0) {
                    toast.error("Wait for Admin Approval", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }

                if (obj.emailverify === 1 && obj.adminverify === 1) {
                    dispatch(userActions.userInfo(obj));
                    if (obj.role === "admin") {
                        console.log('admin');
                        navigate("/AdminDashboard");
                    }
                    if (obj.role === "user") {
                        // navigate("/Jobs");
                        navigate("/UserDashboard");
                        console.log('student');
                    }
                }

                // navigate(from, { replace: true });
            })
            .catch(function (error) {
                if (error?.response?.request?.status === 400) {
                    toast.error("Wrong Combination", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                if (error?.response?.request?.status === 403) {
                    toast.error("Wrong Combination", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            });
    }

    return (
        <div className="body">

            {/* //SIGNUP */}
            <div id="container" className={change ? "container sign-up" : "container sign-in"}>
                <div className="row">
                    <section className="col align-items-center flex-col sign-up">
                        <div className="form-wrapper align-items-center">
                            <form className="form sign-up" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                                <div className="input-group">
                                    <i className="bx bxs-user"></i>
                                    <input type="text" id="username"
                                        placeholder="Full Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username} />

                                </div>
                                {formik.touched.username && formik.errors.username ? (
                                    <p className="error" >{formik.errors.username}</p>
                                ) : null}
                                <div className="input-group">
                                    <i className="bx bx-mail-send"></i>
                                    <input type="email" id="email"
                                        placeholder="Email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email} />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                    <p className="error" >{formik.errors.email}</p>
                                ) : null}
                                <div className="input-group2">
                                    <select onChange={(e) => setYear(e.target.value)}>
                                        <option value="FA01">FA01</option>
                                        <option value="FA02">FA02</option>
                                        <option value="FA03">FA03</option>
                                        <option value="FA04">FA04</option>
                                        <option value="FA05">FA05</option>
                                        <option value="FA06">FA06</option>
                                        <option value="FA07">FA07</option>
                                        <option value="FA08">FA08</option>
                                        <option value="FA09">FA09</option>
                                        <option value="FA10">FA10</option>
                                        <option value="FA11">FA11</option>
                                        <option value="FA12">FA12</option>
                                        <option value="FA13">FA13</option>
                                        <option value="FA14">FA14</option>
                                        <option value="FA15">FA15</option>
                                        <option value="FA16">FA16</option>
                                        <option value="FA17">FA17</option>
                                        <option value="FA18">FA18</option>
                                        <option value="FA19">FA19</option>
                                        <option value="FA20">FA20</option>
                                        <option value="FA21">FA21</option>
                                        <option value="FA22">FA22</option>
                                        <option value="SP02">SP02</option>
                                        <option value="SP03">SP03</option>
                                        <option value="SP04">SP04</option>
                                        <option value="SP05">SP05</option>
                                        <option value="SP06">SP06</option>
                                        <option value="SP07">SP07</option>
                                        <option value="SP08">SP08</option>
                                        <option value="SP09">SP09</option>
                                        <option value="SP10">SP10</option>
                                        <option value="SP11">SP11</option>
                                        <option value="SP12">SP12</option>
                                        <option value="SP13">SP13</option>
                                        <option value="SP14">SP14</option>
                                        <option value="SP15">SP15</option>
                                        <option value="SP16">SP16</option>
                                        <option value="SP17">SP17</option>
                                        <option value="SP18">SP18</option>
                                        <option value="SP19">SP19</option>
                                        <option value="SP20">SP20</option>
                                        <option value="SP21">SP21</option>
                                        <option value="SP22">SP22</option>
                                    </select>

                                    <select onChange={(e) => setDepartment(e.target.value)}>
                                        <option value="BBA">BBA</option>
                                        <option value="BBS">BBS</option>
                                        <option value="BCE">BCE</option>
                                        <option value="BCS">BCS</option>
                                        <option value="BDS">BDS</option>
                                        <option value="BEC">BEC</option>
                                        <option value="BEN">BEN</option>
                                        <option value="BES">BES</option>
                                        <option value="BIT">BIT</option>
                                        <option value="BMT">BMT</option>
                                        <option value="BS (CE)">BS (CE)</option>
                                        <option value="BS (CE)">BS (CE)</option>
                                        <option value="BSE">BSE</option>
                                        <option value="BTN">BTN</option>
                                        <option value="BTY">BTY</option>
                                        <option value="CVE">CVE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="EPE">EPE</option>
                                        <option value="ERS">ERS</option>
                                        <option value="GEO">GEO</option>
                                        <option value="HUM">HUM</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCS">MCS</option>
                                        <option value="MDS">MDS</option>
                                        <option value="MIT">MIT</option>
                                        <option value="PBT">PBT</option>
                                        <option value="PCM">PCM</option>
                                        <option value="PCS">PCS</option>
                                        <option value="PDS">PDS</option>
                                        <option value="PEE">PEE</option>
                                        <option value="PES">PES</option>
                                        <option value="PGO">PGO</option>
                                        <option value="PHM">PHM</option>
                                        <option value="PMS">PMS</option>
                                        <option value="PPY">PPY</option>
                                        <option value="PSY">PSY</option>
                                        <option value="R05">R05</option>
                                        <option value="RBA">RBA</option>
                                        <option value="RBF">RBF</option>
                                        <option value="RBT">RBT</option>
                                        <option value="RCM">RCM</option>
                                        <option value="RCP">RCP</option>
                                        <option value="RCS">RCS</option>
                                        <option value="RCT">RCT</option>
                                        <option value="RCV">RCV</option>
                                        <option value="RDS">RDS</option>
                                        <option value="REC">REC</option>
                                        <option value="REE">REE</option>
                                        <option value="REN">REN</option>
                                        <option value="RER">RER</option>
                                        <option value="RES">RES</option>
                                        <option value="RMB">RMB</option>
                                        <option value="RMS">RMS</option>
                                        <option value="RMT">RMT</option>
                                        <option value="RPM">RPM</option>
                                        <option value="RPY">RPY</option>
                                        <option value="RSW">RSW</option>
                                    </select>

                                    <input type="number" placeholder="Roll No" id="rollno"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.rollno} />
                                </div>
                                {formik.touched.rollno && formik.errors.rollno ? (
                                    <p className="error" >{formik.errors.rollno}</p>
                                ) : null}

                                <div className="input-group">
                                    <i className="bx bxs-lock-alt"></i>
                                    <input type="password" id="password"
                                        placeholder="Password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password} />
                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <p className="error" >{formik.errors.password}</p>
                                ) : null}
                                <div className="input-group" >
                                    <i className="bx bxs-lock-alt"></i>
                                    <input type="password"
                                        id="confirmpassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmpassword}
                                        placeholder="Confirm password" />
                                </div>
                                {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                    <p className="error" >{formik.errors.confirmpassword}</p>
                                ) : null}
                                <button type='submit'>Sign up</button>
                                <p>
                                    <span>Already have an account? </span>
                                    <b className="pointer" onClick={() => setChange(false)}> Sign in </b>
                                </p>
                            </form>
                        </div>
                    </section>


                    {/* //LOGIN */}
                    <section className="col align-items-center flex-col sign-in">
                        <div className="form-wrapper align-items-center">
                            <form onSubmit={handleLogin} className="form sign-in">
                                <div className="input-group">
                                    <i className="bx bxs-user"></i>
                                    <input onChange={handleChange} name='username' value={inputs.username} type="email" required placeholder="Email" />
                                </div>
                                <div className="input-group">
                                    <i className="bx bxs-lock-alt"></i>
                                    <input onChange={handleChange} name='password' value={inputs.password} type="password" required placeholder="Password" />
                                </div>
                                <button type='submit'>Sign in</button>
                                {/* <p><b>Forgot password?</b></p> */}
                                <p>
                                    <span>Don't have an account? </span>
                                    <b className="pointer" onClick={() => setChange(true)}> Sign up</b>
                                </p>
                            </form>
                        </div>
                    </section>
                </div>

                {/* THIRD */}
                <section className="row content-row">
                    <div className="col align-items-center flex-col">
                        <div className="text sign-in">
                            <h2>Alumni Association</h2>
                        </div>
                        <div className="img sign-in">
                            <img src={steps} alt="welcome" />
                        </div>
                    </div>
                    <div className="col align-items-center flex-col">
                        <div className="img sign-up">
                            <img src={icons} alt="welcome" />
                        </div>
                        <div className="text sign-up">
                            <h2>Alumni Association</h2>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}

export default Auth