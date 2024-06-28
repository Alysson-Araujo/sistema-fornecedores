import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import { CreateEnderecoInput } from "../../../models/EnderecoModel";
import { CreateFornecedorInput } from "../../../models/FornecedorModel";
import { FormikProps } from "formik";
import EnderecoDialogInfo from "../../dialogs/endereco_Info_dialog";

export default function EnderecoList(props: {
  formik: FormikProps<CreateFornecedorInput>;
}) {
  const [open, setOpen] = React.useState(false);
  const [enderecoEdit, setEnderecoEdit] = React.useState<CreateEnderecoInput>({} as CreateEnderecoInput);

  function openDialog(endereco: CreateEnderecoInput) {
    setEnderecoEdit(endereco);
    setOpen(true);
  }

  const handleDeleteEndereco = (enderecoToDelete: CreateEnderecoInput) => {
    const newEnderecos = props.formik.values.enderecos.filter(
      (endereco) => endereco.id !== enderecoToDelete.id
    );
    props.formik.setFieldValue("enderecos", newEnderecos);  
    setOpen(false);
  };

  return (
    <>
      <EnderecoDialogInfo
        open={open}
        setOpen={setOpen}
        endereco={enderecoEdit}
        deleteEndereco={handleDeleteEndereco}      
        />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", marginLeft: "35px"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Endereços que serão adicionados ao Fornecedor
          </ListSubheader>
        }
      >
        {props.formik.values.enderecos.map((endereco, index) => (
          <ListItemButton key={endereco.id || index} onClick={() => openDialog(endereco)}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={endereco.logradouro.length > 28 ? endereco.logradouro.substring(0, 28) + "..." : endereco.logradouro} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
