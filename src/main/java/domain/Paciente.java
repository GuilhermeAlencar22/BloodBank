package domain;

public class Paciente {
    private String cpf;

    public Paciente() {}

    public Paciente(String cpf) {
        this.cpf = cpf;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
