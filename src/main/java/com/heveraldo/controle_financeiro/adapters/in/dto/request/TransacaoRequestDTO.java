package com.heveraldo.controle_financeiro.adapters.in.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import com.heveraldo.controle_financeiro.core.model.TipoTransacao;
import com.heveraldo.controle_financeiro.core.model.Categoria;

public record TransacaoRequestDTO(
    @NotBlank(message = "A descrição não pode estar em branco")
    @Size(min = 3, max = 100, message = "A descrição deve ter entre 3 e 100 caracteres")
    String descricao,

    @NotNull(message = "O valor é obrigatório")
    @Positive(message = "O valor deve ser um número positivo")
    BigDecimal valor,

    @NotNull(message = "A data é obrigatória")
    @PastOrPresent(message = "A data não pode ser futura")
    LocalDate data,

    @NotNull(message = "O tipo da transação é obrigatório")
    TipoTransacao tipo,

    @NotNull(message = "A categoria é obrigatória")
    Categoria categoria,

    @Size(max = 255)
    String observacao
) {}