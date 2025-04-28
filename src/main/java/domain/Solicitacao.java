package domain;

import java.sql.Timestamp;

public class Solicitacao {
    private String idSolicitacao;
    private int qtdBolsasSolicitadas;
    private String tipoSanguineo;
    private String idGerente;
    private Timestamp dataSolicitacao;

    public Solicitacao() {}

    public Solicitacao(String idSolicitacao, int qtdBolsasSolicitadas, String tipoSanguineo, String idGerente) {
        this.idSolicitacao = idSolicitacao;
        this.qtdBolsasSolicitadas = qtdBolsasSolicitadas;
        this.tipoSanguineo = tipoSanguineo;
        this.idGerente = idGerente;
    }

    public String getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(String idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public int getQtdBolsasSolicitadas() {
        return qtdBolsasSolicitadas;
    }

    public void setQtdBolsasSolicitadas(int qtdBolsasSolicitadas) {
        this.qtdBolsasSolicitadas = qtdBolsasSolicitadas;
    }

    public String getTipoSanguineo() {
        return tipoSanguineo;
    }

    public void setTipoSanguineo(String tipoSanguineo) {
        this.tipoSanguineo = tipoSanguineo;
    }

    public String getIdGerente() {
        return idGerente;
    }

    public void setIdGerente(String idGerente) {
        this.idGerente = idGerente;
    }

    public Timestamp getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(Timestamp dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }
}
