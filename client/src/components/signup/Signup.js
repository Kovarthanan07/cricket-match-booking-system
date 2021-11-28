import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './Signup.css';
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
import baseURL from "../common/baseUrl";
import {FilledInput, FormControl, IconButton, InputAdornment, InputLabel} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function SignUp() {
    const history = useHistory();
    const [sellerCreateStatus, setSellerCreateStatus] = useState();
    const [error, setError] = useState();
    const [userId, setUserId] = useState();

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            role: '',
            mobile: '',
            password: '',
            confirm_password: '',
            email: '',
            address_line_1: '',
            address_line_2: '',
            city: '',

        },
        validationSchema: yup.object({
            first_name: yup.string().required('First Name is required'),
            last_name: yup.string().required('Last Name is required'),
            role: yup.string().required('Role Name is required'),
            mobile: yup.string().required('Mobile Number is required'),
            email: yup.string().email().required('Email is required'),
            address_line_1: yup.string().required('Address is required'),
            city: yup.string().required('City is required'),
            password: yup.string().required('Old Password is required'),
            confirm_password: yup
                .string()
                .oneOf(
                    [yup.ref('password'), null],
                    'Password and confirm password must be same'
                )
                .required('Confirm Password is required'),
        }),
        onSubmit: async (user) => {

            const data = {
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                mobile: user.mobile,
                password: user.password,
                email: user.email,
                address_line_1: user.address_line_1,
                address_line_2: user.address_line_2,
                city: user.city,
            }
            console.log(data)
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios
                .post(`${baseURL}createCustomer`, data, config)
                .then((response) => {
                    toast.success('Customer created successfully. ')
                    setUserId(response.data)
                    setSellerCreateStatus('success')
                })
                .catch((err) => {
                    setSellerCreateStatus('fail');
                    if (err.response.status === 402) {
                        toast.error("Mobile number already exist. Please try another.")
                    } else if (err.response.status === 403) {
                        toast.error("Email already exist. Please try another.")
                    } else {
                        toast.error(err.message)
                    }
                });

        }
    });

    const [values, setValues] = React.useState({
        password: '',
        confirm_password: '',
        showPassword: false,
        showConfirm_password: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirm_password: !values.showConfirm_password,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm" style={{padding: 10}}>
                <CssBaseline/>
                <ToastContainer/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form autoComplete="off" onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">First Name</InputLabel>
                                        <FilledInput
                                            autoComplete="first_name"
                                            name="first_name"
                                            required
                                            fullWidth
                                            id="first_name"
                                            label="First Name"
                                            autoFocus
                                            onChange={formik.handleChange}
                                            value={formik.values.first_name}
                                        />
                                        {formik.errors.first_name ? (
                                            <div className="text-danger">
                                                {formik.errors.first_name}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Last Name</InputLabel>
                                        <FilledInput
                                            required
                                            fullWidth
                                            id="last_name"
                                            label="Last Name"
                                            name="last_name"
                                            autoComplete="lname"
                                            onChange={formik.handleChange}
                                            value={formik.values.last_name}
                                        />
                                        {formik.errors.last_name ? (
                                            <div className="text-danger">
                                                {formik.errors.last_name}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Role</InputLabel>
                                        <FilledInput
                                            required
                                            fullWidth
                                            id="role"
                                            label="role"
                                            name="role"
                                            autoComplete="role"
                                            onChange={formik.handleChange}
                                            value={formik.values.role}
                                        />
                                        {formik.errors.role ? (
                                            <div className="text-danger">
                                                {formik.errors.role}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Mobile</InputLabel>
                                        <FilledInput
                                            required
                                            fullWidth
                                            id="mobile"
                                            label="Mobile Number"
                                            name="mobile"
                                            autoComplete="mobile"
                                            onChange={formik.handleChange}
                                            value={formik.values.mobile}
                                        />
                                        {formik.errors.mobile ? (
                                            <div className="text-danger">
                                                {formik.errors.mobile}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                                        <FilledInput
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                        />
                                        {formik.errors.email ? (
                                            <div className="text-danger">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-password"
                                            name="password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {formik.errors.password ? (
                                            <div className="text-danger">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-confirm-password">Confirm
                                            Password</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-confirm-password"
                                            name="confirm_password"
                                            type={values.showConfirm_password ? 'text' : 'password'}
                                            onChange={formik.handleChange}
                                            value={formik.values.confirm_password}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showConfirm_password ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {formik.errors.confirm_password ? (
                                            <div className="text-danger">
                                                {formik.errors.confirm_password}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Address 1</InputLabel>
                                        <FilledInput
                                            autoComplete="address_line_1"
                                            name="address_line_1"
                                            required
                                            fullWidth
                                            id="address_line_1"
                                            label="Address Line 1"
                                            autoFocus
                                            onChange={formik.handleChange}
                                            value={formik.values.address_line_1}
                                        />
                                        {formik.errors.address_line_1 ? (
                                            <div className="text-danger">
                                                {formik.errors.address_line_1}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Address 2</InputLabel>
                                        <FilledInput
                                            required
                                            fullWidth
                                            id="address_line_2"
                                            label="Address Line 2"
                                            name="address_line_2"
                                            autoComplete="address_line_2"
                                            onChange={formik.handleChange}
                                            value={formik.values.address_line_2}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl sx={{width: '100%'}} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">City</InputLabel>
                                        <FilledInput
                                            autoComplete="place"
                                            name="city"
                                            required
                                            fullWidth
                                            id="city"
                                            label="Place Name"
                                            autoFocus
                                            onChange={formik.handleChange}
                                            value={formik.values.city}
                                        />
                                        {formik.errors.city ? (
                                            <div className="text-danger">
                                                {formik.errors.city}
                                            </div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                // onClick={() => {history.push("/verify")}}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
            </Container>
        </ThemeProvider>
    );
}