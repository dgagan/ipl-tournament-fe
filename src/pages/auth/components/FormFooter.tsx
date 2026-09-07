import { Divider, Typography } from '@mui/material'

const FormFooter = () => {

    const isSignInPage = window.location.pathname === '/login';
    return (
        <div className="mt-4">
            <Divider>OR</Divider>
            <Typography variant="body2" color="textSecondary" align="center" className="mt-4">
                {isSignInPage ? 'Don\'t have an account?' : 'Already have an account?'} 
                <a href={isSignInPage ? '/register' : '/login'} className="text-blue-500">
                    {isSignInPage ? 'Register' : 'Sign In'}
                </a>
            </Typography>
        </div>
    )
}

export default FormFooter