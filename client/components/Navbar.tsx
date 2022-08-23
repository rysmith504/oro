import React, { useEffect, useContext } from 'react';
import { useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, Routes, Route } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Container } from '../styles/material';
import Badge from '@mui/material/Badge';
import { UserContext } from '../context/UserContext';
import { Home, TravelExplore, MusicNote, Grade, Luggage, PriceChange, Forum, Login, Mail, Logout } from '@mui/icons-material';
import { Avatar } from '../styles/material';
const iconColors = '';
const inverseMode = '';



const Navbar = (props) => {
  const { currentUserInfo, getCurrentUser, logoutUser } = useContext(UserContext);

  const { notif, profile } = props;
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const themeContext = useContext(ThemeContext);
  const { mode, setMode, toggleMode } = themeContext;



  const pages = [

    <Link
      to='/home'
      style={{ textDecoration: 'none' }}
      key={'home'}
    >
      <Home />
      HOME
    </Link>,
    <Link
      to='/eventListings'
      style={{ textDecoration: 'none' }}
      key={'eventListings'}
    >
      <TravelExplore />
      Find Events
    </Link>,
    <Link
      to='/travelPlanner'
      style={{ textDecoration: 'none' }}
      key={'travelPlanner'}
    >
      <Luggage />
      Travel Planner
    </Link>,
    <Link to='/backpack' style={{ textDecoration: 'none' }} key={'backpack'}>
      <PriceChange />
      Budgets
    </Link>,
    <Link to='/songFinder' style={{ textDecoration: 'none' }} key={'songFinder'}>
      <MusicNote />
      Song Finder
    </Link>,
    <Link to='/artists' style={{ textDecoration: 'none' }} key={'artists'}>
      <Grade />
      Favorite Artists
    </Link>,
    <Link to='/chat' style={{ textDecoration: 'none' }} key={'chat'}> <Forum /> Chat</Link>,
    <Link to='/notifications' style={{ textDecoration: 'none' }} key={'notifications'}>
      <Badge badgeContent={notif} color="primary" >
        <Mail />
      </Badge>
      Notifications</Link>,
    <Link to='/profile' style={{ textDecoration: 'none' }} key={'profile'}>
      <Avatar src={profile} />
      Account
    </Link>,
  ];


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let isLoggedIn = false;

  if (currentUserInfo.id) {
    isLoggedIn = true;
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppBar position='sticky' sx={{ bgcolor: inverseMode, paddingRight: '20px' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Grid container>
            <Grid item xs={9} sm={10} style={{ display: 'flex', alignItems: 'left' }}>
              <a href='/'><img src={mode === 'dark' ? 'images/VSLOGO-dark.png' : 'images/VSLOGO.png'} height='75' /></a>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none', bgcolor: inverseMode }, mr: '5px' }}>
                {pages.map((page, index) => (
                  <Button
                    key={`page${index}`}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={2} sm={1} style={{ display: 'flex' }} sx={{ margin: 'auto' }}>
              <IconButton onClick={toggleMode}>
                {mode === 'dark' ? (
                  <div><Tooltip title='Dark mode'><NightlightIcon fontSize='medium' sx={{ color: iconColors }} /></Tooltip>
                  </div>
                ) : (
                  <div><Tooltip title='Light mode'><WbSunnyIcon fontSize='medium' sx={{ color: iconColors }} /></Tooltip>
                  </div>
                )}
              </IconButton>
            </Grid>
            <Grid item xs={1} style={{ display: 'flex' }} sx={{ margin: 'auto' }}>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
              >
                <MenuIcon sx={{ color: iconColors }} fontSize='large' />
              </IconButton>
              <Menu
                id='menu-appbar'
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
                  display: { xs: 'block', md: 'block', lg: 'block' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={`nav${index}`} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCloseNavMenu}>
                  {
                    isLoggedIn
                      ? <Link to='/home' style={{ textDecoration: 'none' }} key={'logout'} onClick={logoutUser}>
                        <Logout/>
                          Logout
                      </Link>
                      : <Link to='/login' style={{ textDecoration: 'none' }} key={'login'}>
                        <Login />
                          Login
                      </Link>
                  }
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
