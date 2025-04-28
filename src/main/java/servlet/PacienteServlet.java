package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.PacienteDAO;
import domain.Paciente;

@WebServlet("/pacientes")
public class PacienteServlet extends HttpServlet {

    private final PacienteDAO dao = new PacienteDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        List<Paciente> lista = dao.listarTodos();
        resp.getWriter().write(gson.toJson(lista));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Paciente paciente = gson.fromJson(req.getReader(), Paciente.class);
        dao.inserir(paciente);

        resp.setContentType("application/json");
        resp.getWriter().write("{\"message\": \"Paciente registrado\"}");
    }
}
