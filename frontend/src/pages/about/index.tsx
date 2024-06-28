import { Box, Container, Paper, Typography } from "@mui/material";
import { AppBarPrivate } from "../../routes/AppBarPrivate";

export function About (){
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
                Informações sobre o sistema.
              </Typography>
              <Typography variant="body1" paragraph style={{marginTop:"40px"}}>
                <Typography variant="h6" align="left" paragraph>Funcionalidade de cadastrar fornecedores</Typography>
                Na página de cadastro de fornecedores, você pode realizar cadastros de fornecedores juntamente com seus endereços e contatos. Nas etapas de preencher os dados dos enderecos e contatos, você pode adicionar quantos endereços e contatos desejar e ao lado terá uma lista de todos os endereços e contatos adicionados. Lembrando que todos os dados só serão salvos após a finalização do cadastro.
                Importante ressaltar que o sistema não permite o cadastro de fornecedores com CNPJ duplicado.
              </Typography>
              <Typography variant="body1" paragraph>
                <Typography variant="h6" align="left" paragraph>Funcionalidade de visualizar fornecedores</Typography>
                Na página de visualização de fornecedores, você pode visualizar todos os fornecedores cadastrados, editar os dados dos fornecedores, excluir fornecedores e visualizar os detalhes de cada fornecedor, incluindo os endereços e contatos referentes a cada fornecedor.
                Além disso é possível adicionar novos endereços e contatos para cada fornecedor e editar e excluir os endereços e contatos já cadastrados.
                Pode paginar a lista de fornecedores.
              </Typography>
              
            </Paper>
          </Container>
        </Box>
      );
}