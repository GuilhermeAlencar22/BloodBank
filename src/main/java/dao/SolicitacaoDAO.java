package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Solicitacao;

public class SolicitacaoDAO {

    public void inserir(Solicitacao s) {
        String sql = "INSERT INTO Solicitacao (id_solicitacao, qtd_bolsas_solicitadas, tipo_sanguineo, id_gerente) "
                   + "VALUES (?, ?, ?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, s.getIdSolicitacao());
            ps.setInt(2, s.getQtdBolsasSolicitadas());
            ps.setString(3, s.getTipoSanguineo());
            ps.setString(4, s.getIdGerente());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir solicitação: " + e.getMessage(), e);
        }
    }

    public Solicitacao buscarPorId(String idSolicitacao) {
        String sql = "SELECT * FROM Solicitacao WHERE id_solicitacao=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, idSolicitacao);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Solicitacao s = new Solicitacao();
                s.setIdSolicitacao(rs.getString("id_solicitacao"));
                s.setQtdBolsasSolicitadas(rs.getInt("qtd_bolsas_solicitadas"));
                s.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                s.setIdGerente(rs.getString("id_gerente"));
                s.setDataSolicitacao(rs.getTimestamp("data_solicitacao"));
                return s;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar solicitação por ID: " + e.getMessage(), e);
        }
    }

    public List<Solicitacao> listarTodos() {
        String sql = "SELECT * FROM Solicitacao";
        List<Solicitacao> lista = new ArrayList<>();

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Solicitacao s = new Solicitacao();
                s.setIdSolicitacao(rs.getString("id_solicitacao"));
                s.setQtdBolsasSolicitadas(rs.getInt("qtd_bolsas_solicitadas"));
                s.setTipoSanguineo(rs.getString("tipo_sanguineo"));
                s.setIdGerente(rs.getString("id_gerente"));
                s.setDataSolicitacao(rs.getTimestamp("data_solicitacao"));
                lista.add(s);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar solicitações: " + e.getMessage(), e);
        }
        return lista;
    }

    public void deletar(String idSolicitacao) {
        String sql = "DELETE FROM Solicitacao WHERE id_solicitacao=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, idSolicitacao);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar solicitação: " + e.getMessage(), e);
        }
    }
}
