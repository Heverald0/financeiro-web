package com.heveraldo.controle_financeiro.core.ports;

import com.heveraldo.controle_financeiro.core.model.Categoria;
import com.heveraldo.controle_financeiro.core.model.Transacao;
import java.util.List;

public interface TransacaoRepositoryPort {
    Transacao salvar(Transacao transacao);
    List<Transacao> buscarTodas();
    List<Transacao> buscarReceitasPorCategoriaEAno(Categoria categoria, int ano);
}