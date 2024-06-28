package com.insightlab.desafio.backend.dto.fornecedor;

import com.insightlab.desafio.backend.domain.contato.Contato;
import com.insightlab.desafio.backend.domain.endereco.Endereco;

import java.util.Date;
import java.util.List;

public record UpdateOrFindFornecedorDTO(
        String id,
        String razaoSocial,
        String nomeFantasia,
        String cnpj,
        String inscricaoEstadual,

        Date updatedAt,

        Date createdAt,

        List<Endereco>enderecos,
        List<Contato> contatos
) {
}
