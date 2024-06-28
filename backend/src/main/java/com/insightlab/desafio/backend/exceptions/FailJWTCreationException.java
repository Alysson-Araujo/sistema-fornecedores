package com.insightlab.desafio.backend.exceptions;

public class FailJWTCreationException extends RuntimeException{
    public FailJWTCreationException(String message, Throwable cause){
        super(message, cause);
    }
}
