package com.insightlab.desafio.backend.services;


import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import com.insightlab.desafio.backend.dto.fornecedor.CreateFornecedorDTO;
import com.insightlab.desafio.backend.dto.fornecedor.UpdateOrFindFornecedorDTO;
import com.insightlab.desafio.backend.exceptions.DataConstraintViolationException;
import com.insightlab.desafio.backend.exceptions.IllegalEntityIdException;
import com.insightlab.desafio.backend.exceptions.NoResultEntityByIdException;
import com.insightlab.desafio.backend.interfaces.FornecedorServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.insightlab.desafio.backend.repositories.FornecedorRepository;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Optional;

@Service
public class FornecedorService implements FornecedorServiceInterface {

    @Autowired
    private FornecedorRepository repository;

    @Override
    public void createFornecedor(CreateFornecedorDTO createFornecedorDTO) {
        Fornecedor fornecedor = new Fornecedor(createFornecedorDTO);
        this.saveFornecedor(fornecedor);
    }

    @Override
    public List<Fornecedor> getAllFornecedores() {
        return this.findAllFornecedores();
    }

    @Override
    public Fornecedor getFornecedorById(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalEntityIdException("ID do fornecedor não pode ser nulo ou vazio");
        }
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Nenhum fornecedor encontrado com o ID fornecido"));
    }

    @Override
    public void updateFornecedor(UpdateOrFindFornecedorDTO updateOrFindFornecedorDTO) {
        Fornecedor fornecedor = getFornecedorById(updateOrFindFornecedorDTO.id());

            fornecedor.setRazaoSocial(updateOrFindFornecedorDTO.razaoSocial());
            fornecedor.setNomeFantasia(updateOrFindFornecedorDTO.nomeFantasia());
            fornecedor.setCnpj(updateOrFindFornecedorDTO.cnpj());
            fornecedor.setInscricaoEstadual(updateOrFindFornecedorDTO.inscricaoEstadual());

            // Atualiza endereços
            fornecedor.getEnderecos().clear();
            updateOrFindFornecedorDTO.enderecos().forEach(endereco -> {
                endereco.setFornecedor(fornecedor);
                fornecedor.getEnderecos().add(endereco);
            });

            // Atualiza contatos
            fornecedor.getContatos().clear();
            updateOrFindFornecedorDTO.contatos().forEach(contato -> {
                contato.setFornecedor(fornecedor);
                fornecedor.getContatos().add(contato);
            });

            this.saveFornecedor(fornecedor);

    }

    @Override
    public void deleteFornecedor(String id) {
        Fornecedor existingFornecedor = repository.findById(id)
                .orElseThrow(() -> new NoResultEntityByIdException("Nenhum fornecedor encontrado com o ID fornecido"));
        repository.delete(existingFornecedor);
    }

    private void saveFornecedor(Fornecedor fornecedor) {
        try {
            this.repository.save(fornecedor);
        } catch (ConstraintViolationException e) {
            throw new DataConstraintViolationException("Dados do fornecedor violam restrições de banco de dados", e);
        } catch (DataIntegrityViolationException e) {
            throw new DataConstraintViolationException("Violação de integridade dos dados", e);
        }
    }

    private List<Fornecedor> findAllFornecedores() {
        return this.repository.findAll();
    }
}