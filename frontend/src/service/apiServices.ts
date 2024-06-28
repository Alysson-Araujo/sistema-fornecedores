import instanceAxios from "../config/axios-config";
import { Contato, CreateContatoInput } from "../models/ContatoModel";
import { CreateEnderecoInput, Endereco } from "../models/EnderecoModel";
import { CreateFornecedorRequest, Fornecedor } from "../models/FornecedorModel";
import { LoginModel } from "../models/LoginModel";
import Cookies from "js-cookie";

async function CreateFornecedor(Fornecedor: CreateFornecedorRequest) {
  try {
    const response = await instanceAxios.post("/api/fornecedores", Fornecedor, {
      headers: {
        Authorization: `Bearer ${Cookies.get("@Auth:token")}`,
      },
    });
    return response;
  } catch (error) {
    
      alert("O CNPJ informado já está cadastrado ou o número do endereço contém caractere.");

  
    alert("Sessão expirada, faça login novamente!")
    Cookies.remove("@Auth:token");
    Cookies.remove("@Auth:email");
    window.location.href = "/";
  
}
}

async function SignIn(data: LoginModel){
  try {
    const response = await instanceAxios.post("/auth/login", data);
    if( response.status === 200){
      return response;
    }
    else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }

}


async function CreateContato(
  contato: CreateContatoInput,
  idFornecedor: string
) {
  try {
    const response = await instanceAxios.post(
      `/api/contatos/${idFornecedor}`,
      contato,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("@Auth:token")}`,
        },
      }
    );
    console.log(response.status);
    return response;
  } catch (error) {
    
      alert("Sessão expirada, faça login novamente!")
      Cookies.remove("@Auth:token");
      Cookies.remove("@Auth:email");
      window.location.href = "/";
    
  }
}

async function CreateEndereco(
  endereco: CreateEnderecoInput,
  idFornecedor: string
) {
  try {
    const response = await instanceAxios.post(
      `/api/enderecos/${idFornecedor}`,
      endereco,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("@Auth:token")}`,
        },
      }
    );
    console.log(response.status);
    return response;
  } catch (error) {

    
      alert("Sessão expirada, faça login novamente!")
      Cookies.remove("@Auth:token");
      Cookies.remove("@Auth:email");
      window.location.href = "/";
    
  }
}

async function GetAllFornecedores() {
  try {
    const response = await instanceAxios.get<Fornecedor[]>("/api/fornecedores", {
      headers: {
        Authorization: `Bearer ${Cookies.get("@Auth:token")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    
      alert("Sessão expirada, faça login novamente!")
      Cookies.remove("@Auth:token");
      Cookies.remove("@Auth:email");
      window.location.href = "/";
    
  }
  return [] as Fornecedor[];
}

async function updateFornecedor(Fornecedor: Fornecedor) {
  try {
    const response = await instanceAxios.put("/api/fornecedores", Fornecedor, {
      headers: {
        Authorization: `Bearer ${Cookies.get("@Auth:token")}`,
      },
    });
    console.log(response.status);
    return response;
  } catch (error) {
    
      alert("Sessão expirada, faça login novamente!")
      Cookies.remove("@Auth:token");
      Cookies.remove("@Auth:email");
      window.location.href = "/";

  }
}

async function updateContato(idFornecedor: string, contato: Contato) {
  try {
    const response = await instanceAxios.put(
      `/api/contatos/${idFornecedor}`,
      contato,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("@Auth:token")}`,
        },
      }
    );
    console.log(response.status);
    return response;
  } catch (error) {
    
      alert("Sessão expirada, faça login novamente!")
      Cookies.remove("@Auth:token");
      Cookies.remove("@Auth:email");
      window.location.href = "/";

  }
}

async function updateEndereco(idFornecedor: string, endereco: Endereco) {
  try {
    const response = await instanceAxios.put(
      `/api/enderecos/${idFornecedor}`,
      endereco,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("@Auth:token")}`,
        },
      }
    );
    console.log(response.status);
    return response;
  } catch (error) {
    
      alert("Sessão expirada, faça login novamente!")
      Cookies.remove("@Auth:token");
      Cookies.remove("@Auth:email");
      window.location.href = "/";
    
  }
}

async function deleteFornecedor(id: string) {
  try {
    const response = await instanceAxios.delete(`/api/fornecedores/${id}`);
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

async function deleteContato(id: string) {
  try {
    const response = await instanceAxios.delete(`/api/contatos/${id}`);
    console.log(response.status);
    return response;
  } catch (error) {

      alert("Sessão expirada, faça login novamente!")
      Cookies.remove("@Auth:token");
      Cookies.remove("@Auth:email");
      window.location.href = "/";
    
  }
}

async function deleteEndereco(id: string) {
  try {
    const response = await instanceAxios.delete(`/api/enderecos/${id}`);
    console.log(response.status);
    return response;
  } catch (error) {
    
      alert("Sessão expirada, faça login novamente!")
      Cookies.remove("@Auth:token");
      Cookies.remove("@Auth:email");
      window.location.href = "/";
  }
}

export {
  CreateFornecedor,
  GetAllFornecedores,
  updateFornecedor,
  deleteFornecedor,
  updateContato,
  updateEndereco,
  deleteContato,
  deleteEndereco,
  CreateContato,
  CreateEndereco,
  SignIn
};
