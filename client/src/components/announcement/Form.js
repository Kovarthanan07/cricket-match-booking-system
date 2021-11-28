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
  TextareaAutosize,
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const [news, setNews] = useState();
  const [error, setError] = useState();
  const [userId, setUserId] = useState();

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      body: yup.string().required('News is required'),
    }),
    onSubmit: async (user) => {
      const data = {
        title: user.title,
        body: user.body,
      };
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .post(`${baseURL}createNews`, data, config)
        .then((response) => {
          toast.success('News created successfully.');
          setNews(response.data);
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
            style={{ textAlign: 'center', padding: 10 }}
          >
            Create New News
          </Typography>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Title
                  </InputLabel>
                  <FilledInput
                    autoComplete="title"
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                  {formik.errors.title ? (
                    <div className="text-danger">{formik.errors.title}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  {/*<InputLabel htmlFor="filled-adornment-password">Announcement</InputLabel>*/}
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={10}
                    placeholder="body place"
                    name="body"
                    id="body"
                    label="body"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    style={{ width: '100%' }}
                  />
                  {formik.errors.body ? (
                    <div className="text-danger">{formik.errors.body}</div>
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
              Publish News
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
