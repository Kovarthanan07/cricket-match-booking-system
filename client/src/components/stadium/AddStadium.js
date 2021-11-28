import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../signup/Signup.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import baseURL from '../common/baseUrl';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function AddStadium() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: '',
      country: '',
      capacity: '',
      city: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      country: yup.string().required('Country is required'),
      capacity: yup.string().required('Capacity is required'),
      city: yup.string().required('City is required'),
    }),
    onSubmit: async (user) => {
      const data = {
        name: user.name,
        country: user.country,
        capacity: user.capacity,
        city: user.city,
      };
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .post(`${baseURL}createStadium`, data, config)
        .then((response) => {
          toast.success('Stadium added successfully.');
        })
        .catch((err) => {
          toast.error('fail');
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" style={{ paddingTop: 40 }}>
        <CssBaseline />
        <ToastContainer />
        <Box>
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: 'center', paddingBottom: 10 }}
          >
            Add Stadium
          </Typography>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Name
                  </InputLabel>
                  <FilledInput
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Country
                  </InputLabel>
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
                    <div className="text-danger">{formik.errors.country}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Capacity
                  </InputLabel>
                  <FilledInput
                    required
                    fullWidth
                    id="capacity"
                    label="Capacity"
                    name="capacity"
                    autoComplete="capacity"
                    onChange={formik.handleChange}
                    value={formik.values.capacity}
                  />
                  {formik.errors.capacity ? (
                    <div className="text-danger">{formik.errors.capacity}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    City
                  </InputLabel>
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
                    <div className="text-danger">{formik.errors.city}</div>
                  ) : null}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              // onClick={() => {history.push("/verify")}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Stadium
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
