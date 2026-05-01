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

    private TransacaoEntity toEntity(Transacao domain) {
    return new TransacaoEntity(
        domain.getId(),
        domain.getDescricao(),
        domain.getValor(),
        domain.getData(),
        domain.getTipo(),
        domain.getCategoria(),
        domain.getObservacao()
    );
}

private Transacao toDomain(TransacaoEntity entity) {
    return Transacao.builder()
        .id(entity.getId())
        .descricao(entity.getDescricao())
        .valor(entity.getValor())
        .data(entity.getData())
        .tipo(entity.getTipo())
        .categoria(entity.getCategoria())
        .observacao(entity.getObservacao())
        .build();
}
}