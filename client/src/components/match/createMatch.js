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
import { useFormik, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import baseURL from '../common/baseUrl';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function CreateMatch() {
  const history = useHistory();
  const [sellerCreateStatus, setSellerCreateStatus] = useState();
  const [venue, setVenue] = useState([]);
  const [userId, setUserId] = useState();

  const handleChangeVenue = (e) => {
    setVenue(e.target.value);
  };

  const getAllVenue = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${baseURL}viewAllStadiums`, config)
      .then((response) => {
        setVenue(response.data);
      })
      .catch((err) => {
        console.log('Error : ', err.message);
        console.log('Unable access ...');
      });
  };

  useEffect(async () => {
    await getAllVenue();
  }, []);

  const formik = useFormik({
    initialValues: {
      venue: '',
      match_date: '',
      viewers_count: '',
      playing_teams: [],
      status: '',
    },
    validationSchema: yup.object({
      venue: yup.string().required('Venue is required'),
      match_date: yup.string().required('Date is required'),
      viewers_count: yup.string().required('Viewers count is required'),
      playing_teams: yup.string().required('Teams is required'),
      status: yup.string().required('Status is required'),
    }),
    onSubmit: async (user) => {
      const data = {
        venue: user.venue,
        match_date: user.match_date,
        viewers_count: user.viewers_count,
        playing_teams: user.playing_teams,
        status: user.status,
      };
      console.log('data : ', data);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .post(`${baseURL}createMatch`, data, config)
        .then((response) => {
          toast.success('Match created successfully.');
          setUserId(response.data);
          setSellerCreateStatus('success');
        })
        .catch((err) => {
          toast.success('Failed to post.');
          setSellerCreateStatus('fail');
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
            Schedule Match
          </Typography>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <TextField
                    id="venue"
                    name="venue"
                    select
                    fullWidth
                    label="Select Venue"
                    onChange={(e) => handleChangeVenue(e)}
                    value={formik.values.venue}
                    helperText="Please select your venue"
                    variant="outlined"
                  >
                    {venue.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <FilledInput
                    required
                    fullWidth
                    id="match_date"
                    name="match_date"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.match_date}
                  />
                  {formik.errors.match_date ? (
                    <div className="text-danger">
                      {formik.errors.match_date}
                    </div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Viewers count
                  </InputLabel>
                  <FilledInput
                    required
                    fullWidth
                    id="viewers_count"
                    label="viewers_count"
                    name="viewers_count"
                    autoComplete="viewers_count"
                    onChange={formik.handleChange}
                    value={formik.values.viewers_count}
                  />
                  {formik.errors.viewers_count ? (
                    <div className="text-danger">
                      {formik.errors.viewers_count}
                    </div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Playing teams
                  </InputLabel>
                  <FilledInput
                    autoComplete="place"
                    name="playing_teams"
                    required
                    fullWidth
                    id="playing_teams"
                    label="playing teams"
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.playing_teams}
                  />
                  {formik.errors.playing_teams ? (
                    <div className="text-danger">
                      {formik.errors.playing_teams}
                    </div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    status
                  </InputLabel>
                  <FilledInput
                    autoComplete="status"
                    name="status"
                    required
                    fullWidth
                    id="status"
                    label="status"
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.status}
                  />
                  {formik.errors.status ? (
                    <div className="text-danger">{formik.errors.status}</div>
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
              Schedule Match
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
