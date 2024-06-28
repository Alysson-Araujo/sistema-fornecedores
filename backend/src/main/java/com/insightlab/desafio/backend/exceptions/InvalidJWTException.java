package com.insightlab.desafio.backend.exceptions;

public class InvalidJWTException extends RuntimeException{
    public InvalidJWTException(String message, Throwable cause){
        super(message, cause);
    }
}
