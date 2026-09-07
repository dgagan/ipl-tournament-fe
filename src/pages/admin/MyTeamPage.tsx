import { Avatar, Card, Container, Box, Button, Typography, LinearProgress, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import StatusChip from '../../components/StatusChip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import RejectTeamModal from './components/RejectTeamModal';
import RejectPlayerModal from './components/RejectPlayerModal';
import { useApproveTeam, useRejectTeam, useTeam, type TeamWithPlayersResponse } from '../../api/teams.api';
import { useParams } from 'react-router-dom';
import { getAgeFromDob, getApprovedPlayers } from '../../utils/helpers';
import { useApprovePlayer, useRejectPlayer, type PlayerResponse } from '../../api/players.api';

const TeamReviewPage = () => {
      const params = useParams();
      const [openRejectTeam, setOpenRejectTeam] = useState(false);
      const [rejectPlayerTarget, setRejectPlayerTarget] = useState<PlayerResponse | null>(null);

        const { mutate: getMyTeam } = useTeam();
        const { mutate: approveTeam } = useApproveTeam();
        const { mutate: rejectTeam } = useRejectTeam();
        const { mutate: approvePlayer } = useApprovePlayer();
        const { mutate: rejectPlayer } = useRejectPlayer();
        const [team, setTeam] = useState<TeamWithPlayersResponse>();
      
        useEffect(() => {
          getMyTeam(params?.id ?? '', {
            onSuccess: (data) => {
              setTeam(data);
            }
          })
        }, [getMyTeam])

        const updatePlayerState = (updatedPlayer: PlayerResponse) => {
          setTeam((prev) => prev && ({
            ...prev,
            players: prev.players?.map((player) =>
              player.id === updatedPlayer.id ? updatedPlayer : player
            ),
          }));
        }

const handleApprovePlayer = (playerId: string) =>{
approvePlayer(playerId,{
  onSuccess:(data:PlayerResponse)=> updatePlayerState(data)
})
}

const handleApproveTeam = () => {
  approveTeam(params?.id ?? '', {
    onSuccess: (data) => {
      setTeam((prev) => prev && ({ ...prev, status: data.status }));
    }
  })
}

const handleRejectTeam = (remarks: string) => {
  rejectTeam({ id: params?.id ?? '', remarks }, {
    onSuccess: (data) => {
      setTeam((prev) => prev && ({ ...prev, status: data.status, rejectionRemarks: data.rejectionRemarks }));
      setOpenRejectTeam(false);
    }
  })
}

const handleRejectPlayer = (remarks: string) => {
  if (!rejectPlayerTarget) return;
  rejectPlayer({ id: rejectPlayerTarget.id, remarks }, {
    onSuccess: (data) => {
      updatePlayerState(data);
      setRejectPlayerTarget(null);
    }
  })
}
  return (
    <Container className='flex justify-center flex-col items-center'>
      <Card className='w-full p-4 flex gap-4 justify-between max-w-12xl mt-8'>
        <Box className='flex gap-4 items-center'>
          <Avatar />
          <Box>
            <Box className='flex gap-4 items-center'><Typography variant="h6">{team?.name}</Typography><StatusChip status={team?.status} /></Box>
            <Typography variant="body2">{team?.school?.name} . Coach: {team?.coach?.name}</Typography>
          </Box>
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
              Approval Progress
            </Typography>
            <Typography variant="body2"
              color="text.secondary"
              className='mr-2'>
              {getApprovedPlayers(team?.players)} of 15 players approved· minimum 11 required
            </Typography>
          </Box>
          <Box className='flex items-center'>
            <Box className='w-full mr-2'>
              <LinearProgress
                variant="determinate"
                min={0}
                max={15}
                value={getApprovedPlayers(team?.players)}
              />
            </Box>
          </Box>
        </div>
      </Card>

      <Card className='w-full p-4 flex flex-col gap-4 justify-between max-w-12xl mt-8'>
        <Box className="flex justify-between items-center w-full">
          <Typography variant="h5">Players({team?.players?.length})</Typography>
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
                  {
                    row.status === "PENDING"? <> <CheckCircleIcon className='cursor-pointer text-green-500' onClick={()=>handleApprovePlayer(row?.id)}/>
                    <CancelIcon className='cursor-pointer text-red-500' onClick={()=>setRejectPlayerTarget(row)}/></>:row.status
                  }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openRejectTeam && <RejectTeamModal open={openRejectTeam} onClose={()=> setOpenRejectTeam(false)} teamName={team?.name ?? ''} players={team?.players ?? []} onConfirm={handleRejectTeam}/>}
        {rejectPlayerTarget && <RejectPlayerModal open={!!rejectPlayerTarget} onClose={()=> setRejectPlayerTarget(null)} playerName={rejectPlayerTarget.name} onConfirm={handleRejectPlayer}/>}
        <Box className='flex justify-end mt-4 gap-4'>
         
          <Button color="error" variant="outlined" className='mr-4' disabled={team?.status==="APPROVED"} onClick={()=> setOpenRejectTeam(true)}>
            Reject Team
          </Button>
           <Button variant="contained" color="primary" className='ml-4' disabled={(getApprovedPlayers(team?.players) ?? 0) < 11} onClick={handleApproveTeam}>
            Approve Team
          </Button>
        </Box>
      </Card>
    </Container>
  )
}

export default TeamReviewPage