package com.heveraldo.controle_financeiro.adapters.out;

import com.heveraldo.controle_financeiro.core.model.Categoria;
import com.heveraldo.controle_financeiro.core.model.TipoTransacao; 
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@SQLDelete(sql = "UPDATE transacoes SET deletado = true WHERE id = ?")
@SQLRestriction("deletado = false")
public class TransacaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private LocalDate data;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTransacao tipo;

    @Builder.Default
    private boolean deletado = false;

    private String observacao;
}