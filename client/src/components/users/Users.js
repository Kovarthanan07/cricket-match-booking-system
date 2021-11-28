import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import axios from 'axios';
import baseURL from '../common/baseUrl';

const columns = [
  { field: 'first_name', headerName: 'First name', width: 200 },
  { field: 'last_name', headerName: 'Last name', width: 200 },
  { field: 'mobile', headerName: 'Mobile', width: 200 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'String',
    width: 220,
  },
];

export default function DataTable() {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${baseURL}allCustomers`, config)
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => {
        console.log('Error : ', err.message);
        console.log('Unable access ...');
      });
  };

  useEffect(async () => {
    await getAllUsers();
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
        <h4 style={{ textAlign: 'center' }}>All Customers Details</h4>
      </Grid>

      {isLoading ? null : (
        <DataGrid
          rows={allUsers}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          //   checkboxSelection
        />
      )}
    </Grid>
  );
}
