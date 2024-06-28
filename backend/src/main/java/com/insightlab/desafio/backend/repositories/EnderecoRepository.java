package com.insightlab.desafio.backend.repositories;

import com.insightlab.desafio.backend.domain.endereco.Endereco;
import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, String> {
}
