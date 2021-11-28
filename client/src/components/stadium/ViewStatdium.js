import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import axios from 'axios';
import baseURL from '../common/baseUrl';

export default function StadiumTable() {
  const [allStadium, setAllStadium] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteStadium, setDeleteStadium] = useState(null);

  const getAllStadium = async (req, res) => {
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
        setAllStadium(response.data);
      })
      .catch((err) => {
        console.log('Error : ', err.message);
      });
  };

  useEffect(async () => {
    if (deleteStadium) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .delete(`${baseURL}deleteStadium/${deleteStadium._id}`, config)
        .then((response) => {
          setDeleteStadium(null);
        })
        .catch((err) => {
          console.log('Error : ', err.message);
        });
    }
    await getAllStadium();
    setIsLoading(false);
  }, [deleteStadium]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid xs={12} sm={12}>
        <h3 style={{ textAlign: 'center' }}>Stadium Lists</h3>
      </Grid>
      <Grid xs={12} sm={8}>
        <TableContainer
          component={Paper}
          style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Stadium Name</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Capacity</TableCell>
                <TableCell align="right">City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? null
                : allStadium.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.country}</TableCell>
                      <TableCell align="right">{row.capacity}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">
                        <button
                          onClick={() => {
                            setDeleteStadium(row);
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                      <TableCell align="right">
                        <button>Update</button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
