package com.insightlab.desafio.backend.repositories;

import com.insightlab.desafio.backend.domain.contato.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, String>{
}
