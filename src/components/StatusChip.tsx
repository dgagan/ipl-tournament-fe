import Chip from '@mui/material/Chip'
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import type { TeamStatus } from '../api/teams.api';

const StatusChip = ({ status }: { status: TeamStatus | undefined }) => {
  return (
    <Chip
      icon={
        status === 'PENDING' ? <PendingIcon /> :
          status === 'APPROVED' ? <CheckCircleIcon /> : <ClearIcon />
      }
      label={status}
      color={status === 'PENDING' ? 'warning' : status === 'APPROVED' ? 'success' : 'error'}
    />
  )
}

export default StatusChip