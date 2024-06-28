package com.insightlab.desafio.backend.domain.contato;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.insightlab.desafio.backend.domain.fornecedor.Fornecedor;
import com.insightlab.desafio.backend.interfaces.TimestampedEntityInterface;
import com.insightlab.desafio.backend.listeners.EntitiesTimestampListeners;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "contatos")
@Entity(name = "contatos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@EntityListeners(EntitiesTimestampListeners.class)
public class Contato implements TimestampedEntityInterface {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String cargo;

    @Column(nullable = false)
    private String telefone;

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
