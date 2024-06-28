package com.insightlab.desafio.backend.exceptions;

public class NoResultEntityByIdException extends RuntimeException{
    public NoResultEntityByIdException(String message, Throwable cause){
        super(message, cause);
    }

    public NoResultEntityByIdException(String message){
        super(message);
    }
}
