import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Team', headerName: 'team', width: 150 },
  { field: 'Type', headerName: 'Type', width: 150 },
  { field: 'count_ticket', headerName: 'Count Ticket', width: 130 },
  {
    field: 'status',
    headerName: 'Status',
    type: 'String',
    width: 150,
  },
  {
    field: 'update',
    headerName: 'Update',
    width: 150,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const onClick = () => {
        const api = params.api;
        const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c);
        const thisRow = {};

        fields.forEach((f) => {
          thisRow[f] = params.getValue(f);
        });

      };

      return (
          <Button color="primary" onClick={onClick}>
            Update
          </Button>
      );
    },
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 150,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const onClick = () => {
        const api = params.api;
        const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c);
        const thisRow = {};

        fields.forEach((f) => {
          thisRow[f] = params.getValue(f);
        });

      };

      return (
          <Button color="secondary" onClick={onClick}>
            Delete
          </Button>
      );
    },
  },

];

const rows = [
  { id: 1, Team: 'Ind vs SL', Type: 'Golden',count_ticket:5,status:'Cancelled', },
  { id: 2, Team: 'Eng vs Scot', Type: 'Silver', count_ticket:2,status:'Finished', },
  { id: 3, Team: 'Ire vs Oman', Type: 'Golden', count_ticket:6,status:'Future', },
  { id: 4, Team: 'SL vs WI', Type: 'Silver', count_ticket:2,status:'Progress'},
  { id: 5, Team: 'Nz vs Aus', Type: 'Golden', count_ticket:5,status:'Progress' },
  { id: 6, Team: 'SL vs Eng', Type: 'Silver', count_ticket:8,status:'Progress'},
  { id: 7, Team: 'Ire vs Aus', Type: 'Golden', count_ticket:15,status:'Progress', },
  { id: 8, Team: 'WI vs Ind', Type: 'Golden', count_ticket:7,status:'Progress', },
  { id: 9, Team: 'Eng vs WI', Type: 'Silver', count_ticket:6,status:'Progress' },
];

export default function MatchDetail() {
  return (
      <Grid container direction="row" justifyContent="center" alignItems="center" style={{ height: 500, width: '100%',padding:20 }}>
        <Grid xs={12} sm={12}>
          <h4 style={{textAlign:"center"}}>Booking Details</h4>
        </Grid>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
        />
      </Grid>
  );
}
