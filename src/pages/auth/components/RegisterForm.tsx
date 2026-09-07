import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRegister } from '../../../api/auth.api'
import { labels } from '../constants'
import type { GetAllSchoolsResponse } from '../../../api/schools.api'

const registerSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Enter a valid phone number'),
    schoolId: z.string().min(1, 'School is required'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterForm = ({ schools = [] }: {
    schools: GetAllSchoolsResponse[]
}) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: '', password: '', name: '', phone: '', schoolId: '' },
    })

    const { mutate: registerUser, isPending, error } = useRegister()

    return (
        <Container component="form" className='flex flex-col gap-4' onSubmit={handleSubmit((values) => registerUser(values))}>
            <TextField
                label={labels.name}
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder="eg. John Doe"
                {...register('name')}
            />
            <TextField
                label={labels.email}
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message || labels.emailHelperText}
                {...register('email')}
            />
            <TextField
                label={labels.password}
                variant="outlined"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
            />
            <TextField
                label={labels.phone}
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                placeholder="eg. 9876543210"
                {...register('phone')}
            />
            <FormControl fullWidth error={!!errors.schoolId}>
                <InputLabel id="school-label">{labels.school}</InputLabel>
                <Controller
                    name="schoolId"
                    control={control}
                    render={({ field }) => (
                        <Select labelId="school-label" label="School" {...field}>
                            {schools.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>

            {error && <Typography color="error">{error.message}</Typography>}

            <Button type="submit" variant="contained" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit'}
            </Button>


        </Container>
    )
}

export default RegisterForm
