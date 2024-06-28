package com.insightlab.desafio.backend.exceptions;

public class DataConstraintViolationException extends RuntimeException {
    public DataConstraintViolationException(String message, Throwable cause) {
        super(message, cause);
    }
}
