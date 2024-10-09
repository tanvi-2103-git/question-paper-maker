import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ThemeProvider } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function Nav() {
    // const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const[isAuthenticated,setIsAuthenticated] = React.useState(false);
    // const isAuthenticated = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setIsAuthenticated(false);
        navigate('/login');
      };
   
      React.useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

    }, []);
    return (
   <>
   <AppBar position="static" sx={{ backgroundColor: '#343131' }}>
            <Toolbar>
                <Typography variant="h6"  sx={{  marginLeft: 2 , marginRight: 2}}>
                    MyApp
                </Typography>
                <Box display="flex" sx={{ flexGrow: 1 }}>
                  
                    <Button color="inherit" component={Link} to="/">
                     {/* Dashboard
            <DashboardIcon /> */}
             Home
        
                    </Button>
                    
                </Box>
                {isAuthenticated?<Button color="inherit" variant="contained" onClick={logout}>
                    Logout
                </Button>:<Button color="inherit" variant="contained" component={Link} to="/login">
                    Login
                </Button>}
        
                {/* <Button color="inherit" variant="contained" component={Link} to="/register">
                    Login
                </Button> */}
            </Toolbar>
        </AppBar>
   </>
    );
}
