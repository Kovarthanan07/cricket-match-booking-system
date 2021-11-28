import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid} from "@mui/material";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'venue', headerName: 'Venue', width: 150 },
    { field: 'match_date', headerName: 'Match Date', width: 130 },
    {
        field: 'viewers_count',
        headerName: 'Viewers count',
        type: 'String',
        width: 150,
    },
    {
        field: 'playing_teams',
        headerName: 'Playing teams',
        type: 'String',
        width: 220,
    },
    {
        field: 'address',
        headerName: 'Address',
        sortable: false,
        width: 300,
    },

];

const rows = [
    { id: 1, name: 'Snow', venue: 'Jon',match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress', },
    { id: 2, name: 'Lannister', venue: 'Cersei', match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress', },
    { id: 3, name: 'Lannister', venue: 'Jaime', match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress', },
    { id: 4, lastName: 'Stark', venue: 'Arya', match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress'},
    { id: 5, name: 'Targaryen', venue: 'Daenerys', match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress' },
    { id: 6, name: 'Melisandre', venue: null, match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress'},
    { id: 7, name: 'Clifford', venue: 'Ferrara', match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress', },
    { id: 8, name: 'Frances', venue: 'Rossini', match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress', },
    { id: 9, name: 'Roxie', venue: 'Harvey', match_date:"24-05-2021",viewers_count:5, playing_teams: 'India vs SL',status:'Progress' },
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
