package com.insightlab.desafio.backend.exceptions;

public class EntityDataIntegrityViolationException extends RuntimeException {
    public EntityDataIntegrityViolationException(String message, Throwable cause) {
        super(message, cause);
    }
}
