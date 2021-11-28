import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
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
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function CreateTicket() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('name is required'),
      price: yup.string().required('price is required'),
      description: yup.string().required('description is required'),
    }),
    onSubmit: async (user) => {
      const data = {
        name: user.name,
        price: user.price,
        description: user.description,
      };
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .post(`${baseURL}createTicket`, data, config)
        .then((response) => {
          toast.success('Buyer created successfully.');
        })
        .catch((err) => {
          toast.error(err.message);
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
            Add Ticket for Customer
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
                    Price
                  </InputLabel>
                  <FilledInput
                    required
                    fullWidth
                    id="price"
                    label="price"
                    name="price"
                    autoComplete="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                  {formik.errors.price ? (
                    <div className="text-danger">{formik.errors.price}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Description
                  </InputLabel>
                  <FilledInput
                    required
                    fullWidth
                    id="description"
                    label="description"
                    name="description"
                    autoComplete="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  {formik.errors.description ? (
                    <div className="text-danger">
                      {formik.errors.description}
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
