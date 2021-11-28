import React, { useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import EditModal from './EditModal';
import axios from 'axios';
import baseURL from '../common/baseUrl';

function Ticket() {
  const [isLoading, setIsLoading] = useState(true);
  const [allTickets, setAllTickets] = useState();
  const [deleteTicket, setDeleteTicket] = useState(null);

  const getAllTickets = async (req, res) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${baseURL}viewAllTicket`, config)
      .then((response) => {
        setAllTickets(response.data);
      })
      .catch((err) => {
        console.log('Error : ', err.message);
      });
  };

  useEffect(async () => {
    if (deleteTicket) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .delete(`${baseURL}deleteTicket/${deleteTicket._id}`, config)
        .then((response) => {
          setDeleteTicket(null);
        })
        .catch((err) => {
          console.log('Error : ', err.message);
        });
    }
    await getAllTickets();

    setIsLoading(false);
  }, [deleteTicket]);

  if (isLoading === false) {
    console.log('allTickets : ', allTickets);
  }

  const data = [
    {
      name: 'Announcement 01',
      price: 500,
      description: 'hudwduinuuuuuuuuuuuuuuuuuuuunefbefuef',
    },
    {
      name: 'Announcement 02',
      price: 2000,
      description: 'hudwduinuuuuuuuuuuuuuuuuuuuunefbefuef',
    },
  ];
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={12}
        sm={12}
      >
        <Typography
          variant="h5"
          style={{ textAlign: 'center', paddingTop: 20 }}
        >
          Ticket
        </Typography>
      </Grid>
      {isLoading
        ? null
        : allTickets.map((e) => (
            <Grid
              container
              xs={12}
              sm={8}
              style={{
                margin: 10,
                padding: 15,
                borderRadius: 10,
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              }}
            >
              <Grid
                xs={12}
                sm={12}
                style={{
                  borderBottomStyle: 'solid',
                  borderWidth: 1,
                  borderColor: '#969393',
                }}
              >
                <Typography variant="h6">{e.name}</Typography>
              </Grid>
              <Grid
                xs={12}
                sm={12}
                style={{
                  borderBottomStyle: 'solid',
                  borderWidth: 1,
                  borderColor: '#969393',
                }}
              >
                <Typography variant="h6">{e.price}</Typography>
              </Grid>
              <Grid xs={12} sm={12}>
                <Typography style={{ fontSize: 14 }}>
                  {e.description}
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-end"
                xs={12}
                sm={12}
              >
                <button onClick={() => setDeleteTicket(e)}>Delete</button>
                <EditModal ticket={e} />
              </Grid>
            </Grid>
          ))}
    </Grid>
  );
}

export default Ticket;
