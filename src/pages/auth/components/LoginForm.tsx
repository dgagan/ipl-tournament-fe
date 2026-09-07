import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useLogin } from '../../../api/auth.api'
import { useAuth } from '../../../auth/AuthContext'

const loginSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>
 
const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: ''},
    })

    const navigate = useNavigate()
    const { login } = useAuth()
    const { mutate: loginUser, isPending, error } = useLogin()

    const onSubmit = handleSubmit((values) =>
        loginUser(values, {
            onSuccess: ({ accessToken }) => {
                const user = login(accessToken)
                navigate(user.role === 'ADMIN' ? '/admin-dashboard' : '/create-team')
            },
        })
    )

    return (
        <Container component="form" className='flex flex-col gap-4' onSubmit={onSubmit}>
            <TextField
                label="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
            />
            <TextField
                label="password"
                variant="outlined"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
            />


            {error && <Typography color="error">{error.message}</Typography>}

            <Button type="submit" variant="contained" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit'}
            </Button>
        </Container>
    )
}

export default LoginForm