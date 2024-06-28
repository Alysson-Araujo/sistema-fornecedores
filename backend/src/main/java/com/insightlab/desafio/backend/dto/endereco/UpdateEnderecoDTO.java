package com.insightlab.desafio.backend.dto.endereco;

public record UpdateEnderecoDTO(
        String id,
        String cep,
        String logradouro,
        String numero,
        String complemento,
        String bairro,
        String cidade,
        String estado,
        String pais,
        String createdAt,
        String updatedAt

) {

}