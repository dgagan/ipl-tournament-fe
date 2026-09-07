import { CardHeader,  Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { labels } from '../constants';
const FormHeader = ({title, subheader}:{
    title?: string,
    subheader?: string
}) => {
    const isSignInPage = window.location.pathname === '/login';
  return (
                <CardHeader
                    className="flex flex-col items-center text-center"
                    classes={{ avatar: "mr-0 mb-0" }}
                    avatar={
                        <AccountCircleIcon className="w-24 h-24" color="primary" />
                    }
                    title={
                        <Typography variant="h5" component="h2">
                            {title || (isSignInPage ? labels.SignInHeader : labels.FormHeader)}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" color="textSecondary">
                            {subheader || (isSignInPage ? labels.SignInSubHeader : labels.FormSubHeader)}
                        </Typography>
                    }
                />
  )
}

export default FormHeader