import { Box, Container, Typography } from "@mui/material";
import { AppBarPrivate } from "../../routes/AppBarPrivate";
import { CadastroFornecedor } from "../../components/sterpper/CreateFornecedor";

export function CadastrarFornecedor() {
  return (
    <Box>
      <AppBarPrivate />

      <Container sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "120px"
        }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de fornecedor
      </Typography>
      
      </Container>
      
      <Container
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CadastroFornecedor />
      </Container>
    </Box>
  );
}
