import { useState } from 'react'
import { Box, Button, Divider, FormControl, Modal, TextField, Typography } from '@mui/material';
const RejectTeamModal = ({ open, onClose, teamName, players, onConfirm }: { open: boolean; onClose: () => void; teamName: string; players: any[]; onConfirm: (remarks: string) => void }) => {
    const [remarks, setRemarks] = useState('');

    const handleClose = () => onClose();
    const handleSave = () => {
        onConfirm(remarks);
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white border-2 border-white shadow-2xl p-8 w-full max-w-xl h-[450px] overflow-y-auto flex flex-col gap-4 justify-between">
                    <Typography id="modal-modal-title" variant="h5" component="h2" className='mb-8'>
                        Reject Team
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className='mb-4'>
                        {teamName} . {players.length} Players
                    </Typography>

                    <div className="text-[13px] text-[#5f2120] bg-[#fdeded] rounded py-2.5 px-3">
                        Rejecting this team will automatically reject all {players.length} players on its roster.
                    </div>


                    <FormControl fullWidth className='mt-4'>
                        <TextField name="reason" label="Rejection remarks" variant="outlined" className='w-full' multiline rows={4} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                    </FormControl>
                    <Divider className='my-4' />
                    <Box className="flex justify-end gap-4 mt-4">
                        <Button color="secondary" variant="outlined" className='mt-4 ml-4' onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" className='mt-4' onClick={handleSave} disabled={!remarks.trim()}>
                            Confirm Rejection
                        </Button>
                    </Box>
                  
                </Box>
            </Modal>
        </>
    )
}

export default RejectTeamModal