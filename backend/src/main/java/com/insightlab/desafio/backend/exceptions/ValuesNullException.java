package com.insightlab.desafio.backend.exceptions;

public class ValuesNullException extends RuntimeException{
    public ValuesNullException(String message, Throwable cause){
        super(message, cause);
    }
}
