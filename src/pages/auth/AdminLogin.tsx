import { Card, CardContent, Container } from '@mui/material'
import LoginForm from './components/LoginForm'
import FormHeader from './components/FormHeader'
const AdminLogin = () => {
    return (
        <Container className='flex justify-center items-center h-screen'>
            <Card className='w-full max-w-md'>
                <FormHeader title="Tournament Admin" subheader="Review and approve team & player submissions" />
                <CardContent>
                    <LoginForm  />
                </CardContent>
            </Card>
        </Container>
    )
}


export default AdminLogin