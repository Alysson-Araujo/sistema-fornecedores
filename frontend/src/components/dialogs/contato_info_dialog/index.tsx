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
import { CreateContatoInput } from "../../../models/ContatoModel";

interface ContatoDialogInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contato: CreateContatoInput | null;
  deleteContato: (contatoToDelete: CreateContatoInput) => void;
}

export default function ContatoDialogInfo(props: ContatoDialogInfoProps) {
  const { open, setOpen, contato, deleteContato } = props;
  const [currentContato, setCurrentContato] = useState<CreateContatoInput | null>(contato);

  useEffect(() => {
    setCurrentContato(contato);
  }, [contato]);

  const handleClose = () => {
    setCurrentContato(contato);
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentContato((prevState) => {
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

  const handleDeleteContato = () => {
    if (currentContato) {
      deleteContato(currentContato);
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Contato</DialogTitle>
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
              id="nome"
              name="nome"
              label="Nome"
              value={currentContato?.nome || ""}
              onChange={handleChange}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              value={currentContato?.email || ""}
              onChange={handleChange}
            />
            <TextField
              id="telefone"
              name="telefone"
              label="Telefone"
              value={currentContato?.telefone || ""}
              onChange={handleChange}
            />
            <TextField
              id="cargo"
              name="cargo"
              label="Cargo"
              value={currentContato?.cargo || ""}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteContato}>Remover Contato</Button>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
