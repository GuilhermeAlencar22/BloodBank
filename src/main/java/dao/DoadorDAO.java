package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Doador;
import domain.Pessoa;

public class DoadorDAO {

    public void inserir(Doador d) {
        String sql = "INSERT INTO Doador (cpf, qtd_bolsas_doadas, sexo) VALUES (?, ?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, d.getPessoa().getCpf());
            ps.setInt(2, d.getQtdBolsasDoadas());
            ps.setString(3, d.getSexo());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir doador: " + e.getMessage(), e);
        }
    }

    // 🔥 AQUI ESTÁ O QUE FALTAVA
    public Doador buscarPorCpf(String cpf) {
        String sql = "SELECT p.*, d.qtd_bolsas_doadas, d.sexo FROM Pessoa p INNER JOIN Doador d ON p.cpf = d.cpf WHERE p.cpf=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, cpf);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Pessoa pessoa = new Pessoa();
                pessoa.setCpf(rs.getString("cpf"));
                pessoa.setNome(rs.getString("nome"));
                pessoa.setEnderecoCidade(rs.getString("endereco_cidade"));
                pessoa.setEnderecoEstado(rs.getString("endereco_estado"));
                pessoa.setEnderecoRua(rs.getString("endereco_rua"));
                pessoa.setEnderecoCep(rs.getString("endereco_cep"));
                pessoa.setIdade(rs.getInt("idade"));
                pessoa.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                pessoa.setQtdBolsasDoadas(rs.getInt("qtd_bolsas_doadas"));

                Doador doador = new Doador();
                doador.setPessoa(pessoa);
                doador.setQtdBolsasDoadas(rs.getInt("qtd_bolsas_doadas"));
                doador.setSexo(rs.getString("sexo"));
                return doador;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar doador: " + e.getMessage(), e);
        }
    }

    public List<Doador> listarTodos() {
        List<Doador> lista = new ArrayList<>();
        String sql = "SELECT p.*, d.qtd_bolsas_doadas, d.sexo FROM Pessoa p INNER JOIN Doador d ON p.cpf = d.cpf";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Pessoa pessoa = new Pessoa();
                pessoa.setCpf(rs.getString("cpf"));
                pessoa.setNome(rs.getString("nome"));
                pessoa.setEnderecoCidade(rs.getString("endereco_cidade"));
                pessoa.setEnderecoEstado(rs.getString("endereco_estado"));
                pessoa.setEnderecoRua(rs.getString("endereco_rua"));
                pessoa.setEnderecoCep(rs.getString("endereco_cep"));
                pessoa.setIdade(rs.getInt("idade"));
                pessoa.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                pessoa.setQtdBolsasDoadas(rs.getInt("qtd_bolsas_doadas"));

                Doador doador = new Doador();
                doador.setPessoa(pessoa);
                doador.setQtdBolsasDoadas(rs.getInt("qtd_bolsas_doadas"));
                doador.setSexo(rs.getString("sexo"));
                lista.add(doador);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar doadores: " + e.getMessage(), e);
        }

        return lista;
    }

    public void deletar(String cpf) {
        String sql = "DELETE FROM Doador WHERE cpf=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, cpf);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar doador: " + e.getMessage(), e);
        }
    }

    // 🔥 E para completar, se quiser atualizar diretamente a qtd_bolsas_doadas:
    public void atualizarQtdBolsas(String cpf, int novaQtd) {
        String sql = "UPDATE Doador SET qtd_bolsas_doadas=? WHERE cpf=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, novaQtd);
            ps.setString(2, cpf);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar quantidade de bolsas doadas: " + e.getMessage(), e);
        }
    }
}
