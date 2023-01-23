import { useState } from 'react';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';

import styles from "./signupmobile.module.css";
import axios from '../../../axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Divider } from '@mui/material';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { snackbarNotification } from '../../../redux/snackbar.action';
import { useDispatch } from 'react-redux';
const SignUpMobile = () => {

    const navigate = useNavigate();

    const [type, setType] = useState('ADVERTISER');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
const dispatch=useDispatch()
    const cookies = new Cookies();

    const validateInput = () => {
        let error = {};
        let formIsValid = true;

        // Name
        if (fullName.length <= 3) {
            formIsValid = false;
            error.fullName = "Name must have atleast 4 characters";
        } else if (!fullName.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            error.fullName = "Name must have letters only";
        }

        //Email
        if (email.length === 0) {
            formIsValid = false;
            error.email = "Email cannot be empty";
        } else {
            let lastAtPos = email.lastIndexOf("@");
            let lastDotPos = email.lastIndexOf(".");

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    email.indexOf("@@") === -1 &&
                    lastDotPos > 2 &&
                    email.length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                error.email = "Email is not Valid";
            }
        }

        // Password
        if (password.length <= 4) {
            formIsValid = false;
            error.password = "Password must have atleast 5 characters";
        } else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/)) {
            formIsValid = false;
            error.password = "Password must have at least one uppercase letter, one lowercase letter, one number and one special character";
        }

        // Confirm Password
        if (cpassword.length === 0) {
            formIsValid = false;
            error.cpassword = "Confirm Password cannot be empty";
        } else if (cpassword !== password) {
            error.cpassword = "Password and Confirm Password do not match";
        }

        setErrors(error);
        return formIsValid;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const isValid = validateInput();
        if (!isValid) {
            return;
        }

        const data = {
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: cpassword,
            userType: type
        };

        axios.post('/api/user/sign-up', data)
            .then(res => {
                cookies.set('auth-token', res?.data?.dataToSave?.jwtToken, { path: '/' });
                // navigate('/');
                const data={
                    notificationType: "success",
                notificationMessage: "You Are Registered Successfully",
                  }
                dispatch(snackbarNotification(data));
        navigate("/VerifyEmail");

            }).catch(err => {
                console.log('err', err);
            });
    }

    return (
        <div className='w-11/12 m-auto p-4 bg-[#F9F9F9] px-4 pl-10' >

            <div >
                <div >
                    <span style={{ width: "280px", fontWeight: 600, fontSize: "21px", fontWeight: "bold", fontFamily: "Inter" }} >Let's Get Started</span>
                </div>

                <div style={{ width: "272px", fontWeight: 400, fontSize: "12px", color: "black", lineHeight: "14.52px", marginTop: "5px", fontFamily: "Inter" }}>
                    <span >Already have an account? <Link style={{ color: "#108FB7" }} to='/'>Sign In <ArrowForwardIcon fontSize='12px' /></Link></span>
                </div>
                <form onSubmit={submitHandler}>
                    <div style={{ width: "295px", marginTop: "25px", fontWeight: 700, marginBottom: "24px" }} >
                        <p className={styles.caard}>Choose Your Account Type</p>

                    </div>
                    <div className={styles.inputs} >
                        <div onClick={() => setType('ADVERTISER')} className={styles.input} >
                            <label htmlFor='adv'>I'm an advertiser</label>
                            <input type='radio' name='account' className='round' id='adv' checked={type === 'ADVERTISER'} />
                        </div>
                        <div onClick={() => setType('PUBLISHER')} className={styles.input}>
                            <label htmlFor='pub'>I'm a publisher</label>
                            <input type='radio' name='account' className='round' id='pub' checked={type === 'PUBLISHER'} />
                        </div>
                    </div>

                    <div className={styles.caard}>
                        <p>Account Details</p>
                        <div style={{ marginTop: "24px" }} className={styles.inputs} >
                            <div className={styles.input}>
                                <input type='text' className={errors.fullName ? 'input-text err' : 'input-text'} placeholder='Full Name' value={fullName} onChange={e => setFullName(e.target.value)} />
                                <span className='error'>{errors.fullName}</span>
                            </div>
                            <div className={styles.input} >
                                <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                                <span >{errors.email}</span>
                            </div>
                        </div>
                        <div >
                            <div className={styles.input}>
                                < span style={{ display: "flex" }}>
                                    <input type={showPassword ? "text" : "password"}
                                        className={errors.password ? 'input-text err' : 'input-text'} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                                    <span style={{ marginTop: "3px", marginLeft: "-30px" }} onClick={() => setShowPassword(!showPassword)}>

                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </span>
                                </span>
                                <span className='error'>{errors.password}</span>
                            </div>
                            <div className={styles.input}>

                                < span style={{ display: "flex" }}>

                                    <input
                                        type={showConfPassword ? "text" : "password"}

                                        className={errors.cpassword ? 'input-text err' : 'input-text'} placeholder='Confirm Password' value={cpassword} onChange={e => setCpassword(e.target.value)} />
                                    <span style={{ marginTop: "3px", marginLeft: "-30px" }} onClick={() => setShowConfPassword(!showConfPassword)}>

                                        {showConfPassword ? <VisibilityOff /> : <Visibility />}
                                    </span>
                                </span>

                                <span className='error'>{errors.cpassword}</span>
                            </div>
                        </div>
                    </div>
                    <p >

                        By proceeding you agree to Koinpr terms and conditions

                    </p>
                    <div className='p-5'>

                        <Button type="submit" sx={{ marginTop: "2em", background: "black" }} variant='contained'>
                            Proceed<span><ArrowForwardIcon /></span>
                        </Button>
                    </div>
                </form>
            </div>
            <Divider variant='middle' sx={{ width: "93%", margin: "auto", height: "0.5em", marginTop: "1em", background: "black" }} />

            <p style={{ marginTop: "3em", fontSize: "14px" }}>

                All rights reserved by Koinpr Marketing Private Limited
            </p>
        </div>
    );
};

export default SignUpMobile;