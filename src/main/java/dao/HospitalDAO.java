package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Hospital;

public class HospitalDAO {

    public void inserir(Hospital h) {
        String sql = "INSERT INTO Hospital (cnpj, nome, telefone, endereco) VALUES (?, ?, ?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, h.getCnpj());
            ps.setString(2, h.getNome());
            ps.setString(3, h.getTelefone());
            ps.setString(4, h.getEndereco());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir hospital: " + e.getMessage(), e);
        }
    }

    public void atualizar(Hospital h) {
        String sql = "UPDATE Hospital SET nome=?, telefone=?, endereco=? WHERE cnpj=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, h.getNome());
            ps.setString(2, h.getTelefone());
            ps.setString(3, h.getEndereco());
            ps.setString(4, h.getCnpj());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar hospital: " + e.getMessage(), e);
        }
    }

    public Hospital buscarPorCnpj(String cnpj) {
        String sql = "SELECT * FROM Hospital WHERE cnpj=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, cnpj);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Hospital h = new Hospital();
                h.setCnpj(rs.getString("cnpj"));
                h.setNome(rs.getString("nome"));
                h.setTelefone(rs.getString("telefone"));
                h.setEndereco(rs.getString("endereco"));
                return h;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar hospital: " + e.getMessage(), e);
        }
    }

    public List<Hospital> listarTodos() {
        String sql = "SELECT * FROM Hospital";
        List<Hospital> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Hospital h = new Hospital();
                h.setCnpj(rs.getString("cnpj"));
                h.setNome(rs.getString("nome"));
                h.setTelefone(rs.getString("telefone"));
                h.setEndereco(rs.getString("endereco"));
                lista.add(h);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar hospitais: " + e.getMessage(), e);
        }
        return lista;
    }

    public void deletar(String cnpj) {
        String sql = "DELETE FROM Hospital WHERE cnpj=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, cnpj);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar hospital: " + e.getMessage(), e);
        }
    }
}
