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
import {MenuItem, Select} from "@material-ui/core";

const theme = createTheme();

export default function AddBooking() {
    const history = useHistory();
    const [sellerCreateStatus, setSellerCreateStatus] = useState();
    const [error, setError] = useState();
    const [userId, setUserId] = useState();

    const [age, setAge] = React.useState('');
    const [ticket, setTicket] = React.useState('');

    const handleChange = (event) => {
        setTicket(event.target.value);
    };

    const handleChange1 = (event) => {
        setAge(event.target.value);
    };

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
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Match</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0}>Select Match</MenuItem>
                                        <MenuItem value={10}>Ind vs SL - 25-02-2021</MenuItem>
                                        <MenuItem value={20}>WI vs SL - 26-02-2021</MenuItem>
                                        <MenuItem value={30}>Ind vs Eng - 27-02-2021</MenuItem>
                                        <MenuItem value={30}>Ire vs SL - 28-02-2021</MenuItem>
                                        <MenuItem value={30}>Ind vs WI - 28-02-2021</MenuItem>
                                        <MenuItem value={30}>Scot vs SL - 29-02-2021</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Ticket</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ticket}
                                        label="Age"
                                        onChange={handleChange}
                                        defaultValue={10}
                                    >
                                        <MenuItem value={10}>Select Ticket type</MenuItem>
                                        <MenuItem value={20}>Golden</MenuItem>
                                        <MenuItem value={30}>Silver</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl sx={{width: '100%'}} variant="filled">
                                    <FilledInput
                                        autoComplete="place"
                                        name="ticket_count"
                                        required
                                        fullWidth
                                        id="ticket_count"
                                        label="ticket_count"
                                        autoFocus
                                        placeholder="Count"
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
                            style={{marginTop:20, backgroundColor:'blue'}}
                        >
                            Add Stadium
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}