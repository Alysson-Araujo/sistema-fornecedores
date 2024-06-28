package com.insightlab.desafio.backend.controllers;


import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import com.insightlab.desafio.backend.dto.fornecedor.CreateFornecedorDTO;
import com.insightlab.desafio.backend.dto.fornecedor.UpdateOrFindFornecedorDTO;
import com.insightlab.desafio.backend.exceptions.*;
import jakarta.persistence.NoResultException;
import jakarta.persistence.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.insightlab.desafio.backend.services.FornecedorService;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
@RequestMapping("/api/fornecedores")
public class FornecedorController {

    @Autowired
    private FornecedorService service;

    @PostMapping
    public ResponseEntity<Object> createFornecedor(@RequestBody CreateFornecedorDTO createFornecedorDTO) {
        try {
            service.createFornecedor(createFornecedorDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (NullPointerException e) {
            throw new ValuesNullException("Campos obrigatórios não podem ser nulos", e);
        } catch (ConstraintViolationException e) {
            throw new DataConstraintViolationException("Dados do fornecedor violam restrições de banco de dados", e);
        } catch (DataIntegrityViolationException e) {
            throw new EntityDataIntegrityViolationException("Violação de integridade dos dados", e);
        }
        }

    @GetMapping
    public ResponseEntity<List<Fornecedor>> getAllFornecedores() {
        try{
            return new ResponseEntity<>(service.getAllFornecedores(), HttpStatus.OK);
        } catch (DataAccessException e) {
            throw new FindAllEntityDataAccessException("Fornecedor não encontrado", e);
        }
    }

    @PutMapping
    public ResponseEntity<Object> updateFornecedor(@RequestBody UpdateOrFindFornecedorDTO updateOrFindFornecedorDTO) {
        try {
            service.updateFornecedor(updateOrFindFornecedorDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NullPointerException e) {
            throw new ValuesNullException("Campos obrigatórios não podem ser nulos", e);
        } catch (ConstraintViolationException e) {
            throw new DataConstraintViolationException("Dados do fornecedor violam restrições de banco de dados", e);
        } catch (DataIntegrityViolationException e) {
            throw new EntityDataIntegrityViolationException("Violação de integridade dos dados", e);
        } catch (IllegalArgumentException e) {
            throw new IllegalEntityIdException("ID inválido", e);
        } catch (NoResultException e) {
            throw new NoResultEntityByIdException("Nenhum fornecedor encontrado com o ID fornecido", e);
        } catch (NonUniqueResultException e) {
            throw new NonUniqueResultException("Mais de um fornecedor encontrado com o mesmo ID", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFornecedor(@PathVariable String id) {
        try {
            service.deleteFornecedor(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            throw new IllegalEntityIdException("ID inválido", e);
        } catch (DataIntegrityViolationException e) {
            throw new DataConstraintViolationException("Violação de integridade dos dados", e);
        }
    }
}