package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Funcionario;

public class FuncionarioDAO {

    public void inserir(Funcionario f) {
        String sql = "INSERT INTO Funcionario (id_funcionario, nome) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, f.getIdFuncionario());
            ps.setString(2, f.getNome());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir funcionário: " + e.getMessage(), e);
        }
    }

    public Funcionario buscarPorId(String id) {
        String sql = "SELECT * FROM Funcionario WHERE id_funcionario=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Funcionario f = new Funcionario();
                f.setIdFuncionario(rs.getString("id_funcionario"));
                f.setNome(rs.getString("nome"));
                return f;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar funcionário: " + e.getMessage(), e);
        }
    }

    public List<Funcionario> listarTodos() {
        String sql = "SELECT * FROM Funcionario";
        List<Funcionario> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Funcionario f = new Funcionario();
                f.setIdFuncionario(rs.getString("id_funcionario"));
                f.setNome(rs.getString("nome"));
                lista.add(f);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar funcionários: " + e.getMessage(), e);
        }
        return lista;
    }

    public void deletar(String id) {
        String sql = "DELETE FROM Funcionario WHERE id_funcionario=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar funcionário: " + e.getMessage(), e);
        }
    }
}
