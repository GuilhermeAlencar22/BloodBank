package domain;

public class Armazena {
    private int idEstoque;
    private String idBolsa;

    public Armazena() {}

    public Armazena(int idEstoque, String idBolsa) {
        this.idEstoque = idEstoque;
        this.idBolsa = idBolsa;
    }

    public int getIdEstoque() {
        return idEstoque;
    }

    public void setIdEstoque(int idEstoque) {
        this.idEstoque = idEstoque;
    }

    public String getIdBolsa() {
        return idBolsa;
    }

    public void setIdBolsa(String idBolsa) {
        this.idBolsa = idBolsa;
    }
}
