package com.heveraldo.controle_financeiro.adapters.out;

import com.heveraldo.controle_financeiro.core.model.Categoria;
import com.heveraldo.controle_financeiro.core.model.Transacao;
import com.heveraldo.controle_financeiro.core.ports.TransacaoRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TransacaoRepositoryAdapter implements TransacaoRepositoryPort {

    private final SpringDataTransacaoRepository repository;

    @Override
    public Transacao salvar(Transacao transacao) {
        TransacaoEntity entity = new TransacaoEntity();
        BeanUtils.copyProperties(transacao, entity);
        TransacaoEntity saved = repository.save(entity);
        BeanUtils.copyProperties(saved, transacao);
        return transacao;
    }

    @Override
    public List<Transacao> buscarTodas() {
        return repository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<Transacao> buscarReceitasPorCategoriaEAno(Categoria categoria, int ano) {
        return repository.findByCategoriaAndYear(categoria, ano)
                .stream().map(this::toDomain).collect(Collectors.toList());
    }

    private Transacao toDomain(TransacaoEntity entity) {
        Transacao domain = new Transacao();
        BeanUtils.copyProperties(entity, domain);
        return domain;
    }
}