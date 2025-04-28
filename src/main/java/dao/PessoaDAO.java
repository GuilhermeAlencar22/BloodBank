package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Pessoa;

public class PessoaDAO {

    public void inserir(Pessoa p) {
        String sql = "INSERT INTO Pessoa (cpf, nome, endereco_cidade, endereco_estado, endereco_rua, endereco_cep, idade, tipo_sanguineo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, p.getCpf());
            ps.setString(2, p.getNome());
            ps.setString(3, p.getEnderecoCidade());
            ps.setString(4, p.getEnderecoEstado());
            ps.setString(5, p.getEnderecoRua());
            ps.setString(6, p.getEnderecoCep());
            ps.setInt(7, p.getIdade());
            ps.setString(8, p.getTipoSanguineo());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir pessoa: " + e.getMessage(), e);
        }
    }

    public Pessoa buscarPorCpf(String cpf) {
        String sql = "SELECT p.*, d.qtd_bolsas_doadas FROM Pessoa p LEFT JOIN Doador d ON p.cpf = d.cpf WHERE p.cpf=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, cpf);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Pessoa p = new Pessoa();
                p.setCpf(rs.getString("cpf"));
                p.setNome(rs.getString("nome"));
                p.setEnderecoCidade(rs.getString("endereco_cidade"));
                p.setEnderecoEstado(rs.getString("endereco_estado"));
                p.setEnderecoRua(rs.getString("endereco_rua"));
                p.setEnderecoCep(rs.getString("endereco_cep"));
                p.setIdade(rs.getInt("idade"));
                p.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                p.setQtdBolsasDoadas(rs.getInt("qtd_bolsas_doadas"));
                return p;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar pessoa: " + e.getMessage(), e);
        }
    }

    public void atualizarQtdBolsasDoadas(String cpf, int novaQuantidade) {
        String sql = "UPDATE Doador SET qtd_bolsas_doadas = ? WHERE cpf = ?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, novaQuantidade);
            ps.setString(2, cpf);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar quantidade de bolsas doadas: " + e.getMessage(), e);
        }
    }

    // 🔥 Método que faltava para o listarTodos funcionar
    public List<Pessoa> listarTodos() {
        List<Pessoa> lista = new ArrayList<>();
        String sql = "SELECT p.*, d.qtd_bolsas_doadas FROM Pessoa p LEFT JOIN Doador d ON p.cpf = d.cpf";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Pessoa p = new Pessoa();
                p.setCpf(rs.getString("cpf"));
                p.setNome(rs.getString("nome"));
                p.setEnderecoCidade(rs.getString("endereco_cidade"));
                p.setEnderecoEstado(rs.getString("endereco_estado"));
                p.setEnderecoRua(rs.getString("endereco_rua"));
                p.setEnderecoCep(rs.getString("endereco_cep"));
                p.setIdade(rs.getInt("idade"));
                p.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                p.setQtdBolsasDoadas(rs.getInt("qtd_bolsas_doadas"));
                lista.add(p);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar pessoas: " + e.getMessage(), e);
        }

        return lista;
    }
}
