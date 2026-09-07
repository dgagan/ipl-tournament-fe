import { Card, CardContent, CardHeader, Container, FormControl, InputAdornment, TextField } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCoach } from '../../api/coaches.api';
import type { CoachMeResponse } from '../../api/coaches.api';
import { useEffect, useState } from 'react';
import { useCreateTeam } from '../../api/teams.api';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const createTeamSchema = z.object({
  name: z.string(),
  logoUrl: z.string().optional(),
});

type createTeamFormValues = z.infer<typeof createTeamSchema>

const CreateTeam = () => {
  const navigate = useNavigate();
  const [coach, setCoach] = useState<CoachMeResponse>();
  const { mutate: getLoggedInCoach } = useCoach();
  const { mutate: createTeam } = useCreateTeam();


  const {
    register,
    handleSubmit
  } = useForm<createTeamFormValues>(
    {
      resolver: zodResolver(createTeamSchema),
      defaultValues: { name: '', logoUrl: '' }
    }
  )


  useEffect(() => {
    getLoggedInCoach(undefined, {
      onSuccess: (data) => {
        console.log(data);
        setCoach(data);
      }
    })
  }, []);

  const handleCreateTeam = (values: createTeamFormValues) => {
    createTeam(values,{
      onSuccess:(data)=> {
        navigate('/update-team/'+data.id)
      },
    })
  }

  return (
    <Container className='flex justify-center items-center h-screen'>

      <Card className='w-full max-w-xl'>
        <CardHeader
          title="Create Your Team"
          subheader="One team per school. This can't be changed once submitted for review."
        />
        <CardContent className=" flex flex-col gap-4">
          <FormControl fullWidth>
            <TextField value={coach?.school.name ?? ''} disabled slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolIcon />
                  </InputAdornment>
                ),
              },
            }} />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              {...register('name')}
              label="Team Name"
              placeholder="Enter team name"
              helperText="Must be unique across the tournament"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                },
              }} />
          </FormControl>

          <FormControl fullWidth>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                {...register('logoUrl')}
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </FormControl>

          <Button
            component="label"
            role={undefined}
            variant="contained"
            onClick={handleSubmit(handleCreateTeam)}

          >Create Team</Button>

        </CardContent>
      </Card>
    </Container>
  )
}

export default CreateTeam