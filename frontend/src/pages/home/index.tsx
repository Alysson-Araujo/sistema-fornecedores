import { Box, Typography, Container, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBarPrivate from '../../components/NavBar';

const Home = () => {
  
  return (
    <Box>
      <AppBarPrivate />
      <Container maxWidth="md" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Bem-vindo(a) ao gerenciador de Fornecedores
          </Typography>
          <Typography variant="body1" paragraph>
            Aqui você pode realizar cadastros de fornecedores, assim como visualizar os fornecedores cadastrados e editar seus dados, incluindo os endereços e contatos referentes aos seus fornecedores.
          </Typography>
          <Typography variant="body1" paragraph>
            Clique no botão superior esquerdo  {<MenuIcon style={{marginLeft:"5px", marginRight:'5px'}}/>}  para visualizar o menu de funções disponíveis para o uso.
          </Typography>
          
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
