package com.insightlab.desafio.backend.controllers;


import com.insightlab.desafio.backend.domain.endereco.Endereco;
import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import com.insightlab.desafio.backend.dto.endereco.UpdateEnderecoDTO;
import com.insightlab.desafio.backend.exceptions.*;
import com.insightlab.desafio.backend.services.EnderecoService;
import com.insightlab.desafio.backend.services.FornecedorService;
import jakarta.persistence.NoResultException;
import jakarta.persistence.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {
    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private FornecedorService fornecedorService;
    @PutMapping("/{idFornecedor}")
    public void updateEndereco(@RequestBody UpdateEnderecoDTO enderecoDTO, @PathVariable String idFornecedor){
        try{
            Endereco endereco = enderecoService.findEnderecoById(enderecoDTO.id());
            if(!endereco.getFornecedor().getId().equals(idFornecedor)){
                throw new RuntimeException("Endereco não pertence ao fornecedor");
            }
            enderecoService.updateEndereco(enderecoDTO);
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

    @PostMapping("/{idFornecedor}")
    public void createEndereco(@RequestBody Endereco endereco, @PathVariable String idFornecedor){
        try{
            Fornecedor fornecedor = fornecedorService.getFornecedorById(idFornecedor);
            endereco.setFornecedor(fornecedor);
            enderecoService.createEndereco(endereco);
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
    public void deleteEndereco(@PathVariable String id){
        try{
            enderecoService.deleteEndereco(id);
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
}
