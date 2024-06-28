import TextField from "@mui/material/TextField";
import { CreateFornecedorInput } from "../../../models/FornecedorModel";
import { Alert, Box, Button } from "@mui/material";
import { FormikErrors, FormikProps } from "formik";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { CreateContatoInput } from "../../../models/ContatoModel";


export function ContatoForm(props: {
  formik: FormikProps<CreateFornecedorInput>;
}) {
  const { values, handleBlur, touched, errors, setFieldValue } = props.formik;
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [newContato, setNewContato] = useState<CreateContatoInput>({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
  });

  const handleNewContatoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContato({
      ...newContato,
      [name]: value,
    });
  };

  const handleAddContato = () => {
    if(!newContato.nome || !newContato.email || !newContato.telefone || !newContato.cargo) {
      setWarningMessage("Preencha todos os campos!");
      return;
    }
    setWarningMessage("");
    newContato.id = uuidv4();
    setFieldValue("contatos", [...values.contatos, newContato]);
    setNewContato({
      nome: "",
    email: "",
    telefone: "",
    cargo: "",
    });
  };

  return (
    <>
    {warningMessage && <Alert severity="warning">{warningMessage}</Alert>}
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        
      >
        <TextField
          id="nome"
          name="nome"
          label="Nome *"
          variant="outlined"
          value={newContato.nome}
          onChange={handleNewContatoChange}
          onBlur={handleBlur}
          error={touched.contatos?.[values.contatos.length]?.nome && Boolean((errors.contatos?.[values.contatos.length] as FormikErrors<CreateContatoInput>)?.nome)}
          helperText={touched.contatos?.[values.contatos.length]?.nome && (errors.contatos?.[values.contatos.length] as FormikErrors<CreateContatoInput>)?.nome}
        />
        
        <TextField
          id="email"
          name="email"
          label="Email *"
          variant="outlined"
          type="email"
          value={newContato.email}
          onChange={handleNewContatoChange}
          onBlur={handleBlur}
          error={touched.contatos?.[values.contatos.length]?.email && Boolean((errors.contatos?.[values.contatos.length] as FormikErrors<CreateContatoInput>)?.email)}
          helperText={touched.contatos?.[values.contatos.length]?.email && (errors.contatos?.[values.contatos.length] as FormikErrors<CreateContatoInput>)?.email}
        />

        <TextField
          id="telefone"
          name="telefone"
          label="Telefone *"
          variant="outlined"
          value={newContato.telefone}
          onChange={handleNewContatoChange}
          onBlur={handleBlur}
          error={touched.contatos?.[values.contatos.length]?.telefone && Boolean((errors.contatos?.[values.contatos.length] as FormikErrors<CreateContatoInput>)?.telefone)}
          helperText={touched.contatos?.[values.contatos.length]?.telefone && (errors.contatos?.[values.contatos.length] as FormikErrors<CreateContatoInput>)?.telefone}
        />

        <TextField
          id="cargo"
          name="cargo"
          label="Cargo *"
          variant="outlined"
          value={newContato.cargo}
          onChange={handleNewContatoChange}
          onBlur={handleBlur}
          error={touched.contatos?.[values.contatos.length]?.cargo && Boolean((errors.contatos?.[values.contatos.length] as FormikErrors<CreateContatoInput>)?.cargo)}
          helperText={touched.contatos?.[values.contatos.length]?.cargo && (errors.contatos?.[values.contatos.length] as FormikErrors<CreateContatoInput>)?.cargo}
        />

        <Button
          variant="contained"
          onClick={handleAddContato}
        >
          Adicionar Contato
        </Button>
      </Box>

      
    </>
  );
}