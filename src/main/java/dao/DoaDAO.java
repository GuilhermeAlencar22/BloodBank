package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Doa;

public class DoaDAO {

    public void inserir(Doa d) {
        String sql = "INSERT INTO Doa (id_bolsa, cpf_doador, data_doacao) VALUES (?, ?, CURRENT_TIMESTAMP)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, d.getIdBolsa());
            ps.setString(2, d.getCpfDoador());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao registrar doação: " + e.getMessage(), e);
        }
    }

    public List<Doa> listarTodas() {
        List<Doa> lista = new ArrayList<>();
        String sql = "SELECT * FROM Doa";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Doa d = new Doa();
                d.setIdBolsa(rs.getString("id_bolsa"));
                d.setCpfDoador(rs.getString("cpf_doador"));
                d.setDataDoacao(rs.getTimestamp("data_doacao").toLocalDateTime());
                lista.add(d);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar doações: " + e.getMessage(), e);
        }

        return lista;
    }
}
