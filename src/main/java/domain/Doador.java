package domain;

public class Doador {
    private Pessoa pessoa;
    private int qtdBolsasDoadas;
    private String sexo;

    public Doador() {}

    public Doador(Pessoa pessoa, int qtdBolsasDoadas, String sexo) {
        this.pessoa = pessoa;
        this.qtdBolsasDoadas = qtdBolsasDoadas;
        this.sexo = sexo;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public int getQtdBolsasDoadas() {
        return qtdBolsasDoadas;
    }

    public void setQtdBolsasDoadas(int qtdBolsasDoadas) {
        this.qtdBolsasDoadas = qtdBolsasDoadas;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    // 🚀 Novo método auxiliar: pegar o CPF diretamente
    public String getCpf() {
        return pessoa != null ? pessoa.getCpf() : null;
    }
}
