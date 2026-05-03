package com.heveraldo.controle_financeiro.adapters.in.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import com.heveraldo.controle_financeiro.core.model.TipoTransacao;
import com.heveraldo.controle_financeiro.core.model.Categoria;

public record TransacaoResponseDTO(
    Long id,
    String descricao,
    BigDecimal valor,
    LocalDate data,
    TipoTransacao tipo,
    Categoria categoria,
    String observacao
) {}