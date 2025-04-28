package domain;

public class Atendente {
    private String idFuncionario; // PK e FK para Funcionario

    public Atendente() {}

    public Atendente(String idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(String idFuncionario) {
        this.idFuncionario = idFuncionario;
    }
}
