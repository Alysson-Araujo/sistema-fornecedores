import TextField from "@mui/material/TextField";
import { CreateFornecedorInput } from "../../../models/FornecedorModel";
import { Box } from "@mui/material";
import { FormikProps } from "formik";

export function FornecedorForm(props: {
  formik: FormikProps<CreateFornecedorInput>;
}) {
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch", height: "10ch" ,marginLeft: "200px", marginTop: "50px"},
        }}
      >
        <TextField
           id="razaoSocial"
          name="razaoSocial"
          label="Razão Social *"
          variant="outlined"
          value={props.formik.values.razaoSocial}
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          error={props.formik.touched.razaoSocial && Boolean(props.formik.errors.razaoSocial)}
          helperText={props.formik.touched.razaoSocial && props.formik.errors.razaoSocial}
        />
        <TextField
          id="nomeFantasia"
          name="nomeFantasia"
          label="Nome Fantasia *"
          variant="outlined"
          value={props.formik.values.nomeFantasia}
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          error={props.formik.touched.nomeFantasia && Boolean(props.formik.errors.nomeFantasia)}
          helperText={props.formik.touched.nomeFantasia && props.formik.errors.nomeFantasia}

        />
        <TextField
          id="cnpj"
          name="cnpj"
          label="CNPJ *"
          variant="outlined"
          value={props.formik.values.cnpj}
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          error={props.formik.touched.cnpj && Boolean(props.formik.errors.cnpj)}
          helperText={props.formik.touched.cnpj && props.formik.errors.cnpj}
        />
        <TextField
           id="inscricaoEstadual"
           name="inscricaoEstadual"
           label="Inscrição Estadual"
           variant="outlined"
           value={props.formik.values.inscricaoEstadual}
           onChange={props.formik.handleChange}
           onBlur={props.formik.handleBlur}
           error={props.formik.touched.inscricaoEstadual && Boolean(props.formik.errors.inscricaoEstadual)}
           helperText={props.formik.touched.inscricaoEstadual && props.formik.errors.inscricaoEstadual}
 
        />
      </Box>
    </>
  );
}
