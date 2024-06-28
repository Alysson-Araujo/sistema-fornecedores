package com.insightlab.desafio.backend.interfaces;

import com.insightlab.desafio.backend.domain.endereco.Endereco;
import com.insightlab.desafio.backend.dto.endereco.UpdateEnderecoDTO;

public interface EnderecoServiceInterface {

    void updateEndereco(UpdateEnderecoDTO enderecoDTO);


    Endereco findEnderecoById(String id);

    void deleteEndereco(String id);

    void createEndereco(Endereco endereco);

}