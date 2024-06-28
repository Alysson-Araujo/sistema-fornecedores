package com.insightlab.desafio.backend.domain.endereco;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import com.insightlab.desafio.backend.interfaces.TimestampedEntityInterface;
import com.insightlab.desafio.backend.listeners.EntitiesTimestampListeners;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "enderecos")
@Entity(name = "enderecos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@EntityListeners(EntitiesTimestampListeners.class)
public class Endereco implements TimestampedEntityInterface {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String logradouro;

    @Column(nullable = false)
    private String numero;

    @Column(nullable = false)
    private String complemento;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String estado;

    @Column(nullable = false)
    private String pais;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "fornecedor_id", nullable = false)
    private Fornecedor fornecedor;
}
