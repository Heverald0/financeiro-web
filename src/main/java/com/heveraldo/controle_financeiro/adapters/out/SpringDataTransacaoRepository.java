package com.heveraldo.controle_financeiro.adapters.out;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.heveraldo.controle_financeiro.core.model.Categoria;
import java.util.List;

public interface SpringDataTransacaoRepository extends JpaRepository<TransacaoEntity, Long> {
    
    @Query("SELECT t FROM TransacaoEntity t WHERE t.categoria = :categoria AND YEAR(t.data) = :ano")
    List<TransacaoEntity> buscarReceitasPorCategoriaEAno(
        @Param("categoria") Categoria categoria, 
        @Param("ano") int ano
    );
}