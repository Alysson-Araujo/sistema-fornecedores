import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerSystem from '../Drawer';
import StoreIcon from '@mui/icons-material/Store';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
export default function AppBarMain() {
  const [open, setOpen] = useState(false);

  const authContext = useContext(AuthContext);
  const logout = authContext?.logout;

  const handleDrawerSystemOpen = () => {
    setOpen(true);
  };

  const handleDrawerSystemClose = () => {
    setOpen(false);
  };
  
  const handleLogout = () => {
    if (logout) logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DrawerSystem open={open} onClose={handleDrawerSystemClose} />

      <AppBar position="fixed" style={{ width: '100%'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerSystemOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft:"20px" }}>
            Sistema de Fornecedores
          </Typography>
            <StoreIcon style={{ marginLeft: '310px', position: "absolute" }} />
          <Button color="inherit" onClick={handleLogout}>
            logout
            <LogoutIcon style={{marginLeft:"10px"}}/>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
