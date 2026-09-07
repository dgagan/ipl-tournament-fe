import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material'
import RegisterForm from './components/RegisterForm'
import FormHeader from './components/FormHeader'
import FormFooter from './components/FormFooter'
import { useEffect, useState } from 'react'
import { useSchools, type GetAllSchoolsResponse } from '../../api/schools.api'


const RegisterPage = () => {
    const [schools, setSchools] = useState<GetAllSchoolsResponse[]|[]>([]);

    const { mutate: getAllSchools, } = useSchools();

    useEffect(() => {
        getAllSchools(undefined, {
            onSuccess: (data) => setSchools(data),
        });
    }, [
        getAllSchools
    ])
    return (
        <Container className='flex justify-center items-center h-screen'>

            <Card className='w-full max-w-md'>
                <FormHeader />
                <CardContent>
                    <RegisterForm schools={schools} />
                    <FormFooter />
                </CardContent>
            </Card>

        </Container>
    )
}

export default RegisterPage