import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import axios from 'axios';
import baseURL from '../common/baseUrl';
import { ToastContainer, toast } from 'react-toastify';

function ProfileDetails() {
  const [isUpdated, setIsUpdated] = useState(false);
  let userDetails = JSON.parse(localStorage.getItem('user'));

  const [userData, setUserData] = useState({
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    mobile: userDetails.mobile,
  });

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsUpdated(true);
  };

  const updateProfile = async (event) => {
    event.preventDefault();

    if (isUpdated) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .patch(`${baseURL}updateProfile`, userData, config)
        .then((response) => {
          setIsUpdated(false);
          toast.success('updated Successfully ... ');
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((err) => {
          toast.error('Profile details update failed');
        });
    }
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid xs={12} sm={12}>
        <h3 style={{ textAlign: 'center' }}>Profile</h3>
      </Grid>
      <ToastContainer />
      <Grid
        xs={12}
        sm={8}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ padding: 10 }}
      >
        <Grid container className="profGrid">
          <Grid xs={12} sm={12}>
            <p style={{ color: 'blue', fontSize: 14, fontWeight: 500 }}>
              * First Name
            </p>
          </Grid>
          <Grid xs={12} sm={12}>
            <TextField
              defaultValue={userDetails.first_name}
              name="first_name"
              id="standard-basic"
              variant="standard"
              style={{ width: '90%' }}
              onChange={(e) => onChange(e)}
            />
          </Grid>
        </Grid>
        <Grid container className="profGrid">
          <Grid xs={12} sm={12}>
            <p style={{ color: 'blue', fontSize: 14, fontWeight: 500 }}>
              * Last Name
            </p>
          </Grid>
          <Grid xs={12} sm={12}>
            <TextField
              defaultValue={userDetails.last_name}
              name="last_name"
              id="standard-basic"
              variant="standard"
              style={{ width: '90%' }}
              onChange={(e) => onChange(e)}
            />
          </Grid>
        </Grid>
        <Grid container className="profGrid">
          <Grid xs={12} sm={12}>
            <p style={{ color: 'blue', fontSize: 14, fontWeight: 500 }}>
              * Email
            </p>
          </Grid>
          <Grid xs={12} sm={12}>
            <TextField
              defaultValue={userDetails.email}
              disabled
              name="email"
              id="standard-basic"
              variant="standard"
              style={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container className="profGrid">
          <Grid xs={12} sm={12}>
            <p style={{ color: 'blue', fontSize: 14, fontWeight: 500 }}>
              * Mobile
            </p>
          </Grid>
          <Grid xs={12} sm={12}>
            <TextField
              defaultValue={userDetails.mobile}
              name="mobile"
              id="standard-basic"
              variant="standard"
              style={{ width: '90%' }}
              onChange={(e) => onChange(e)}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={12}
          className="profGrid"
        >
          <Button
            onClick={updateProfile}
            style={{ backgroundColor: '#00539F', color: '#FFF' }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileDetails;
