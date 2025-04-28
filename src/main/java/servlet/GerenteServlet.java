package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.GerenteDAO;
import domain.Gerente;

@WebServlet("/gerentes/*")
public class GerenteServlet extends HttpServlet {

    private final GerenteDAO dao = new GerenteDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            List<Gerente> lista = dao.listarTodos();
            resp.getWriter().write(gson.toJson(lista));
        } else {
            String id = pathInfo.substring(1);
            Gerente g = dao.buscarPorId(id);
            if (g == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Gerente não encontrado\"}");
            } else {
                resp.getWriter().write(gson.toJson(g));
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        Gerente novo = gson.fromJson(req.getReader(), Gerente.class);
        dao.inserir(novo);

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Gerente cadastrado com sucesso\"}");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"ID não informado\"}");
            return;
        }

        String id = pathInfo.substring(1);
        Gerente g = dao.buscarPorId(id);
        if (g == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Gerente não encontrado\"}");
        } else {
            dao.deletar(id);
            resp.getWriter().write("{\"message\":\"Gerente deletado\"}");
        }
    }
}
