import { Avatar, Card, Container, Box, Button, Typography, LinearProgress, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import StatusChip from '../../components/StatusChip'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import AddPlayer from './AddPlayer';
import { useMyTeam, type TeamWithPlayersResponse } from '../../api/teams.api';
import { getAgeFromDob } from '../../utils/helpers';
const MyTeamPage = () => {
  const { mutate: getMyTeam } = useMyTeam();
  const [team, setTeam] = useState<TeamWithPlayersResponse>();
  const [openAddPlayer, setOpenAddPlayer] = useState(false); 

  useEffect(() => {
    getMyTeam(undefined, {
      onSuccess: (data) => {
        setTeam(data);
      }
    })
  }, [getMyTeam])

  return (
    <Container className='flex justify-center flex-col items-center'>
      <Card className='w-full p-4 flex gap-4 justify-between max-w-12xl mt-8'>
        <Box className='flex gap-4 items-center'>
          <Avatar />
          <Box>
            <Box className='flex gap-4 items-center'><Typography variant="h6">{team?.name}</Typography><StatusChip status={team?.status} /></Box>
            <Typography variant="body2">{team?.school.name} . Coach: {team?.coach?.name}</Typography>
          </Box>
        </Box>
        <Box>
          {/* <Button color="primary" variant="outlined">
            Edit Team
          </Button> */}
        </Box>
      </Card>


      <Card className='w-full p-4 flex gap-4 justify-between max-w-12xl mt-8'>
        <div className='w-full'>
          <Box className='flex items-center justify-between mb-2'>
            <Typography
              variant="body2"
              color="text.secondary"
              className='mr-2'
            >
              Roster Progress
            </Typography>
            <Typography variant="body2"
              color="text.secondary"
              className='mr-2'>
              {team?.players.length} of 15 players · minimum 11 required to submit
            </Typography>
          </Box>
          <Box className='flex items-center'>
            <Box className='w-full mr-2'>
              <LinearProgress
                variant="determinate"
                min={0}
                max={15}
                value={team?.players.length}
              />
            </Box>
          </Box>
        </div>
      </Card>

      <Card className='w-full p-4 flex flex-col gap-4 justify-between max-w-12xl mt-8'>
        <Box className="flex justify-between items-center w-full">
          <Typography variant="h5">Players</Typography>
          <Button color="primary" variant="contained" className='mt-4' startIcon={<AddIcon />} onClick={() => setOpenAddPlayer(true)}>
            Add Player
          </Button>
        </Box>


        <TableContainer
          component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell >Name</TableCell>
                <TableCell >Jersey No#</TableCell>
                <TableCell >Age</TableCell>
                <TableCell >Status</TableCell>
                <TableCell >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team?.players.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.photoUrl ? <Avatar src={row.photoUrl} /> : <Avatar>{row.name.charAt(0)}</Avatar>}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell >{row.jerseyNo}</TableCell>
                  <TableCell >{getAgeFromDob(row.dob)}</TableCell>
                  <TableCell > {row.status}</TableCell>
                  <TableCell >
                    <EditIcon className='cursor-pointer' />
                    <DeleteIcon className='cursor-pointer' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {
        openAddPlayer && <AddPlayer open={openAddPlayer} onClose={() => setOpenAddPlayer(false)} />
      }
    </Container>
  )
}

export default MyTeamPage