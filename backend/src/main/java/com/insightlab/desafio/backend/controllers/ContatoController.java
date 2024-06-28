package com.insightlab.desafio.backend.controllers;

import com.insightlab.desafio.backend.domain.contato.Contato;
import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import com.insightlab.desafio.backend.dto.contato.UpdateContatoDTO;
import com.insightlab.desafio.backend.exceptions.*;
import com.insightlab.desafio.backend.services.ContatoService;
import com.insightlab.desafio.backend.services.FornecedorService;
import jakarta.persistence.NoResultException;
import jakarta.persistence.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.util.Objects;

@RestController
@RequestMapping("/api/contatos")
public class ContatoController {
    @Autowired
    private ContatoService contatoService;

    @Autowired
    private FornecedorService fornecedorService;

    @PutMapping("/{idFornecedor}")
    public void updateContato(@RequestBody @Valid UpdateContatoDTO contatoDTO, @PathVariable String idFornecedor) {
        try{
            Contato contato = contatoService.findContatoById(contatoDTO.id());
            if(!Objects.equals(contato.getFornecedor().getId(), idFornecedor)){
                throw new RuntimeException("Contato não pertence ao fornecedor");
            }
            contatoService.updateContato(contatoDTO);
        } catch (NullPointerException e) {
            throw new ValuesNullException("Campos obrigatórios não podem ser nulos", e);
        } catch (ConstraintViolationException e) {
            throw new DataConstraintViolationException("Dados do Contato violam restrições de banco de dados", e);
        } catch (DataIntegrityViolationException e) {
            throw new EntityDataIntegrityViolationException("Violação de integridade dos dados", e);
        } catch (IllegalArgumentException e) {
            throw new IllegalEntityIdException("ID do contato é inválido", e);
        } catch (NoResultException e) {
            throw new NoResultEntityByIdException("Nenhum contato encontrado com o ID fornecido", e);
        } catch (NonUniqueResultException e) {
            throw new NonUniqueResultException("Mais de um contato encontrado com o mesmo ID", e);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteContato(@PathVariable String id) {
        try {
            contatoService.deleteContato(id);
        } catch (IllegalArgumentException e) {
            throw new IllegalEntityIdException("ID do contato é inválido", e);
        } catch (NoResultException e) {
            throw new NoResultEntityByIdException("Nenhum contato encontrado com o ID fornecido", e);
        } catch (NonUniqueResultException e) {
            throw new NonUniqueResultException("Mais de um contato encontrado com o mesmo ID", e);
        }
    }

    @PostMapping("/{idFornecedor}")
    public void createContato(@RequestBody @Valid Contato contato, @PathVariable String idFornecedor) {
        try {
            Fornecedor fornecedor = fornecedorService.getFornecedorById(idFornecedor);
            contato.setFornecedor(fornecedor);
            contatoService.createContato(idFornecedor, contato);
        } catch (NullPointerException e) {
            throw new ValuesNullException("Campos obrigatórios não podem ser nulos", e);
        } catch (ConstraintViolationException e) {
            throw new DataConstraintViolationException("Dados do Contato violam restrições de banco de dados", e);
        } catch (DataIntegrityViolationException e) {
            throw new EntityDataIntegrityViolationException("Violação de integridade dos dados", e);
        } catch (IllegalArgumentException e) {
            throw new IllegalEntityIdException("ID do contato é inválido", e);
        } catch (NoResultException e) {
            throw new NoResultEntityByIdException("Nenhum contato encontrado com o ID fornecido", e);
        } catch (NonUniqueResultException e) {
            throw new NonUniqueResultException("Mais de um contato encontrado com o mesmo ID", e);
        } catch (RuntimeException e) {
            throw new IdNotFoundRunTimeException(idFornecedor, e);
        }
    }
}
