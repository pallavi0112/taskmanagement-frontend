import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, Box, Button, Grid, TextField , Checkbox, FormControlLabel} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { UserLogin } from '../../features/LoginSlice';
import {useCookies} from 'react-cookie'

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['taskManagement']);
    const {token} = useSelector((state)=>state.auth)
    const loginState = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState(loginState.status.login)
    const initialValues = {
        email: '',
        password: '',
    };
    const style = {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#131229'
    };


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('email is required'),
        password: Yup.string().required('password is required'),
    });
    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        const formData = new FormData()
        formData.append('email', values.email)
        formData.append('password', values.password)
        dispatch(UserLogin(formData))
        resetForm();

    };
    useEffect(() => {
        setStatus(loginState.status.login)
        if (loginState.status.login === 'success') {
            toast.success('Successfully login !', {
                position: toast.POSITION.TOP_RIGHT
            });
            setCookie('token', token , { path: '/' });
            localStorage.setItem('isloggedIn' , true)
            setTimeout(()=>{
                navigate('/')
            },2000)
        }
    }, [loginState.status.login , token])
    return (
        <Box sx={style}>
            {<ToastContainer />}
            <div className="form-container register">
                <h3 className='form-heading'>Login</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, handleSubmit }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <MdEmail sx={{ color: 'action.active', mr: 1.5, my: 0.5 }} className='form-icon' />
                                        <TextField
                                            id="email"
                                            label="Email"
                                            name="email"
                                            variant="standard"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Box>
                                    <ErrorMessage name="email" component="div" className="error-msg" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', position: "relative" }}>

                                        <FaLock sx={{ color: 'action.active', mr: 1.5, my: 0.5 }} className='form-icon' />
                                        <TextField
                                            // fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            variant="standard"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                        {showPassword ? <FaEyeSlash
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                right: "5%",
                                                color: "#f2f2fc",
                                            }}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword} />
                                            : <FaEye
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: "5%",
                                                    color: "#f2f2fc",
                                                }}
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            />}
                                    </Box>
                                    <ErrorMessage name="password" component="div" className="error-msg" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="isremeberme"
                                                checked={values.isremeberme}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        }
                                        label="Is remeber me?"
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" variant="contained" className="task-btn">
                                {status === 'loading' ? <span class="loader"></span> : 'Login'}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className='isalreadyExit'>Don't you have an a account ? <Link to="/register">Sign Up</Link></p>
            </div>
        </Box>

    )
}

export default LoginForm