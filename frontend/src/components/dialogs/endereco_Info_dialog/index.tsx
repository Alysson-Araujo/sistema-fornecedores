import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
} from "@mui/material";
import { CreateEnderecoInput } from "../../../models/EnderecoModel";

interface EnderecoDialogInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  endereco: CreateEnderecoInput | null;
  deleteEndereco: (enderecoToDelete: CreateEnderecoInput) => void;
}

export default function EnderecoDialogInfo(props: EnderecoDialogInfoProps) {
  const { open, endereco, setOpen, deleteEndereco } = props;

  const [currentEndereco, setCurrentEndereco] = useState<CreateEnderecoInput | null>(endereco);

  useEffect(() => {
    setCurrentEndereco(endereco);
  }, [endereco]);

  const handleClose = () => {
    setCurrentEndereco(endereco);
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEndereco((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return null;
    });
  };

  const handleSave = () => {
    // Implement the save functionality here
    // This could involve updating the state in the parent component
    setOpen(false);
  };

  const handleDeleteEndereco = () => {
    if (currentEndereco) {
      deleteEndereco(currentEndereco);
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Endereço</DialogTitle>
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
              id="cep"
              name="cep"
              label="CEP"
              value={currentEndereco?.cep || ""}
              onChange={handleChange}
            />
            <TextField
              id="logradouro"
              name="logradouro"
              label="Logradouro"
              value={currentEndereco?.logradouro || ""}
              onChange={handleChange}
            />
            <TextField
              id="numero"
              name="numero"
              label="Número"
              value={currentEndereco?.numero || ""}
              onChange={handleChange}
            />
            <TextField
              id="complemento"
              name="complemento"
              label="Complemento"
              value={currentEndereco?.complemento || ""}
              onChange={handleChange}
            />
            <TextField
              id="bairro"
              name="bairro"
              label="Bairro"
              value={currentEndereco?.bairro || ""}
              onChange={handleChange}
            />
            <TextField
              id="cidade"
              name="cidade"
              label="Cidade"
              value={currentEndereco?.cidade || ""}
              onChange={handleChange}
            />
            <TextField
              id="estado"
              name="estado"
              label="Estado"
              value={currentEndereco?.estado || ""}
              onChange={handleChange}
            />
            <TextField
              id="pais"
              name="pais"
              label="País"
              value={currentEndereco?.pais || ""}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteEndereco}>Remover Endereço</Button>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
