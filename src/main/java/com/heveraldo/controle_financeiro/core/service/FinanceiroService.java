package com.heveraldo.controle_financeiro.core.service;

import com.heveraldo.controle_financeiro.core.model.Categoria;
import com.heveraldo.controle_financeiro.core.model.Transacao;
import com.heveraldo.controle_financeiro.core.ports.FinanceiroServicePort;
import com.heveraldo.controle_financeiro.core.ports.TransacaoRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinanceiroService implements FinanceiroServicePort{

    private final TransacaoRepositoryPort repository;

    public BigDecimal preverDecimoTerceiro(int ano) {
        List<Transacao> receitasSalariais = repository.buscarReceitasPorCategoriaEAno(Categoria.SALARIO, ano);
        
        if (receitasSalariais.isEmpty()) {
            return BigDecimal.ZERO;
        }

        BigDecimal somaSalarios = receitasSalariais.stream()
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long mesesTrabalhados = receitasSalariais.stream()
                .map(t -> t.getData().getMonth())
                .distinct()
                .count();
        return somaSalarios.divide(BigDecimal.valueOf(mesesTrabalhados), 2, RoundingMode.HALF_UP);
    }
}