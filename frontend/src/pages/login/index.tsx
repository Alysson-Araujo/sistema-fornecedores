import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const authContext = React.useContext(AuthContext);
  const login = authContext?.login;
  const signed = authContext?.signed;

  const schemaValidation = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
    },
    validationSchema: schemaValidation,
    onSubmit: async (values) => {
      if (login) {
        await login(values.email, values.senha);
      }
    },
  });

  if (signed) {
    return <Navigate to="/home" />;
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
              Bem-Vindo (a) ao Sistema de Fornecedores!
            </Typography>
            <Typography variant="body1">
              Este é um sistema de gerenciamento de fornecedores feito com o objetivo de apresentar uma proposta de solução para o desafio técnico proposto pela empresa <strong>Insight Data Science Lab</strong>.
            </Typography>
          </Paper>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'Blue' }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="current-password"
                value={formik.values.senha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.senha && Boolean(formik.errors.senha)}
                helperText={formik.touched.senha && formik.errors.senha}
              />
              
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
