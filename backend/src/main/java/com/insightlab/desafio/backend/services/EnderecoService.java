package com.insightlab.desafio.backend.services;


import com.insightlab.desafio.backend.domain.endereco.Endereco;
import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import com.insightlab.desafio.backend.dto.endereco.UpdateEnderecoDTO;
import com.insightlab.desafio.backend.interfaces.EnderecoServiceInterface;
import com.insightlab.desafio.backend.repositories.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService implements EnderecoServiceInterface {

    @Autowired
    private EnderecoRepository repository;

    public void updateEndereco(UpdateEnderecoDTO enderecoDTO) {
        Endereco endereco = findEnderecoById(enderecoDTO.id());

        endereco.setCep(enderecoDTO.cep());
        endereco.setLogradouro(enderecoDTO.logradouro());
        endereco.setNumero(enderecoDTO.numero());
        endereco.setComplemento(enderecoDTO.complemento());
        endereco.setBairro(enderecoDTO.bairro());
        endereco.setCidade(enderecoDTO.cidade());
        endereco.setEstado(enderecoDTO.estado());
        endereco.setPais(enderecoDTO.pais());

        repository.save(endereco);
    }

    public Endereco findEnderecoById(String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Endereco não encontrado"));
    }

    public void deleteEndereco(String id) {
        repository.deleteById(id);
}

    public void createEndereco(Endereco endereco) {
        repository.save(endereco);
    }


}