import { Box } from "@mui/material";
import TabelaDeFornecedores from "../../components/tables/fornecedor";
import { AppBarPrivate } from "../../routes/AppBarPrivate";

export function VisualizarFornecedores(){
    return (<Box>
        <AppBarPrivate />
        <TabelaDeFornecedores />
    </Box>
        
    );
}