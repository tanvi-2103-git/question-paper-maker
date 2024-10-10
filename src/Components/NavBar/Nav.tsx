import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
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
import { getUserById } from '../../model/subCRUD';
import { User } from '../../class/user';
import { useEffect } from 'react';
// import image from "C:/Users/user/Desktop/Training/React/reactemployee-crud-app/src/media/profile.jfif";
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function Nav() {
    const [user, setUser]= React.useState<User>();
    // const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const[isAuthenticated,setIsAuthenticated] = React.useState(false);
     const user_id = localStorage.getItem('user_id');
    // const isAuthenticated = localStorage.getItem('token');
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setIsAuthenticated(false);
        navigate('/login');
      };
   
   async function getuser() {
    if( user_id){
     const result = await getUserById(user_id);
     
    
     
     setUser(result);
     }
   }
      useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        getuser();
        
    }, []);
    useEffect(() => {
        getuser();
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
                {isAuthenticated?<div><Button color="inherit" variant="contained" onClick={logout} style={{marginRight:"1rem"}}>
                    Logout
                </Button><div style={{display: "inline-block"}}> 
                <img src={(user)?(`data:image/png;base64,${user.profileImage}`):("C:/Users/user/Desktop/Training/React/reactemployee-crud-app/src/media/profile.jfif")}  height="37" width="37" style={{borderRadius:"100%",  position: "relative", display: "inline-block"}}/>
                <Link  to="/fileupload" style={{ width: "1px",
    textAlign: "center",
    position: "absolute",
    top: "1.7rem", right: "2.4rem"}}><EditIcon/></Link></div> </div>
                :<Button color="inherit" variant="contained" component={Link} to="/login">
                    Login
                </Button>
              }
        
                {/* <Button color="inherit" variant="contained" component={Link} to="/register">
                    Login
                </Button> */}
            </Toolbar>
        </AppBar>
   </>
    );
}
