import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { CadastrarFornecedor } from './pages/CadastroFornecedor';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './pages/login';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { VisualizarFornecedores } from './pages/VisualizarFornecedores';
import Home from './pages/home';
import { About } from './pages/about';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>

          <Routes>
              <Route path="/about" element={<PrivateRoutes>
                <About  />
              </PrivateRoutes>} />
              <Route path="/cadastro-fornecedor" element={<PrivateRoutes>
                <CadastrarFornecedor />
              </PrivateRoutes>} />
              <Route path="/visualizar-fornecedores" element={<PrivateRoutes>
                <VisualizarFornecedores />
              </PrivateRoutes>} />
              <Route path="/home" element={<PrivateRoutes>
                <Home />
              </PrivateRoutes>} />

            <Route path="/" Component={Login} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
