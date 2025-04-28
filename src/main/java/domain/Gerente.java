package domain;

public class Gerente {
    private String idFuncionario; // PK e FK para Funcionario
    private String cnpjHospital;  // FK para Hospital

    public Gerente() {}

    public Gerente(String idFuncionario, String cnpjHospital) {
        this.idFuncionario = idFuncionario;
        this.cnpjHospital = cnpjHospital;
    }

    public String getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(String idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getCnpjHospital() {
        return cnpjHospital;
    }

    public void setCnpjHospital(String cnpjHospital) {
        this.cnpjHospital = cnpjHospital;
    }
}
