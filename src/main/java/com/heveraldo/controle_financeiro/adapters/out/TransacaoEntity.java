package com.heveraldo.controle_financeiro.adapters.out;

import com.heveraldo.controle_financeiro.core.model.Categoria;
import com.heveraldo.controle_financeiro.core.model.TipoTransacao;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransacaoEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String descricao;
    private BigDecimal valor;
    private LocalDate data;
    
    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo;
    
    @Enumerated(EnumType.STRING)
    private Categoria categoria;
    
    private String observacao;
}