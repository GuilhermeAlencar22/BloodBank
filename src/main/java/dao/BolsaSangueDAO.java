package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.BolsaSangue;

public class BolsaSangueDAO {

    public void inserir(BolsaSangue b) {
        String sql = "INSERT INTO Bolsa_Sangue (id_bolsa, tipo_sanguineo) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, b.getIdBolsa());
            ps.setString(2, b.getTipoSanguineo());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir bolsa de sangue: " + e.getMessage(), e);
        }
    }

    public BolsaSangue buscarPorId(String id) {
        String sql = "SELECT * FROM Bolsa_Sangue WHERE id_bolsa=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                BolsaSangue b = new BolsaSangue();
                b.setIdBolsa(rs.getString("id_bolsa"));
                b.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                return b;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar bolsa por ID: " + e.getMessage(), e);
        }
    }

    public List<BolsaSangue> listarTodas() {
        String sql = "SELECT * FROM Bolsa_Sangue";
        List<BolsaSangue> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                BolsaSangue b = new BolsaSangue();
                b.setIdBolsa(rs.getString("id_bolsa"));
                b.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                lista.add(b);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar bolsas", e);
        }
        return lista;
    }

    public void deletar(String idBolsa) {
        String sql = "DELETE FROM Bolsa_Sangue WHERE id_bolsa=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, idBolsa);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar bolsa", e);
        }
    }
}
