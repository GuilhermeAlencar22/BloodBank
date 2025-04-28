package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.HospitalDAO;
import domain.Hospital;

@WebServlet("/hospitais/*")
public class HospitalServlet extends HttpServlet {

    private final HospitalDAO dao = new HospitalDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            List<Hospital> lista = dao.listarTodos();
            resp.getWriter().write(gson.toJson(lista));
        } else {
            String cnpj = pathInfo.substring(1);
            Hospital h = dao.buscarPorCnpj(cnpj);
            if (h == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Hospital não encontrado\"}");
            } else {
                resp.getWriter().write(gson.toJson(h));
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        Hospital novo = gson.fromJson(req.getReader(), Hospital.class);
        dao.inserir(novo);

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Hospital criado com sucesso\"}");
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"CNPJ não informado\"}");
            return;
        }

        String cnpj = pathInfo.substring(1);
        Hospital existente = dao.buscarPorCnpj(cnpj);
        if (existente == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Hospital não encontrado\"}");
            return;
        }

        Hospital atualizado = gson.fromJson(req.getReader(), Hospital.class);
        dao.atualizar(atualizado);
        resp.getWriter().write("{\"message\":\"Hospital atualizado\"}");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"CNPJ não informado\"}");
            return;
        }

        String cnpj = pathInfo.substring(1);
        Hospital h = dao.buscarPorCnpj(cnpj);
        if (h == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Hospital não encontrado\"}");
        } else {
            dao.deletar(cnpj);
            resp.getWriter().write("{\"message\":\"Hospital deletado\"}");
        }
    }
}
