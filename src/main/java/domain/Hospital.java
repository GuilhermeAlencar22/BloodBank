package domain;

public class Hospital {
    private String cnpj;
    private String nome;
    private String telefone;
    private String endereco;

    public Hospital() {}

    public Hospital(String cnpj, String nome, String telefone, String endereco) {
        this.cnpj = cnpj;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}
