package com.insightlab.desafio.backend.exceptions;

public class IllegalEntityIdException extends RuntimeException{
    public IllegalEntityIdException(String message, Throwable cause){
        super(message, cause);
    }

    public IllegalEntityIdException(String message){
        super(message);
    }
}
