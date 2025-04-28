package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Gerente;

public class GerenteDAO {

    public void inserir(Gerente g) {
        String sql = "INSERT INTO Gerente (id_funcionario, cnpj_hospital) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, g.getIdFuncionario());
            ps.setString(2, g.getCnpjHospital());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir gerente: " + e.getMessage(), e);
        }
    }

    public List<Gerente> listarTodos() {
        String sql = "SELECT * FROM Gerente";
        List<Gerente> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Gerente g = new Gerente();
                g.setIdFuncionario(rs.getString("id_funcionario"));
                g.setCnpjHospital(rs.getString("cnpj_hospital"));
                lista.add(g);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar gerentes: " + e.getMessage(), e);
        }
        return lista;
    }

    public Gerente buscarPorId(String id) {
        String sql = "SELECT * FROM Gerente WHERE id_funcionario=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Gerente g = new Gerente();
                g.setIdFuncionario(rs.getString("id_funcionario"));
                g.setCnpjHospital(rs.getString("cnpj_hospital"));
                return g;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar gerente: " + e.getMessage(), e);
        }
    }

    public void deletar(String id) {
        String sql = "DELETE FROM Gerente WHERE id_funcionario=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar gerente: " + e.getMessage(), e);
        }
    }
}
