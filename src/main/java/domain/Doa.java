package domain;

import java.time.LocalDateTime;

public class Doa {
    private String idBolsa;
    private String cpfDoador;
    private LocalDateTime dataDoacao;

    public String getIdBolsa() {
        return idBolsa;
    }

    public void setIdBolsa(String idBolsa) {
        this.idBolsa = idBolsa;
    }

    public String getCpfDoador() {
        return cpfDoador;
    }

    public void setCpfDoador(String cpfDoador) {
        this.cpfDoador = cpfDoador;
    }

    public LocalDateTime getDataDoacao() {
        return dataDoacao;
    }

    public void setDataDoacao(LocalDateTime dataDoacao) {
        this.dataDoacao = dataDoacao;
    }
}
