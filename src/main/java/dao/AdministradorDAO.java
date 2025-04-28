package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Administrador;

public class AdministradorDAO {

    public void inserir(Administrador a) {
        String sql = "INSERT INTO Administrador (id_funcionario) VALUES (?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, a.getIdFuncionario());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir administrador: " + e.getMessage(), e);
        }
    }

    public List<Administrador> listarTodos() {
        String sql = "SELECT * FROM Administrador";
        List<Administrador> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Administrador a = new Administrador();
                a.setIdFuncionario(rs.getString("id_funcionario"));
                lista.add(a);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar administradores: " + e.getMessage(), e);
        }
        return lista;
    }

    public void deletar(String id) {
        String sql = "DELETE FROM Administrador WHERE id_funcionario=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar administrador: " + e.getMessage(), e);
        }
    }
}
