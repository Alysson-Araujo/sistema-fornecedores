import React, { useState } from "react";
import { useFormik } from "formik";
import {
  CreateFornecedorInput,
  CreateFornecedorRequest,
} from "../../../models/FornecedorModel";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FornecedorForm } from "../../forms/fornecedor_form";
import { EnderecoForm } from "../../forms/endereco_form";
import { ContatoForm } from "../../forms/contato_form";
import EnderecoList from "../../lists/endereco";
import ContatoList from "../../lists/contato";
import { CreateFornecedor } from "../../../service/apiServices";
import { Alert, Grid, Paper } from "@mui/material";

import { useNavigate } from "react-router-dom";

const steps = ["Dados do fornecedor", "Dados do endereço", "Dados de contato"];

const validationSchema = Yup.object({
  razaoSocial: Yup.string().required("Required"),
  nomeFantasia: Yup.string().required("Required"),
  cnpj: Yup.string().required("Required"),
  inscricaoEstadual: Yup.string().optional(),
  enderecos: Yup.array().of(
    Yup.object({
      cep: Yup.string().required("Required"),
      logradouro: Yup.string().required("Required"),
      numero: Yup.number().required("Required").min(0, "Número deve ser 0 ou maior"),
      complemento: Yup.string().required("Required"),
      bairro: Yup.string().required("Required"),
      cidade: Yup.string().required("Required"),
      estado: Yup.string().required("Required"),
      pais: Yup.string().required("Required"),
    })
  ),
  contatos: Yup.array().of(
    Yup.object({
      nome: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      cargo: Yup.string().required("Required"),
      telefone: Yup.string().required("Required"),
    })
  ),
});

export function CadastroFornecedor() {
  const navigate = useNavigate();
  const formik = useFormik<CreateFornecedorInput>({
    initialValues: {
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      inscricaoEstadual: "",
      enderecos: [],
      contatos: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const fornecedorRequest: CreateFornecedorRequest = {
        razaoSocial: values.razaoSocial,
        nomeFantasia: values.nomeFantasia,
        cnpj: values.cnpj,
        inscricaoEstadual: values.inscricaoEstadual,
        enderecos: values.enderecos.map((endereco) => ({
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          pais: endereco.pais,
        })),
        contatos: values.contatos.map((contato) => ({
          nome: contato.nome,
          email: contato.email,
          cargo: contato.cargo,
          telefone: contato.telefone,
        })),
      } as CreateFornecedorRequest;

      try {
        const response = await CreateFornecedor(fornecedorRequest);
        if (response?.status === 201) {
          setSuccessMessage("O fornecedor foi cadastrado com sucesso!");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/home?successMessage=success");
          }, 5000);
        }
        else if(response?.status === 400) {
          setErrorMessage("O CNPJ informado já está cadastrado.");
          alert("O CNPJ informado já está cadastrado.")
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      } catch (error) {
        setErrorMessage("Ocorreu um erro ao cadastrar o fornecedor. Tente novamente.");
      }
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = async () => {
    await formik.validateForm();
    if (Object.keys(formik.errors).length !== 0) {
      formik.setErrors(formik.errors);
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderFormStep = () => {
    switch (activeStep) {
        case 0:
            return <FornecedorForm formik={formik} />;
          case 1:
            return (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <EnderecoForm formik={formik} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: 10, marginLeft:"30px", paddingRight:"35px"}}>
                  <EnderecoList formik={formik} />
                    </Paper>
                </Grid>
              </Grid>
            );
          case 2:
            return (
              <>
               <Grid container spacing={2}>
               <Grid item xs={12} md={6}>
                <ContatoForm formik={formik} />
               </Grid>
                <Grid item xs={12} md={6} >
                <Paper elevation={3} style={{ padding: 10, marginLeft:"30px", paddingLeft:"35px"}}>
                <ContatoList formik={formik} />
                </Paper>
                </Grid>
               </Grid>
              </>
            );
      default:
        return null;
    }
  };

  return (
      <Box>
        {successMessage && <Alert variant="filled" severity="success" style={{position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)", zIndex:2}}>{successMessage}</Alert>}

        {errorMessage && <Alert variant="filled" severity="error" 
        style={{position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", zIndex:5}}
        >{errorMessage}</Alert>}
      <Paper elevation={3} style={{ padding: 20, zIndex:1}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            {/* Finalização */}
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Cadastro Concluído!
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
              <form onSubmit={formik.handleSubmit}>{renderFormStep()}</form>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Voltar
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                disabled={
                  (activeStep === 0 &&
                    (!formik.values.razaoSocial || !formik.values.nomeFantasia || !formik.values.cnpj)) ||
                  (activeStep === 1 && formik.values.enderecos.length === 0) ||
                  (activeStep === 2 && formik.values.contatos.length === 0)
                }
              >
                {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Box>
  );
}
