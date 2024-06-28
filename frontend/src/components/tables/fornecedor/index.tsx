import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateContato,
  CreateEndereco,
  deleteContato,
  deleteEndereco,
  deleteFornecedor,
  GetAllFornecedores,
  updateContato,
  updateEndereco,
  updateFornecedor,
} from "../../../service/apiServices";
import {
  Alert,
  Backdrop,
  CircularProgress,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { Fornecedor } from "../../../models/FornecedorModel";
import { CreateEnderecoInput, Endereco } from "../../../models/EnderecoModel";
import { Contato, CreateContatoInput } from "../../../models/ContatoModel";
import ConfirmationDialog from "../../dialogs/confirmation_dialog";
import FornecedorDialogDetails from "../../dialogs/fornecedor_edit_dialog";
import EnderecoDialogEdit from "../../dialogs/endereco_edit_dialog";
import ContatoDialogEdit from "../../dialogs/contato_edit_dialog";
import CreateContatoDialog from "../../dialogs/create_contato_dialog";
import CreateEnderecoDialog from "../../dialogs/create_endereco_dialog";

const createData = (
  fornecedor: Fornecedor,
  endereco: Endereco[],
  contato: Contato[]
) => {
  return {
    fornecedor,
    endereco,
    contato,
  };
};

function Row(props: {
  row: ReturnType<typeof createData>;
  onEditFornecedor: (fornecedor: Fornecedor) => void;
  onDelete: (item: any, type: string) => void;
  onEditEndereco: (endereco: Endereco, idFornecedor: string) => void;
  onEditContato: (contato: Contato, idFornecedor: string) => void;
  onAddContato: (fornecedorId: string) => void;
  onAddEndereco: (fornecedorId: string) => void;
}) {
  const {
    row,
    onEditFornecedor,
    onDelete,
    onEditEndereco,
    onEditContato,
    onAddContato,
    onAddEndereco,
  } = props;
  const [open, setOpen] = React.useState(false);


  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.fornecedor.razaoSocial}
        </TableCell>
        <TableCell align="center">{row.fornecedor.nomeFantasia}</TableCell>
        <TableCell align="center">{row.fornecedor.cnpj}</TableCell>
        <TableCell align="center">{row.fornecedor.inscricaoEstadual}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => onEditFornecedor(row.fornecedor)}

          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => onDelete(row.fornecedor, "fornecedor")}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Endereços
                <IconButton
                  aria-label="add"
                  size="small"
                  onClick={() => onAddEndereco(row.fornecedor.id)}
                >
                  <AddIcon />
                </IconButton>
              </Typography>
              <Table size="small" aria-label="enderecos">
                <TableHead>
                  <TableRow>
                    <TableCell>CEP</TableCell>
                    <TableCell>Logradouro</TableCell>
                    <TableCell align="center">Número</TableCell>
                    <TableCell align="center">Complemento</TableCell>
                    <TableCell align="center">Bairro</TableCell>
                    <TableCell align="center">Cidade</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">País</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.endereco.map((enderecoRow: Endereco) => (
                    <TableRow key={enderecoRow.id}>
                      <TableCell>{enderecoRow.cep}</TableCell>
                      <TableCell>{enderecoRow.logradouro}</TableCell>
                      <TableCell align="center">{enderecoRow.numero}</TableCell>
                      <TableCell align="center">
                        {enderecoRow.complemento}
                      </TableCell>
                      <TableCell align="center">{enderecoRow.bairro}</TableCell>
                      <TableCell align="center">{enderecoRow.cidade}</TableCell>
                      <TableCell align="center">{enderecoRow.estado}</TableCell>
                      <TableCell align="center">{enderecoRow.pais}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() =>
                            onEditEndereco(enderecoRow, row.fornecedor.id)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => onDelete(enderecoRow, "endereco")}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="h6" gutterBottom component="div">
                Contatos
                <IconButton
                  aria-label="add"
                  size="small"
                  onClick={() => onAddContato(row.fornecedor.id)}
                >
                  <AddIcon />
                </IconButton>
              </Typography>
              <Table size="small" aria-label="contatos">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Cargo</TableCell>
                    <TableCell align="center">Telefone</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.contato.map((contatoRow: Contato) => (
                    <TableRow key={contatoRow.id}>
                      <TableCell align="left">{contatoRow.nome}</TableCell>
                      <TableCell align="center">{contatoRow.email}</TableCell>
                      <TableCell align="center">{contatoRow.cargo}</TableCell>
                      <TableCell align="center">{contatoRow.telefone}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() =>
                            onEditContato(contatoRow, row.fornecedor.id)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => onDelete(contatoRow, "contato")}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TabelaDeFornecedores() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<Fornecedor[]>({
    queryKey: ["fornecedores"],
    queryFn: GetAllFornecedores,
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedFornecedor, setSelectedFornecedor] =
    React.useState<Fornecedor>({
      id: "",
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      inscricaoEstadual: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      enderecos: [],
      contatos: [],
    });
    const [successMessage, setSuccessMessage] = useState<string>("");

  const [openEditEnderecoDialog, setOpenEditEnderecoDialog] =
    React.useState(false);
  const [selectedEndereco, setSelectedEndereco] = React.useState<Endereco>({
    id: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [idFornecedorEndereco, setIdFornecedorEndereco] =
    React.useState<string>("");

  const [openEditContatoDialog, setOpenEditContatoDialog] =
    React.useState(false);
  const [selectedContato, setSelectedContato] = React.useState<Contato>({
    id: "",
    nome: "",
    email: "",
    cargo: "",
    telefone: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [idFornecedorContato, setIdFornecedorContato] =
    React.useState<string>("");

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState<any>(null);
  const [deleteType, setDeleteType] = React.useState<string>("");

  const [openCreateContatoDialog, setOpenCreateContatoDialog] = useState(false);
  const [openCreateEnderecoDialog, setOpenCreateEnderecoDialog] =
    useState(false);
  const [fornecedorIdToAddContato, setFornecedorIdToAddContato] =
    useState<string>("");

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
      event && setPage(newPage);
    };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditFornecedor = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setOpenDialog(true);
  };

  const handleEditEndereco = (endereco: Endereco, idFornecedor: string) => {
    setSelectedEndereco(endereco);
    setIdFornecedorEndereco(idFornecedor);
    setOpenEditEnderecoDialog(true);
  };

  const handleEditContato = (contato: Contato, idFornecedor: string) => {
    setSelectedContato(contato);
    setIdFornecedorContato(idFornecedor);
    setOpenEditContatoDialog(true);
  };

  const handleDelete = (item: any, type: string) => {
    setDeleteItem(item);
    setDeleteType(type);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleCloseEditEnderecoDialog = () => {
    setOpenEditEnderecoDialog(false);
  };

  const handleCloseEditContatoDialog = () => {
    setOpenEditContatoDialog(false);
  };

  const handleCloseCreateContatoDialog = () => {
    setOpenCreateContatoDialog(false);
  };

  const handleCloseCreateEnderecoDialog = () => {
    setOpenCreateEnderecoDialog(false);
  };

  const handleSaveFornecedor = async (fornecedor: Fornecedor) => {
    const response = await updateFornecedor(fornecedor);
    if (response !== null && response !== undefined) {
      setSuccessMessage(`A edição do Fornecedor ${fornecedor.nomeFantasia} foi realizada com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ["fornecedores"]});
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
    setOpenDialog(false);
  };

  const handleSaveEndereco = async (endereco: Endereco) => {
    const response = await updateEndereco(idFornecedorEndereco, endereco);
    if (response) {
      setSuccessMessage(`A edição do Endereço ${endereco.logradouro} foi realizada com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ["fornecedores"]});
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
  setOpenEditEnderecoDialog(false);
  };

  const handleSaveContato = async (contato: Contato) => {
    const response = await updateContato(idFornecedorContato, contato);
    if (response) {
      setSuccessMessage(`A edição do Contato ${contato.nome} foi realizada com sucesso!`);

    queryClient.invalidateQueries({ queryKey: ["fornecedores"]});

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
    }
    setOpenEditContatoDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteItem && deleteType) {
      if (deleteType === "fornecedor") {
        await deleteFornecedor(deleteItem.id);
        setSuccessMessage(`O Fornecedor ${deleteItem.nomeFantasia} foi excluído com sucesso!`);
        setTimeout(() => {
        setSuccessMessage("");
      }
      , 5000);
      
      } else if (deleteType === "endereco") {
        await deleteEndereco(deleteItem.id);
        setSuccessMessage(`O Endereço ${deleteItem.logradouro} foi excluído com sucesso!`);
        setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      } else if (deleteType === "contato") {
        await deleteContato(deleteItem.id);
        setSuccessMessage(`O Contato ${deleteItem.nome} foi excluído com sucesso!`);
        setTimeout(() => {
        setSuccessMessage("");
        }, 5000);
      }
      queryClient.invalidateQueries({ queryKey: ["fornecedores"]});
      setOpenDeleteDialog(false);
    }
  };

  const handleAddContato = (fornecedorId: string) => {
    setFornecedorIdToAddContato(fornecedorId);
    setOpenCreateContatoDialog(true);
  };

  const handleAddEndereco = (fornecedorId: string) => {
    setFornecedorIdToAddContato(fornecedorId);
    setOpenCreateEnderecoDialog(true);
  };
  const handleSaveNewContato = async (contato: CreateContatoInput) => {
    const response = await CreateContato(contato, fornecedorIdToAddContato);
    if (response) {
      setSuccessMessage(`O Contato ${contato.nome} foi cadastrado com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ["fornecedores"]});
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
    setOpenCreateContatoDialog(false);
    setFornecedorIdToAddContato("");
  };

  const handleSaveNewEndereco = async (endereco: CreateEnderecoInput) => {
    const response = await CreateEndereco(endereco, fornecedorIdToAddContato);
    if (response) {
      setSuccessMessage(`O Endereço ${endereco.logradouro} foi cadastrado com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ["fornecedores"]});
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
    setOpenCreateEnderecoDialog(false);
    setFornecedorIdToAddContato("");
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, data ? data.length - page * rowsPerPage : 0);

  return (
    <Box sx={{ width: "90%", mb: 2, position: "absolute", height: "60%",
      top: "50%",
      left: "50%",
      transform: 'translate(-50%, -50%)' , zIndex:"1"}}>
        {successMessage && <Alert variant="filled" severity="success" style={{position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)", zIndex:"2"}}>{successMessage}</Alert>}

      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Paper elevation={6} >
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell >
                    <Typography variant="h6">Razão Social</Typography>
                    </TableCell>
                  <TableCell align="center" sx={{marginLeft:""}}>
                    <Typography variant="h6">Nome Fantasia</Typography>
                    
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">CNPJ</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Inscrição Estadual</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Ações</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ? data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((fornecedor) => (
                        <Row
                          key={fornecedor.id}
                          row={createData(
                            fornecedor,
                            fornecedor.enderecos,
                            fornecedor.contatos
                          )}
                          onEditFornecedor={handleEditFornecedor}
                          onDelete={handleDelete}
                          onEditEndereco={handleEditEndereco}
                          onEditContato={handleEditContato}
                          onAddContato={handleAddContato}
                          onAddEndereco={handleAddEndereco}
                        />
                      ))
                  : null}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={6}
                    count={data?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <FornecedorDialogDetails
        open={openDialog}
        fornecedor={selectedFornecedor}
        onClose={handleCloseDialog}
        onSave={handleSaveFornecedor}
      />
      <EnderecoDialogEdit
        open={openEditEnderecoDialog}
        endereco={selectedEndereco}
        onClose={handleCloseEditEnderecoDialog}
        onSave={handleSaveEndereco}
      />

      <ContatoDialogEdit
        open={openEditContatoDialog}
        contato={selectedContato}
        onClose={handleCloseEditContatoDialog}
        onSave={handleSaveContato}
      />

      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        message={`Tem certeza de que deseja excluir este ${
          deleteType === "fornecedor"
            ? "fornecedor"
            : deleteType === "endereco"
            ? "endereço"
            : "contato"
        }?`}
      />

      <CreateContatoDialog
        open={openCreateContatoDialog}
        onClose={handleCloseCreateContatoDialog}
        onSave={handleSaveNewContato}
      />

      <CreateEnderecoDialog
        open={openCreateEnderecoDialog}
        onClose={handleCloseCreateEnderecoDialog}
        onSave={handleSaveNewEndereco}
      />
    </Box>
  );
}