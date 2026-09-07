import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { useAuth } from '../auth/AuthContext';

const NavBar = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const isCoach = user?.role === 'COACH';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: isCoach ? "primary.main" : "#263238" }} >
            <Container className="w-full" maxWidth="xl">
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minWidth: '100%',

                }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SPL - School Premier League
                    </Typography>

                    {isAuthenticated && user && (
                        <Box className="flex items-center gap-8">
                            <Typography>{
                                isCoach ? 'Coach Panel' : 'Admin Panel'
                            }</Typography>

                            <Box className="flex items-center gap-2">
                                <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>
                                <Typography variant="body2" className="ml-2">
                                    {user.email}
                                </Typography>
                                <Tooltip title="Logout">
                                    <IconButton color="inherit" onClick={handleLogout}>
                                        <LogoutIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar
