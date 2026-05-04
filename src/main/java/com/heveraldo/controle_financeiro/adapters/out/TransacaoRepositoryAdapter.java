package com.heveraldo.controle_financeiro.adapters.out;

import com.heveraldo.controle_financeiro.core.model.Categoria;
import com.heveraldo.controle_financeiro.core.model.Transacao;
import com.heveraldo.controle_financeiro.core.ports.TransacaoRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TransacaoRepositoryAdapter implements TransacaoRepositoryPort {

    // Nome alterado para bater com seu print (image_a795ca.png)
    private final SpringDataTransacaoRepository jpaRepository;

    @Override
    public Transacao salvar(Transacao transacao) {
        TransacaoEntity entity = toEntity(transacao);
        TransacaoEntity savedEntity = jpaRepository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public List<Transacao> buscarTodas() {
        return jpaRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Transacao> buscarReceitasPorCategoriaEAno(Categoria categoria, int ano) {
        return jpaRepository.buscarReceitasPorCategoriaEAno(categoria, ano).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deletar(Long id) {
        // Aciona o Soft Delete configurado na Entity
        jpaRepository.deleteById(id);
    }

    private TransacaoEntity toEntity(Transacao transacao) {
        return TransacaoEntity.builder()
                .id(transacao.getId())
                .descricao(transacao.getDescricao())
                .valor(transacao.getValor())
                .data(transacao.getData())
                .tipo(transacao.getTipo())
                .categoria(transacao.getCategoria())
                .observacao(transacao.getObservacao()) 
                .build();
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