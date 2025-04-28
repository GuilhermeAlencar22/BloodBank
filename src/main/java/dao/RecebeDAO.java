package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Recebe;

public class RecebeDAO {

    public List<Recebe> listarTodos() {
        String sql = "SELECT * FROM Recebe";
        List<Recebe> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Recebe r = new Recebe();
                r.setIdBolsa(rs.getString("id_bolsa"));
                r.setCpfPaciente(rs.getString("cpf_paciente"));
                r.setDataRecebimento(rs.getString("data_recebimento"));
                lista.add(r);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar recebimentos: " + e.getMessage(), e);
        }
        return lista;
    }

    public void inserir(Recebe r) {
        String sql = "INSERT INTO Recebe (id_bolsa, cpf_paciente) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, r.getIdBolsa());
            ps.setString(2, r.getCpfPaciente());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao registrar recebimento: " + e.getMessage(), e);
        }
    }
}
