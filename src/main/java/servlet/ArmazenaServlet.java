package servlet;

import com.google.gson.Gson;
import dao.ArmazenaDAO;
import domain.Armazena;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.List;

@WebServlet("/armazena")
public class ArmazenaServlet extends HttpServlet {

    private final ArmazenaDAO dao = new ArmazenaDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Armazena armazena = gson.fromJson(req.getReader(), Armazena.class);
        dao.inserir(armazena);

        resp.setContentType("application/json");
        resp.getWriter().write("{\"message\": \"Registro inserido na tabela Armazena\"}");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        List<Armazena> lista = dao.listarTodos();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(lista));
    }
}
