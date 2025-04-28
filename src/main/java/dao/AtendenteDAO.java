package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Atendente;

public class AtendenteDAO {

    public void inserir(Atendente a) {
        String sql = "INSERT INTO Atendente (id_funcionario) VALUES (?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, a.getIdFuncionario());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir atendente: " + e.getMessage(), e);
        }
    }

    public List<Atendente> listarTodos() {
        String sql = "SELECT * FROM Atendente";
        List<Atendente> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Atendente a = new Atendente();
                a.setIdFuncionario(rs.getString("id_funcionario"));
                lista.add(a);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar atendentes: " + e.getMessage(), e);
        }
        return lista;
    }

    public void deletar(String id) {
        String sql = "DELETE FROM Atendente WHERE id_funcionario=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar atendente: " + e.getMessage(), e);
        }
    }
}
