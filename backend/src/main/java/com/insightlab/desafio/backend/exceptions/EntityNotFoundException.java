package com.insightlab.desafio.backend.exceptions;

public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(String idFornecedor, Throwable cause){
        super("Fornecedor com id " + idFornecedor + " não encontrado", cause);
    }
}