import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import '../signup/Signup.css';
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

export default function AddBooking() {
    const history = useHistory();
    const [sellerCreateStatus, setSellerCreateStatus] = useState();
    const [error, setError] = useState();
    const [userId, setUserId] = useState();

    const formik = useFormik({
        initialValues: {
            customer: '',
            ticket: '',
            match: '',
            ticket_count: '',

        },
        validationSchema: yup.object({
            customer: yup.string().required('Customer is required'),
            ticket: yup.string().required('Ticket is required'),
            match: yup.string().required('Match is required'),
            ticket_count: yup.string().required('Ticket Count is required'),
        }),
        onSubmit: async (user) => {

            const data = {
                customer: user.customer,
                ticket: user.ticket,
                match: user.match,
                ticket_count: user.ticket_count,
            }
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios
                .post(`${baseURL}createAdmin`, data, config)
                .then((response) => {
                    toast.success('Buyer created successfully.')
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

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm" style={{paddingTop: 40}}>
                <CssBaseline/>
                <ToastContainer/>
                <Box>

                    <Typography component="h1" variant="h5" style={{textAlign:"center",paddingBottom:10}}>
                        Book for Match
                    </Typography>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{width: '100%'}} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Name</InputLabel>
                                    <FilledInput
                                        autoComplete="customer"
                                        name="customer"
                                        required
                                        fullWidth
                                        id="customer"
                                        label="Name"
                                        autoFocus
                                        onChange={formik.handleChange}
                                        value={formik.values.customer}
                                    />
                                    {formik.errors.customer ? (
                                        <div className="text-danger">
                                            {formik.errors.customer}
                                        </div>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{width: '100%'}} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Country</InputLabel>
                                    <FilledInput
                                        required
                                        fullWidth
                                        id="country"
                                        label="Country"
                                        name="country"
                                        autoComplete="country"
                                        onChange={formik.handleChange}
                                        value={formik.values.country}
                                    />
                                    {formik.errors.country ? (
                                        <div className="text-danger">
                                            {formik.errors.country}
                                        </div>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{width: '100%'}} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Ticket</InputLabel>
                                    <FilledInput
                                        required
                                        fullWidth
                                        id="ticket"
                                        label="ticket"
                                        name="ticket"
                                        autoComplete="ticket"
                                        onChange={formik.handleChange}
                                        value={formik.values.ticket}
                                    />
                                    {formik.errors.ticket ? (
                                        <div className="text-danger">
                                            {formik.errors.ticket}
                                        </div>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl sx={{width: '100%'}} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Match</InputLabel>
                                    <FilledInput
                                        autoComplete="place"
                                        name="match"
                                        required
                                        fullWidth
                                        id="match"
                                        label="match"
                                        autoFocus
                                        onChange={formik.handleChange}
                                        value={formik.values.match}
                                    />
                                    {formik.errors.match ? (
                                        <div className="text-danger">
                                            {formik.errors.match}
                                        </div>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl sx={{width: '100%'}} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Ticket count</InputLabel>
                                    <FilledInput
                                        autoComplete="place"
                                        name="ticket_count"
                                        required
                                        fullWidth
                                        id="ticket_count"
                                        label="ticket_count"
                                        autoFocus
                                        onChange={formik.handleChange}
                                        value={formik.values.ticket_count}
                                    />
                                    {formik.errors.ticket_count ? (
                                        <div className="text-danger">
                                            {formik.errors.ticket_count}
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
                            Add Stadium
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}