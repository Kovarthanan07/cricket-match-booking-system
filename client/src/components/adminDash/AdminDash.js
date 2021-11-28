import React, { useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  CardContent,
  Button,
} from '@mui/material';
import { Icon, Paper, Card } from '@material-ui/core';
import CampaignIcon from '@mui/icons-material/Campaign';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { useHistory } from 'react-router-dom';
import './adminDash.css';

function AdminDashboard() {
  let history = useHistory();

  return (
    <Container maxWidth="lg" style={{ backgroundColor: '#FFF', marginTop: 20 }}>
      <Typography fontSize={35} style={{ textAlign: 'center', padding: 20 }}>
        Admin Dashboard
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
          }}
          item
          xs={12}
          sm={6}
          lg={4}
        >
          <Paper
            elevation={3}
            container
            item
            alignItems="center"
            justifyContent="center"
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 260,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: { height: 1, width: 1 },
            }}
          >
            <Grid
              container
              className="gridAdminCard"
              item
              alignItems="center"
              justifyContent="center"
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 260,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: { height: 1, width: 1 },
              }}
              onClick={() => {
                history.push('/announce-form');
              }}
            >
              <CampaignIcon
                style={{ justifyContent: 'center' }}
                alignItems="center"
                fontSize="large"
              />
              <Typography>NEWS</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          container
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
          }}
          item
          xs={12}
          sm={6}
          lg={4}
        >
          <Paper
            elevation={3}
            container
            item
            alignItems="center"
            justifyContent="center"
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 260,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: { height: 1, width: 1 },
            }}
          >
            <Grid
              container
              className="gridAdminCard"
              item
              alignItems="center"
              justifyContent="center"
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 260,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: { height: 1, width: 1 },
              }}
              onClick={() => {
                history.push('/create-match');
              }}
            >
              <SportsCricketIcon
                style={{ justifyContent: 'center' }}
                alignItems="center"
                fontSize="large"
              />
              <Typography>MATCH</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          container
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
          }}
          item
          xs={12}
          sm={6}
          lg={4}
        >
          <Paper
            elevation={3}
            container
            item
            alignItems="center"
            justifyContent="center"
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 260,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: { height: 1, width: 1 },
            }}
          >
            <Grid
              container
              className="gridAdminCard"
              item
              alignItems="center"
              justifyContent="center"
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 260,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: { height: 1, width: 1 },
              }}
              onClick={() => {
                history.push('/create-ticket');
              }}
            >
              <LocalAtmIcon
                style={{ justifyContent: 'center' }}
                alignItems="center"
                fontSize="large"
              />
              <Typography>TICKET</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          container
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
          }}
          item
          xs={12}
          sm={6}
          lg={4}
        >
          <Paper
            elevation={3}
            container
            item
            alignItems="center"
            justifyContent="center"
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 260,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: { height: 1, width: 1 },
            }}
          >
            <Grid
              container
              className="gridAdminCard"
              item
              alignItems="center"
              justifyContent="center"
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 260,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: { height: 1, width: 1 },
              }}
              onClick={() => {
                history.push('/add-stadium');
              }}
            >
              <HouseboatIcon
                style={{ justifyContent: 'center' }}
                alignItems="center"
                fontSize="large"
              />
              <Typography>STADIUM</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          container
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
          }}
          item
          xs={12}
          sm={6}
          lg={4}
        >
          <Paper
            elevation={3}
            container
            item
            alignItems="center"
            justifyContent="center"
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 260,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: { height: 1, width: 1 },
            }}
          >
            <Grid
              container
              className="gridAdminCard"
              item
              alignItems="center"
              justifyContent="center"
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 260,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: { height: 1, width: 1 },
              }}
              onClick={() => {
                history.push('/users');
              }}
            >
              <SupervisedUserCircleIcon
                style={{ justifyContent: 'center' }}
                alignItems="center"
                fontSize="large"
              />
              <Typography>CUSTOMERS</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
