import TextField from "@mui/material/TextField";
import { CreateFornecedorInput } from "../../../models/FornecedorModel";
import { Alert, Box, Button } from "@mui/material";
import { FormikErrors, FormikProps } from "formik";
import { CreateEnderecoInput } from "../../../models/EnderecoModel";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export function EnderecoForm(props: {
  formik: FormikProps<CreateFornecedorInput>;
}) {
  const { values, handleBlur, touched, errors, setFieldValue } = props.formik;

  const [warningMessage, setWarningMessage] = useState<string>("");
  const [newEndereco, setNewEndereco] = useState<CreateEnderecoInput>({
    cep: "",
    logradouro: "",
    numero: 0,
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "",
  });

  const handleNewEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEndereco({
      ...newEndereco,
      [name]: value,
    });
  };

  const handleAddEndereco = () => {
    if(!newEndereco.cep || !newEndereco.logradouro || !newEndereco.numero || !newEndereco.complemento || !newEndereco.bairro || !newEndereco.cidade || !newEndereco.estado || !newEndereco.pais) {
      setWarningMessage("Preencha todos os campos!");
      return;
    }
    setWarningMessage("");
    newEndereco.id = uuidv4();
    setFieldValue("enderecos", [...values.enderecos, newEndereco]);
    setNewEndereco({
      cep: "",
      logradouro: "",
      numero: 0,
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
    });
  };
  
  return (
    <>{warningMessage && <Alert severity="warning">{warningMessage}</Alert>}
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          id="cep"
          name="cep"
          label="CEP *"
          variant="outlined"
          value={newEndereco.cep}
          onChange={handleNewEnderecoChange}
          onBlur={handleBlur}
          error={touched.enderecos?.[values.enderecos.length]?.cep && Boolean((errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.cep)}
          helperText={touched.enderecos?.[values.enderecos.length]?.cep && (errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.cep}
        />
        <TextField
          id="logradouro"
          name="logradouro"
          label="Logradouro *"
          variant="outlined"
          value={newEndereco.logradouro}
          onChange={handleNewEnderecoChange}
          onBlur={handleBlur}
          error={touched.enderecos?.[values.enderecos.length]?.logradouro && Boolean((errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.logradouro)}
          helperText={touched.enderecos?.[values.enderecos.length]?.logradouro && (errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.logradouro}
        />
        <TextField
          id="numero"
          name="numero"
          type="number"
          label="Número *"
          variant="outlined"
          value={newEndereco.numero}
          inputProps={{ min: 0, step: 1, style: { appearance: 'textfield' }, inputMode: 'numeric' }}
          sx={{
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          }}
          onChange={handleNewEnderecoChange}
          onBlur={handleBlur}
          error={touched.enderecos?.[values.enderecos.length]?.numero && Boolean((errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.numero)}
          helperText={touched.enderecos?.[values.enderecos.length]?.numero && (errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.numero}
        />
        <TextField
          id="complemento"
          name="complemento"
          label="Complemento *"
          variant="outlined"
          value={newEndereco.complemento}
          onChange={handleNewEnderecoChange}
          onBlur={handleBlur}
          error={touched.enderecos?.[values.enderecos.length]?.complemento && Boolean((errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.complemento)}
          helperText={touched.enderecos?.[values.enderecos.length]?.complemento && (errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.complemento}
        />
        <TextField
          id="bairro"
          name="bairro"
          label="Bairro *"
          variant="outlined"
          value={newEndereco.bairro}
          onChange={handleNewEnderecoChange}
          onBlur={handleBlur}
          error={touched.enderecos?.[values.enderecos.length]?.bairro && Boolean((errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.bairro)}
          helperText={touched.enderecos?.[values.enderecos.length]?.bairro && (errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.bairro}
        />
        <TextField
          id="cidade"
          name="cidade"
          label="Cidade *"
          variant="outlined"
          value={newEndereco.cidade}
          onChange={handleNewEnderecoChange}
          onBlur={handleBlur}
          error={touched.enderecos?.[values.enderecos.length]?.cidade && Boolean((errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.cidade)}
          helperText={touched.enderecos?.[values.enderecos.length]?.cidade && (errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.cidade}
        />
        <TextField
          id="estado"
          name="estado"
          label="Estado *"
          variant="outlined"
          value={newEndereco.estado}
          onChange={handleNewEnderecoChange}
          onBlur={handleBlur}
          error={touched.enderecos?.[values.enderecos.length]?.estado && Boolean((errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.estado)}
          helperText={touched.enderecos?.[values.enderecos.length]?.estado && (errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.estado}
        />
        <TextField
          id="pais"
          name="pais"
          label="País *"
          variant="outlined"
          value={newEndereco.pais}
          onChange={handleNewEnderecoChange}
          onBlur={handleBlur}
          error={touched.enderecos?.[values.enderecos.length]?.pais && Boolean((errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.pais)}
          helperText={touched.enderecos?.[values.enderecos.length]?.pais && (errors.enderecos?.[values.enderecos.length] as FormikErrors<CreateEnderecoInput>)?.pais}
        />
        <Button
          variant="contained"
          onClick={handleAddEndereco}
        >
          Adicionar Endereço
        </Button>
      </Box>

      
    </>
  );
}