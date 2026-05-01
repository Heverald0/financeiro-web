package com.heveraldo.controle_financeiro.core.ports;

import java.math.BigDecimal;

public interface FinanceiroServicePort {
    BigDecimal preverDecimoTerceiro(int ano);
}