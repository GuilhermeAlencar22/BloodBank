package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import domain.Estoque;

public class EstoqueDAO {

    public void inserir(Estoque e) {
        String sql = "INSERT INTO estoque (tipo_sanguineo, qtd_bolsas) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, e.getTipoSanguineo());
            ps.setInt(2, e.getQtdBolsas());
            ps.executeUpdate();

            ResultSet rsKeys = ps.getGeneratedKeys();
            if (rsKeys.next()) {
                e.setIdEstoque(rsKeys.getInt(1));
            }
        } catch (SQLException ex) {
            throw new RuntimeException("Erro ao inserir no estoque: " + ex.getMessage(), ex);
        }
    }

    public void atualizar(Estoque e) {
        String sql = "UPDATE estoque SET qtd_bolsas=? WHERE id_estoque=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, e.getQtdBolsas());
            ps.setInt(2, e.getIdEstoque());
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException("Erro ao atualizar estoque: " + ex.getMessage(), ex);
        }
    }

    public Estoque buscarPorTipo(String tipo) {
        String sql = "SELECT * FROM estoque WHERE tipo_sanguineo=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, tipo);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Estoque e = new Estoque();
                e.setIdEstoque(rs.getInt("id_estoque"));
                e.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                e.setQtdBolsas(rs.getInt("qtd_bolsas"));
                return e;
            }
            return null;
        } catch (SQLException ex) {
            throw new RuntimeException("Erro ao buscar estoque por tipo: " + ex.getMessage(), ex);
        }
    }

    public List<Estoque> listarTodos() {
        String sql = "SELECT * FROM estoque";
        List<Estoque> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Estoque e = new Estoque();
                e.setIdEstoque(rs.getInt("id_estoque"));
                e.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                e.setQtdBolsas(rs.getInt("qtd_bolsas"));
                lista.add(e);
            }
        } catch (SQLException ex) {
            throw new RuntimeException("Erro ao listar estoque", ex);
        }
        return lista;
    }

    public Estoque buscarPorId(int id) {
        String sql = "SELECT * FROM Estoque WHERE id_estoque=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Estoque e = new Estoque();
                e.setIdEstoque(rs.getInt("id_estoque"));
                e.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                e.setQtdBolsas(rs.getInt("qtd_bolsas"));
                return e;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar estoque por ID: " + e.getMessage(), e);
        }
    }

    public void deletar(int idEstoque) {
        String sql = "DELETE FROM estoque WHERE id_estoque=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idEstoque);
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException("Erro ao deletar do estoque", ex);
        }
    }
}
