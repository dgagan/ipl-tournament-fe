import { Card, CardContent, Container } from '@mui/material'
import LoginForm from './components/LoginForm'
import FormHeader from './components/FormHeader'
import FormFooter from './components/FormFooter'
const LoginPage = () => {
    return (
        <Container className='flex justify-center items-center h-screen'>
            <Card className='w-full max-w-md'>
                <FormHeader />
                <CardContent>
                    <LoginForm  />
                    <FormFooter/>
                </CardContent>
            </Card>
        </Container>
    )
}

export default  LoginPage