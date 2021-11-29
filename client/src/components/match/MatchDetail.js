import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Team', headerName: 'Name', width: 150 },
    { field: 'Stadium', headerName: 'Venue', width: 150 },
    { field: 'Match_date', headerName: 'Match Date', width: 130 },
    {
        field: 'status',
        headerName: 'Viewers count',
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
    { id: 1, Team: 'Ind vs SL', Stadium: 'Dhuraiyapa',Match_date:"24-05-2021",status:'Cancelled', },
    { id: 2, Team: 'Eng vs Scot', Stadium: 'Premadasa', Match_date:"25-05-2021",status:'Finished', },
    { id: 3, Team: 'Ire vs Oman', Stadium: 'Pallakele', Match_date:"26-05-2021",status:'Future', },
    { id: 4, Team: 'SL vs WI', Stadium: 'Premadasa', Match_date:"27-05-2021",status:'Progress'},
    { id: 5, Team: 'Nz vs Aus', Stadium: 'SSC', Match_date:"28-05-2021",status:'Progress' },
    { id: 6, Team: 'SL vs Eng', Stadium: 'Premadasa', Match_date:"29-05-2021",status:'Progress'},
    { id: 7, Team: 'Ire vs Aus', Stadium: 'Pallakele', Match_date:"30-05-2021",status:'Progress', },
    { id: 8, Team: 'WI vs Ind', Stadium: 'Dhuraiyapa', Match_date:"01-06-2021",status:'Progress', },
    { id: 9, Team: 'Eng vs WI', Stadium: 'Premadasa', Match_date:"02-06-2021",status:'Progress' },
];

export default function MatchDetail() {
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" style={{ height: 500, width: '100%',padding:20 }}>
            <Grid xs={12} sm={12}>
                <h4 style={{textAlign:"center"}}>Scheduled Matches</h4>
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
