package servlet;

import com.google.gson.Gson;
import dao.BolsaSangueDAO;
import domain.BolsaSangue;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/bolsas/*")
public class BolsaSangueServlet extends HttpServlet {

    private final BolsaSangueDAO dao = new BolsaSangueDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            List<BolsaSangue> lista = dao.listarTodas();
            resp.getWriter().write(gson.toJson(lista));
        } else {
            String id = pathInfo.substring(1);
            BolsaSangue b = dao.buscarPorId(id);
            if (b == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Bolsa não encontrada\"}");
            } else {
                resp.getWriter().write(gson.toJson(b));
            }
        }
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
        BolsaSangue b = dao.buscarPorId(id);
        if (b == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Bolsa não encontrada\"}");
        } else {
            dao.deletar(id);
            resp.getWriter().write("{\"message\":\"Bolsa deletada com sucesso\"}");
        }
    }
}
