package domain;

public class Administrador {
    private String idFuncionario; // chave estrangeira para Funcionario

    public Administrador() {}

    public Administrador(String idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(String idFuncionario) {
        this.idFuncionario = idFuncionario;
    }
}
