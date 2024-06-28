import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
} from "@mui/material";
import {  Fornecedor } from "../../../models/FornecedorModel";

interface FornecedorDialogEditProps {
  open: boolean;
  fornecedor: Fornecedor;
  onClose: () => void;
  onSave: (fornecedor: Fornecedor) => Promise<void>;
}

export default function FornecedorDialogDetails(
  props: FornecedorDialogEditProps
) {
  const { open, fornecedor, onClose, onSave  } = props;
  const [currentFornecedor, setCurrentFornecedor] = useState<Fornecedor>({
    ...fornecedor,
  });



  useEffect(() => {
    setCurrentFornecedor({ ...fornecedor });
  }, [fornecedor, open]);

  const handleClose = () => {
    setCurrentFornecedor({ ...fornecedor });
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentFornecedor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateFornecedor = () => {
    onClose();
    onSave(currentFornecedor);
  }

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Fornecedor</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              columnGap: 5,
              rowGap: 4,
              gridTemplateColumns: "repeat(2, 1fr)",
              marginTop: "20px",
            }}
          >
            <TextField
              id="razaoSocial"
              name="razaoSocial"
              label="Razão Social"
              value={currentFornecedor.razaoSocial}
              onChange={handleChange}
            />
            <TextField
              id="nomeFantasia"
              name="nomeFantasia"
              label="Nome Fantasia"
              value={currentFornecedor.nomeFantasia}
              onChange={handleChange}
            />
            <TextField
              id="cnpj"
              name="cnpj"
              label="CNPJ"
              value={currentFornecedor.cnpj}
              onChange={handleChange}
            />
            <TextField
              id="inscricaoEstadual"
              name="inscricaoEstadual"
              label="Inscrição Estadual"
              value={currentFornecedor.inscricaoEstadual || ""}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleUpdateFornecedor}>Salvar alterações</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
