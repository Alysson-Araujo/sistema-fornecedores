package com.insightlab.desafio.backend.interfaces;

import com.insightlab.desafio.backend.domain.contato.Contato;
import com.insightlab.desafio.backend.dto.contato.UpdateContatoDTO;

public interface ContatoServiceInterface {

    void updateContato(UpdateContatoDTO contatoDTO);

    Contato findContatoById(String id);

    void deleteContato(String id);

    void createContato(String id,Contato contato);



}
