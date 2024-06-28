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
import { CreateContatoInput } from "../../../models/ContatoModel";
import { useFormik } from "formik";


interface CreateContatoDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (contato: CreateContatoInput) => Promise<void>;
}

export default function CreateContatoDialog(props: CreateContatoDialogProps) {
  const { open, onClose, onSave } = props;

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    cargo: Yup.string().required("Cargo é obrigatório"),
    telefone: Yup.string().required("Telefone é obrigatório"),
  });

  const formik = useFormik<CreateContatoInput>({
    initialValues: {
      nome: "",
      email: "",
      cargo: "",
      telefone: "",
    },
    validationSchema: validationSchema,
    onSubmit:  (values, { resetForm }) => {
      try {
         formik.validateForm();
        onSave(values)
        resetForm();
        onClose();
      } catch (error) {
        console.error("Failed to create contato:", error);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Contato</DialogTitle>
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
              id="nome"
              name="nome"
              label="Nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
            <TextField
              id="telefone"
              name="telefone"
              label="Telefone"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.telefone && Boolean(formik.errors.telefone)}
              helperText={formik.touched.telefone && formik.errors.telefone}
              fullWidth
            />
            <TextField
              id="cargo"
              name="cargo"
              label="Cargo"
              value={formik.values.cargo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cargo && Boolean(formik.errors.cargo)}
              helperText={formik.touched.cargo && formik.errors.cargo}
              fullWidth
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
