package com.insightlab.desafio.backend.infra;


import com.insightlab.desafio.backend.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ValuesNullException.class)
    private ResponseEntity<BodyException> createFornecedorNullHandler(ValuesNullException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(DataConstraintViolationException.class)
    private ResponseEntity<BodyException> fornecedorConstraintViolationHandler(DataConstraintViolationException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity<BodyException> fornecedorNotFoundHandler(EntityNotFoundException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EntityDataIntegrityViolationException.class)
    private ResponseEntity<BodyException> fornecedorDataIntegrityViolationHandler(EntityDataIntegrityViolationException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.CONFLICT);
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(FindAllEntityDataAccessException.class)
    private ResponseEntity<BodyException> gindAllFornecedoresDataAccessHandler(Exception exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalEntityIdException.class)
    private ResponseEntity<BodyException> illegalIdHandler(IllegalEntityIdException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoResultEntityByIdException.class)
    private ResponseEntity<BodyException> noResultFornecedorByIdHandler(NoResultEntityByIdException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IdNotFoundRunTimeException.class)
    private ResponseEntity<BodyException> idNotFoundHandler(IdNotFoundRunTimeException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FailJWTCreationException.class)
    private ResponseEntity<BodyException> failJWTCreationHandler(FailJWTCreationException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvalidJWTException.class)
    private ResponseEntity<BodyException> invalidJWTHandler(InvalidJWTException exception) {
        BodyException response = ErrorResponseUtil.buildErrorResponse(exception.getMessage(), HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}