package domain;

public class BolsaSangue {
    private String idBolsa;       // PK
    private String tipoSanguineo; // VARCHAR(3)

    public BolsaSangue() {}

    public BolsaSangue(String idBolsa, String tipoSanguineo) {
        this.idBolsa = idBolsa;
        this.tipoSanguineo = tipoSanguineo;
    }

    public String getIdBolsa() {
        return idBolsa;
    }

    public void setIdBolsa(String idBolsa) {
        this.idBolsa = idBolsa;
    }

    public String getTipoSanguineo() {
        return tipoSanguineo;
    }

    public void setTipoSanguineo(String tipoSanguineo) {
        this.tipoSanguineo = tipoSanguineo;
    }
}
