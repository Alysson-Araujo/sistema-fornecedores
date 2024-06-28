package com.insightlab.desafio.backend.exceptions;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BodyException {

    private String message;
    private String error;
    private String status;
    private String timestamp;

}
