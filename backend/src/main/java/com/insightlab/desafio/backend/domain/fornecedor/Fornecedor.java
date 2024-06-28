package com.insightlab.desafio.backend.domain.fornecedor;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.insightlab.desafio.backend.domain.contato.Contato;
import com.insightlab.desafio.backend.domain.endereco.Endereco;
import com.insightlab.desafio.backend.dto.fornecedor.CreateFornecedorDTO;
import com.insightlab.desafio.backend.interfaces.TimestampedEntityInterface;
import com.insightlab.desafio.backend.listeners.EntitiesTimestampListeners;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Table(name = "fornecedores")
@Entity(name = "fornecedores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@EntityListeners(EntitiesTimestampListeners.class)
public class Fornecedor implements TimestampedEntityInterface {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private String razaoSocial;

    @Column(nullable = false)
    private String nomeFantasia;

    @Column(unique = true, nullable = false)
    private String cnpj;

    private String inscricaoEstadual;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    @JsonManagedReference
    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Endereco> enderecos;

    @JsonManagedReference
    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contato> contatos;

    public Fornecedor(CreateFornecedorDTO dto){
        this.razaoSocial = dto.razaoSocial();
        this.nomeFantasia = dto.nomeFantasia();
        this.cnpj = dto.cnpj();
        this.inscricaoEstadual = dto.inscricaoEstadual();
        this.enderecos = dto.enderecos().stream()
                .peek(endereco -> endereco.setFornecedor(this))
                .toList();
        this.contatos = dto.contatos().stream()
                .peek(contato -> contato.setFornecedor(this))
                .toList();
    }

    @Override
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}