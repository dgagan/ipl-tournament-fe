import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePlayer } from '../../api/players.api';

const CreatePlayerSchema = z.object({
    name: z.string(),
    dob: z.string(),
    jerseyNo: z.number(),
    photoUrl: z.string()
});

type createPlayerFormValues = z.infer<typeof CreatePlayerSchema>


const AddPlayer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

    const {mutate: createTeamPlayer} = useCreatePlayer();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<createPlayerFormValues>(
        {
            resolver: zodResolver(CreatePlayerSchema),
            defaultValues:{
                name:'',
                dob:'',
                jerseyNo:0,
                photoUrl:''
            }
        }
    )
    const handleClose = () => onClose();
    const handleSave = (values: createPlayerFormValues) => {
        createTeamPlayer(values,{
            onSuccess: handleClose
        })
    }
    const handleInvalid = (formErrors: typeof errors) => {
        console.log(formErrors)
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white border-2 border-white shadow-2xl p-8 w-full max-w-xl h-[350px] overflow-y-auto flex flex-col gap-4 justify-between">
                    <Typography id="modal-modal-title" variant="h5" component="h2" className='mb-8'>
                        Add Player
                    </Typography>
                    <FormControl fullWidth className='mt-4'>
                        <TextField {...register('name')} label="Full Name" variant="outlined" className='w-full' />
                        <Box className="flex items-center justify-between gap-4 mt-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <Controller
                                        name="dob"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Date of Birth"
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                                                slotProps={{
                                                    textField: {
                                                        helperText: 'Age must be between 10–18 years',
                                                        onBlur: field.onBlur,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField label="Jersey Number" type="number" variant="outlined" className='w-1/3' helperText='Unique in team' {...register('jerseyNo', { valueAsNumber: true })} />
                        </Box>
                    </FormControl>
                    <Box className="flex justify-end gap-4 mt-4">
                        <Button color="secondary" variant="outlined" className='mt-4 ml-4' onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" className='mt-4' onClick={handleSubmit(handleSave, handleInvalid)}>
                            Save Player
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default AddPlayer