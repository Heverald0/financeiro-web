package com.heveraldo.controle_financeiro.adapters.in;

import com.heveraldo.controle_financeiro.core.model.Categoria;
import com.heveraldo.controle_financeiro.core.model.TipoTransacao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransacaoRequest(
    @NotBlank String descricao,
    @NotNull @Positive BigDecimal valor,
    @NotNull LocalDate data,
    @NotNull TipoTransacao tipo,
    @NotNull Categoria categoria,
    String observacao
) {}