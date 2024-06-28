import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import { CreateFornecedorInput } from "../../../models/FornecedorModel";
import { FormikProps } from "formik";
import { CreateContatoInput } from "../../../models/ContatoModel";
import ContatoDialogInfo from "../../dialogs/contato_info_dialog";

export default function ContatoList(props: {
  formik: FormikProps<CreateFornecedorInput>;
}) {
  const [open, setOpen] = React.useState(false);
  const [contatoEdit, setContatoEdit] = React.useState<CreateContatoInput>({} as CreateContatoInput);

  function openDialog(contato: CreateContatoInput) {
    setContatoEdit(contato);
    setOpen(true);
  }

  const handleDeleteContato = (contatoToDelete: CreateContatoInput) => {
    const newContatos = props.formik.values.contatos.filter(
      (contato) => contato.id !== contatoToDelete.id
    );
    props.formik.setFieldValue("contatos", newContatos);  
    setOpen(false);
  };

  return (
    <>
      <ContatoDialogInfo
        open={open}
        setOpen={setOpen}
        contato={contatoEdit}
        deleteContato={handleDeleteContato}
      />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Contatos que serão adicionados ao Fornecedor
          </ListSubheader>
        }
      >
        {props.formik.values.contatos.map((contato, index) => (
          <ListItemButton key={contato.id || index} onClick={() => openDialog(contato)}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={contato.nome.length > 28 ? contato.nome.substring(0, 28) + "..." : contato.nome} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
