package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import domain.Atende;

public class AtendeDAO {

    public List<Atende> listarTodos() {
        String sql = "SELECT * FROM Atende";
        List<Atende> lista = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Atende a = new Atende();
                a.setCnpjHospital(rs.getString("cnpj_hospital"));
                a.setCpfPaciente(rs.getString("cpf_paciente"));
                a.setIdFuncionario(rs.getString("id_funcionario"));
                a.setDataAtendimento(rs.getString("data_atendimento"));
                lista.add(a);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar atendimentos: " + e.getMessage(), e);
        }
        return lista;
    }

    public void inserir(Atende a) {
        String sql = "INSERT INTO Atende (cnpj_hospital, cpf_paciente, id_funcionario) VALUES (?, ?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, a.getCnpjHospital());
            ps.setString(2, a.getCpfPaciente());
            ps.setString(3, a.getIdFuncionario());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao registrar atendimento: " + e.getMessage(), e);
        }
    }
}
