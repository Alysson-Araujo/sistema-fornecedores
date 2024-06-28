import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";
import { CreateEnderecoInput } from "../../../models/EnderecoModel";

interface CreateEnderecoDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (endereco: CreateEnderecoInput) => Promise<void>;
}

export default function CreateEnderecoDialog(props: CreateEnderecoDialogProps) {
  const { open, onClose, onSave } = props;

  const validationSchema = Yup.object({
    logradouro: Yup.string().required("Logradouro é obrigatório"),
    numero: Yup.number().required("Número é obrigatório"),
    complemento: Yup.string().required("Complemento é obrigatório"),
    bairro: Yup.string().required("Bairro é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatório"),
    estado: Yup.string().required("Estado é obrigatório"),
    pais: Yup.string().required("País é obrigatório"),
    cep: Yup.string().required("CEP é obrigatório"),
  });

  const formik = useFormik<CreateEnderecoInput>({
    initialValues: {
      logradouro: "",
      numero: 0,
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
      cep: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        formik.validateForm();
        onSave(values);
        resetForm();
        onClose();
      } catch (error) {
        console.error("Erro ao criar um novo Endereço!", error);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Endereco</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
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
              id="logradouro"
              name="logradouro"
              label="Logradouro"
              value={formik.values.logradouro}
              onChange={formik.handleChange}
            />
            <TextField
              id="numero"
              name="numero"
              label="Número"
              value={formik.values.numero}
              onChange={formik.handleChange}
            />
            <TextField
              id="complemento"
              name="complemento"
              label="Complemento"
              value={formik.values.complemento}
              onChange={formik.handleChange}
            />
            <TextField
              id="bairro"
              name="bairro"
              label="Bairro"
              value={formik.values.bairro}
              onChange={formik.handleChange}
            />
            <TextField
              id="cidade"
              name="cidade"
              label="Cidade"
              value={formik.values.cidade}
              onChange={formik.handleChange}
            />
            <TextField
              id="estado"
              name="estado"
              label="Estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
            />
            <TextField
              id="pais"
              name="pais"
              label="País"
              value={formik.values.pais}
              onChange={formik.handleChange}
            />
            <TextField
              id="cep"
              name="cep"
              label="CEP"
              value={formik.values.cep}
              onChange={formik.handleChange}
            />
          </Box>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
