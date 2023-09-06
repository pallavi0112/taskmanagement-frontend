import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { Modal, Box, Button, Grid, TextField, FormControlLabel, Checkbox, Input, IconButton, InputAdornment, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openForm } from '../../features/commanSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,  useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BsFileImage } from 'react-icons/bs'
import { UserRegister } from '../../features/RegisterSlice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerState = useSelector((state)=>state.register)
    const passwordValidation = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16}).*$"
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [ user_pic , setUser_pic ] = useState()
    const [status , setStatus] = useState(registerState.status)
    const initialValues = {
        email: '',
        password: '',
        confirm_password: '',
        username: '',
        // user_pic: '',
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
    const handleClickShowPassword2 = () => setShowCPassword((show) => !show);

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('username is required'),
        email: Yup.string().email('Invalid email').required('email is required'),
        password: Yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .max(16, 'too long!')
            .matches(passwordValidation, "Please create a stronger password")
            .required('password is required'),
        confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),

        // user_pic: Yup.mixed().required("file is required"),
    });
    console.log( user_pic)
    const handleSubmit = (values, { resetForm }) => {
        const formData = new FormData()
        formData.append('username' , values.username)
        formData.append('email' , values.email)
        formData.append('password' , values.password)
        formData.append('user_pic' , user_pic)
        setUser_pic('')
        dispatch(UserRegister(formData))
        resetForm();

    };
    useEffect( ()=>{
        setStatus(registerState.status)
        if(registerState.status === "success"){
            navigate('/login')
        } 
    } , [registerState.status , registerState.error])
    return (

        <Box sx={style}>
            <div className="form-container register">
                <h3 className='form-heading'>Register</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, handleSubmit }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <FaUserAlt sx={{ color: 'action.active', mr: 1.5, my: 0.5 }} className='form-icon' />
                                        <TextField
                                            id="input-with-sx"
                                            // id="username"
                                            label="Username"
                                            name="username"
                                            variant="standard"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Box>
                                    <ErrorMessage name="username" component="div" className="error-msg" />
                                </Grid>
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
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <BsFileImage sx={{ color: 'action.active', mr: 1.5, my: 0.5 }} className='form-icon' />
                                        <TextField
                                            // fullWidth
                                            id="file"
                                            variant="standard"
                                            label="Profile Picture"
                                            name="user_pic"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => { setUser_pic(event.target.files[0])}} 
                                            // onBlur={handleBlur}

                                        />

                                    </Box>
                                    {/* <ErrorMessage name="user_pic" component="div" className="error-msg" /> */}
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
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', position: "relative" }}>
                                        <FaLock sx={{ color: 'action.active', mr: 1.5, my: 0.5 }} className='form-icon' />
                                        <TextField
                                            // fullWidth
                                            id="confirm_pswd"
                                            variant="standard"
                                            label="Confirm Password"
                                            name="confirm_password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.confirm_password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                        {showCPassword ? <FaEyeSlash
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                right: "5%",
                                                color: "#f2f2fc",
                                            }}
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2} />
                                            : <FaEye
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: "5%",
                                                    color: "#f2f2fc",
                                                }}
                                                onClick={handleClickShowPassword2}
                                                onMouseDown={handleMouseDownPassword2}
                                            />}
                                    </Box>
                                    <ErrorMessage name="confirm_password" component="div" className="error-msg" />
                                </Grid>
                            </Grid>
                            <Button type="submit" variant="contained" className="task-btn">
                                 {status === 'loading' ?<span class="loader"></span> : 'Sign Up'}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className='isalreadyExit'>Already have an a account ? <Link to="/login">Sign In</Link></p>
            </div>
        </Box>

    )
}

export default Register