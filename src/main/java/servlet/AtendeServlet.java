package servlet;

import com.google.gson.Gson;
import dao.AtendeDAO;
import domain.Atende;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.List;

@WebServlet("/atendimentos")
public class AtendeServlet extends HttpServlet {

    private final AtendeDAO dao = new AtendeDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        List<Atende> lista = dao.listarTodos();
        resp.getWriter().write(gson.toJson(lista));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Atende atendimento = gson.fromJson(req.getReader(), Atende.class);
        dao.inserir(atendimento);

        resp.setContentType("application/json");
        resp.getWriter().write("{\"message\": \"Atendimento registrado\"}");
    }
}
