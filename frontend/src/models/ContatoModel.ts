
export interface Contato {
    id: string;
    nome: string;
    email: string;
    cargo: string;
    telefone: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateContatoInput {
    id?: string;
    nome: string;
    email: string;
    cargo: string;
    telefone: string;
}

export interface UpdateContatoRequest {
    nome: string;
    email: string;
    cargo: string;
    telefone: string;
}