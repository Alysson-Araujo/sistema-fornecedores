package com.insightlab.desafio.backend.services;

import com.insightlab.desafio.backend.domain.contato.Contato;
import com.insightlab.desafio.backend.dto.contato.UpdateContatoDTO;
import com.insightlab.desafio.backend.interfaces.ContatoServiceInterface;
import com.insightlab.desafio.backend.repositories.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ContatoService implements ContatoServiceInterface {

        @Autowired
        private ContatoRepository repository;
        public void updateContato(UpdateContatoDTO contatoDTO) {
            Contato contato =  findContatoById(contatoDTO.id());

            contato.setNome(contatoDTO.nome());
            contato.setEmail(contatoDTO.email());
            contato.setTelefone(contatoDTO.telefone());
            contato.setCargo(contatoDTO.cargo());

            repository.save(contato);
        }

        public Contato findContatoById(String id) {
            return repository.findById(id).orElseThrow(() -> new RuntimeException("Contato não encontrado"));
        }

        public void deleteContato(String id) {
            repository.deleteById(id);
        }

        public void createContato(String id,Contato contato) {
            repository.save(contato);
        }
}
