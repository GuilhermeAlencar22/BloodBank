package domain;

public class Solicita {
    private String idSolicitacao;
    private String idFuncionario;

    public Solicita() {}

    public Solicita(String idSolicitacao, String idFuncionario) {
        this.idSolicitacao = idSolicitacao;
        this.idFuncionario = idFuncionario;
    }

    public String getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(String idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public String getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(String idFuncionario) {
        this.idFuncionario = idFuncionario;
    }
}
