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
import { Contato } from "../../../models/ContatoModel";

interface ContatoDialogEditProps {
  open: boolean;
  contato: Contato;
  onClose: () => void;
  onSave: (contato: Contato) => Promise<void>;
}

export default function ContatoDialogDetails(props: ContatoDialogEditProps) {
  const { open, contato, onClose, onSave } = props;
  const [currentContato, setCurrentContato] = useState<Contato>(contato);

  useEffect(() => {
    setCurrentContato(contato);
  }, [contato, open]);

  const handleClose = () => {
    setCurrentContato(contato);
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentContato((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSave = () => {
    onSave(currentContato as Contato);
    onClose();
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
