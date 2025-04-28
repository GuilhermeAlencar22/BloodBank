package servlet;

import com.google.gson.Gson;
import dao.RecebeDAO;
import domain.Recebe;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.List;

@WebServlet("/recebimentos")
public class RecebeServlet extends HttpServlet {

    private final RecebeDAO dao = new RecebeDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Recebe recebe = gson.fromJson(req.getReader(), Recebe.class);
        dao.inserir(recebe);
        resp.setContentType("application/json");
        resp.getWriter().write("{\"message\": \"Recebimento registrado\"}");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        List<Recebe> lista = dao.listarTodos();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(lista));
    }
}
