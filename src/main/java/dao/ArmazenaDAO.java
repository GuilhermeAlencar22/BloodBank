package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Armazena;

public class ArmazenaDAO {

    public List<Armazena> listarTodos() {
        String sql = "SELECT * FROM Armazena";
        List<Armazena> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Armazena a = new Armazena();
                a.setIdEstoque(rs.getInt("id_estoque"));
                a.setIdBolsa(rs.getString("id_bolsa"));
                lista.add(a);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar registros da tabela Armazena: " + e.getMessage(), e);
        }
        return lista;
    }

    public void inserir(Armazena a) {
        String sql = "INSERT INTO Armazena (id_estoque, id_bolsa) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, a.getIdEstoque());
            ps.setString(2, a.getIdBolsa());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir em Armazena: " + e.getMessage(), e);
        }
    }
}
