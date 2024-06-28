package com.insightlab.desafio.backend.dto.fornecedor;

import com.insightlab.desafio.backend.domain.contato.Contato;
import com.insightlab.desafio.backend.domain.endereco.Endereco;

import java.util.List;

public record CreateFornecedorDTO(
        String razaoSocial,
        String nomeFantasia,
        String cnpj,
        String inscricaoEstadual,
        List<Endereco>enderecos,
        List<Contato> contatos
) {
}