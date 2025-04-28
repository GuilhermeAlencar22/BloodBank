package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.AdministradorDAO;
import domain.Administrador;

@WebServlet("/administradores/*")
public class AdministradorServlet extends HttpServlet {

    private final AdministradorDAO dao = new AdministradorDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        List<Administrador> lista = dao.listarTodos();
        resp.getWriter().write(gson.toJson(lista));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        Administrador novo = gson.fromJson(req.getReader(), Administrador.class);
        dao.inserir(novo);
        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Administrador cadastrado\"}");
    }
}
