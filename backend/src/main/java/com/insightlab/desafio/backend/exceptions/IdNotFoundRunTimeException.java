package com.insightlab.desafio.backend.exceptions;

public class IdNotFoundRunTimeException extends RuntimeException{

    public IdNotFoundRunTimeException(String id, Throwable cause){
        super("Id " + id + " não encontrado", cause);
    }
}
