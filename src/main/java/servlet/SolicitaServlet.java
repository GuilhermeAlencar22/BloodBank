package servlet;

import com.google.gson.Gson;
import dao.SolicitaDAO;
import domain.Solicita;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.List;

@WebServlet("/solicitas")
public class SolicitaServlet extends HttpServlet {

    private final SolicitaDAO dao = new SolicitaDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Solicita s = gson.fromJson(req.getReader(), Solicita.class);
        dao.inserir(s);
        resp.setContentType("application/json");
        resp.getWriter().write("{\"message\": \"Solicitação registrada\"}");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        List<Solicita> lista = dao.listarTodos();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(lista));
    }
}
