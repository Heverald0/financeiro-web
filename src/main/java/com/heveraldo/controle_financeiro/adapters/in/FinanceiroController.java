package com.heveraldo.controle_financeiro.adapters.in;

import com.heveraldo.controle_financeiro.core.model.Transacao;
import com.heveraldo.controle_financeiro.core.ports.TransacaoRepositoryPort;
import com.heveraldo.controle_financeiro.core.service.FinanceiroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/financeiro")
@RequiredArgsConstructor
public class FinanceiroController {

    private final FinanceiroService financeiroService;
    private final TransacaoRepositoryPort repository;

    @PostMapping("/transacoes")
    public ResponseEntity<Transacao> criar(@RequestBody TransacaoRequest request) {
        Transacao transacao = Transacao.builder()
                .descricao(request.descricao())
                .valor(request.valor())
                .data(request.data())
                .tipo(request.tipo())
                .categoria(request.categoria())
                .observacao(request.observacao())
                .build();
        
        return ResponseEntity.ok(repository.salvar(transacao));
    }

    @GetMapping("/previsao-13/{ano}")
    public ResponseEntity<BigDecimal> obterPrevisao13(@PathVariable int ano) {
        return ResponseEntity.ok(financeiroService.preverDecimoTerceiro(ano));
    }

    @GetMapping("/transacoes")
    public ResponseEntity<List<Transacao>> listarTodas() {
        return ResponseEntity.ok(repository.buscarTodas());
    }
}