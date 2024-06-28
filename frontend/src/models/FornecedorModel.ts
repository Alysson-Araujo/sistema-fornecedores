import { Contato, CreateContatoInput, UpdateContatoRequest } from "./ContatoModel";
import { CreateEnderecoInput, Endereco, UpdateEnderecoRequest } from "./EnderecoModel";

export interface Fornecedor {
    id: string;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    inscricaoEstadual?: string;
    createdAt: Date;
    updatedAt: Date;
    enderecos: Endereco[]; 
    contatos: Contato[]; 
}

export interface CreateFornecedorInput {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    inscricaoEstadual?: string;
    enderecos: CreateEnderecoInput[];
    contatos: CreateContatoInput[];
}

export interface CreateFornecedorRequest {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    inscricaoEstadual?: string;
    enderecos: UpdateEnderecoRequest[];
    contatos: UpdateContatoRequest[];
}
