import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import LogoIcon from './LogoIcon';
import Menus from './Menus';
import { useNavigate } from 'react-router-dom';
// import UserMenu from './UserMenu';

function NavBar() {
  const logoName = 'CryptoTrend';
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onClickMenu = (url: string) => {
    navigate(url);
    handleCloseNavMenu();
  };

  return (
    <AppBar position='static' className='App' color='transparent'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <LogoIcon logoName={logoName} onClickMenu={onClickMenu} />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Menus onClickMenu={onClickMenu} />
            </Menu>
          </Box>
          <LogoIcon
            logoName={logoName}
            isMobile={true}
            onClickMenu={onClickMenu}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Menus isMobile onClickMenu={onClickMenu} />
          </Box>

          {/*<UserMenu />*/}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
