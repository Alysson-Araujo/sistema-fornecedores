package com.insightlab.desafio.backend.dto.contato;

public record UpdateContatoDTO(
        String id,
        String nome,
        String email,
        String telefone,

        String cargo,

        String createdAt,
        String updatedAt
) {

}

