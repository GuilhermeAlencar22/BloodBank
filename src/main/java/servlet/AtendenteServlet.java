package servlet;

import com.google.gson.Gson;
import dao.AtendenteDAO;
import domain.Atendente;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.List;

@WebServlet("/atendentes")
public class AtendenteServlet extends HttpServlet {

    private final AtendenteDAO dao = new AtendenteDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        List<Atendente> lista = dao.listarTodos();
        resp.getWriter().write(gson.toJson(lista));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        Atendente novo = gson.fromJson(req.getReader(), Atendente.class);
        dao.inserir(novo);
        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Atendente cadastrado\"}");
    }
}
