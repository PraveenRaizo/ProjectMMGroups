import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Button,
    Container,
    Avatar,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Settings } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useTheme } from '@mui/material';

const Navbar: React.FC = () => {
    const theme = useTheme();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElUserNotLoggedIn, setAnchorElUserNotLoggedIn] = useState<null | HTMLElement>(null);
    const [currentTab, setCurrentTab] = useState<string | null>(null);
    const [userFirstName, setUserFirstName] = useState<string>('');
    const [userInitial, setUserInitial] = useState<string>('');
    const [isSignedIn, setisSignedIn] = useState<boolean | null>(false);

    const navigate = useNavigate();
    const location = useLocation();

    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const pageRoutes: {[key: string]: string}={
        'Home': '/',
        'About': '/about',
        'Our Products':'/products',
        'Services': '/services',
        'Our Clients' : '/clients',
        'Consultation' : '/consultation',
        'Crane Calculator' : '/craneCalculator'
    };

    

    const decodeJWT =(token: string): any =>{
        try{
            return jwtDecode(token);
        }catch(error){
            console.error('Error decoding JWT token: ', error);
            return null;
        }
    };

    useEffect(()=>{

        const jwtToken = localStorage.getItem('jwtToken');
        if(jwtToken){
            const userInfo = decodeJWT(jwtToken);
            setUserInitial(userInfo.firstName.charAt(0));
            setUserFirstName(userInfo.firstName);
            setisSignedIn(true);
        }   

        const pathname = location.pathname;
        setCurrentTab(Object.values(pageRoutes).includes(pathname)?Object.keys(pageRoutes).find(key=>pageRoutes[key]===pathname)||null:null);

    },[location.pathname]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        
        setAnchorElNav(null);
    };

    const handleCurrentTab = (page: string)=>{

        const route = pageRoutes[page];
        if(route){
            navigate(route);
        }

        setCurrentTab(page);
        handleCloseNavMenu();
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    
    const handleOpenUserMenuNotLoggedIn = (event: React.MouseEvent<HTMLElement>) =>{
        setAnchorElUserNotLoggedIn(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseUserMenuNotLoggedIn = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUserNotLoggedIn(null);
    }

    const handleLogout=()=>{
        localStorage.removeItem('jwtToken');
        setisSignedIn(false);
        navigate('/');
    };
    
    const handleSettingOptionClick=(setting: string)=>{

        if(setting === 'Logout'){
            handleLogout();
        }

        handleCloseUserMenu();
    }

    const handleSettingNotLoggedInOptionClick=(setting: string) => {
        
        if(setting=='Login'){
            navigate('/login');
        }else if(setting == 'SignUp'){
            navigate('/signup')
        }
    }

    const pages = ['Home', 'About', 'Our Products', 'Services', 'Our Clients', 'Crane Calculator', 'Consultation'];
    const settings = ['Profile', 'Logout'];
    const settingsNoLoggedIn = ['Login', 'SignUp'];

    return (
        <AppBar position='fixed' style={{ backgroundColor: '#FEBE10', padding: 0 }} > 
        {/* yellow: #FEBE10  green: #264653*/}
            <Container classes={{ root: "container-root" }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'none', lg:'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MM Groups
                    </Typography>

                    <Box flexGrow={1} display={{ xs: 'flex', md: 'flex', lg:'none' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'block' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex', lg:'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MM Groups
                    </Typography>

                    <Box flexGrow={1} display={{ xs: 'none', md: 'none', lg:'flex' }} sx={{height:'6.5vh'}} >
                        {pages.map((page) => (
                            <Button
                                // className='navbutton'
                                key={page}
                                onClick={()=>handleCurrentTab(page)}
                                sx={{ 
                                    backgroundColor: currentTab === page ? '#00308F' : 'transparent',
                                    // #4D8AA1 skyblue
                                    borderRadius: 0,
                                    color:'white', 
                                    display: 'block',
                                    '&:hover':{color: currentTab != page? 'black': 'white', backgroundColor: currentTab != page ? '#7CB9E8' : '#00308F', borderRadius:0},
                                    paddingLeft:'10px',
                                    paddingRight:'10px',
                                    // paddingTop: '20px',
                                    // paddingBottom: '20px'
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        { 
                            isSignedIn ?      
                            (
                                <>
                                    <Tooltip title={userFirstName}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg">{userInitial}</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={()=> handleSettingOptionClick(setting)}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ): 
                            (
                                isLargeScreen ? (
                                    <Box display={{xs:'none', md:'flex'}}>
                                        <Button sx={{color:'white'}} onClick={()=>navigate('/login')}>
                                            Login
                                        </Button>
                                        <Button sx={{color:'white'}} onClick={()=>navigate('/signup')}>
                                            SignUp
                                        </Button>
                                    </Box>
                                ) 
                                : 
                                (
                                    <>
                                        <IconButton onClick={handleOpenUserMenuNotLoggedIn} sx={{ p: 0 }}>
                                            <AccountCircleIcon/> 
                                        </IconButton>

                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUserNotLoggedIn}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUserNotLoggedIn)}
                                            onClose={handleCloseUserMenuNotLoggedIn}
                                        >
                                            {settingsNoLoggedIn.map((setting) => (
                                                <MenuItem key={setting} onClick={()=> handleSettingNotLoggedInOptionClick(setting)}>
                                                    <Typography textAlign="center">{setting}</Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                                )                                      
                            ) 
                        }                        
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
