package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Solicita;

public class SolicitaDAO {

    public List<Solicita> listarTodos() {
        String sql = "SELECT * FROM Solicita";
        List<Solicita> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Solicita s = new Solicita();
                s.setIdSolicitacao(rs.getString("id_solicitacao"));
                s.setIdFuncionario(rs.getString("id_funcionario"));
                lista.add(s);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar solicitações: " + e.getMessage(), e);
        }
        return lista;
    }

    public void inserir(Solicita s) {
        String sql = "INSERT INTO Solicita (id_solicitacao, id_funcionario) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, s.getIdSolicitacao());
            ps.setString(2, s.getIdFuncionario());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir Solicita: " + e.getMessage(), e);
        }
    }
}
