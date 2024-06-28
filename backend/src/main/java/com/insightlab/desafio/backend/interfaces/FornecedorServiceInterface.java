package com.insightlab.desafio.backend.interfaces;

import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import com.insightlab.desafio.backend.dto.fornecedor.CreateFornecedorDTO;
import com.insightlab.desafio.backend.dto.fornecedor.UpdateOrFindFornecedorDTO;

import java.util.List;
import java.util.Optional;

public interface FornecedorServiceInterface {

    void createFornecedor(CreateFornecedorDTO createFornecedorDTO);

    List<Fornecedor> getAllFornecedores();

    Fornecedor getFornecedorById(String id);

    void updateFornecedor(UpdateOrFindFornecedorDTO updateOrFindFornecedorDTO);

    void deleteFornecedor(String id);
}
