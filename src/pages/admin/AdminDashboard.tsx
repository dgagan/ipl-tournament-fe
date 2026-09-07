
import { Avatar, InputAdornment, TextField, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Container, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useTeams } from '../../api/teams.api';
import type { TeamWithPlayersResponse } from '../../api/teams.api';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState<TeamWithPlayersResponse[]>();
    const {
        mutate: getAllTeams
    } = useTeams();

useEffect(()=>{
    getAllTeams(undefined, {
        onSuccess: data=> setTeams(data)
    })
},[getAllTeams])
    return (
        <Container className='flex justify-center p-4 w-full flex-col items-center'>
            <Box className="flex items-center justify-between w-full p-4">
                <Box>
                    <Typography variant="h5">Team submissions</Typography>
                    <Typography>Review and approve teams across all registered schools</Typography>
                </Box>
                <TextField
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start"><SearchIcon /></InputAdornment>
                            )
                        }
                    }}
                    placeholder="Search teams"
                />
            </Box>


            <TableContainer
                component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell >Team Name</TableCell>
                            <TableCell >Coach Name</TableCell>
                            <TableCell >Players</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.logoUrl ? <Avatar src={row.logoUrl} /> : <Avatar>{row.name.charAt(0)}</Avatar>}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row?.name}
                                </TableCell>
                                <TableCell >{row?.coach?.name}</TableCell>
                                <TableCell >{row?.players?.length}</TableCell>
                                <TableCell > {row.status}</TableCell>
                                <TableCell >
                                    <Button onClick={()=> navigate('/review-team/'+row.id)}>{row.status==="PENDING"?'REVIEW':'VIEW'}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    )
}

export default AdminDashboard