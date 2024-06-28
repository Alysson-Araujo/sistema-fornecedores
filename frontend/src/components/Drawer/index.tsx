import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import InfoIcon from '@mui/icons-material/Info';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from "@mui/material";
interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function DrawerSystem({ onClose, open }: DrawerProps) {
  const navigate = useNavigate();

  const toggleDrawer = () => {
    onClose();
  };

  const navigateTo = (path: string) => {
    navigate(path);
    toggleDrawer();  // Fecha o Drawer após a navegação
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer}>
      <Typography variant="h6" align="center"component="div" sx={{ flexGrow: 1,marginTop:"20px",marginBottom:"20px" }}>
        Menu
      </Typography>
      <Divider />
      <List>
      <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo("/home")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo("/cadastro-fornecedor")}>
            <ListItemIcon>
              <AddBusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Adicionar novo fornecedor" />
          </ListItemButton>
        </ListItem> 
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo("/visualizar-fornecedores")}>
            <ListItemIcon>
              <DisplaySettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Visualizar e gerenciar fornecedores" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo("/about")}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Sobre o sistema" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
