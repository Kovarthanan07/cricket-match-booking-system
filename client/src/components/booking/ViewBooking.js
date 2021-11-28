import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import axios from 'axios';
import baseURL from '../common/baseUrl';

const columns = [
  { field: 'match.playing_teams', headerName: 'Name', width: 150 },
  { field: 'ticket.name', headerName: 'Ticket type', width: 150 },
  { field: 'ticket_count', headerName: 'Ticket count', width: 130 },
  {
    field: 'viewers_count',
    headerName: 'Viewers count',
    type: 'String',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'String',
    width: 220,
  },
];

const rows = [
  {
    id: 1,
    name: 'Snow',
    venue: 'Jon',
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
  {
    id: 2,
    name: 'Lannister',
    venue: 'Cersei',
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
  {
    id: 3,
    name: 'Lannister',
    venue: 'Jaime',
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
  {
    id: 4,
    lastName: 'Stark',
    venue: 'Arya',
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
  {
    id: 5,
    name: 'Targaryen',
    venue: 'Daenerys',
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
  {
    id: 6,
    name: 'Melisandre',
    venue: null,
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
  {
    id: 7,
    name: 'Clifford',
    venue: 'Ferrara',
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
  {
    id: 8,
    name: 'Frances',
    venue: 'Rossini',
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
  {
    id: 9,
    name: 'Roxie',
    venue: 'Harvey',
    match_date: '24-05-2021',
    viewers_count: 5,
    playing_teams: 'India vs SL',
    status: 'Progress',
  },
];

export default function ViewBooking() {
  const [allBooking, setAllBooking] = useState();
  const [isLoading, setIsLoading] = useState();

  const getAllBooking = async (req, res) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${baseURL}viewAllMyBooking`, config)
      .then((response) => {
        setAllBooking(response.data);
      })
      .catch((err) => {
        console.log('Error : ', err.message);
      });
  };

  useEffect(async () => {
    await getAllBooking();
    setIsLoading(false);
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ height: 500, width: '100%', padding: 20 }}
    >
      <Grid xs={12} sm={12}>
        <h4 style={{ textAlign: 'center' }}>Booked Details</h4>
      </Grid>
      {isLoading ? null : (
        <DataGrid
          rows={allBooking}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          checkboxSelection
        />
      )}
    </Grid>
  );
}
