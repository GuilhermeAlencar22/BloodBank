package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.FuncionarioDAO;
import domain.Funcionario;

@WebServlet("/funcionarios/*")
public class FuncionarioServlet extends HttpServlet {

    private final FuncionarioDAO dao = new FuncionarioDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            List<Funcionario> lista = dao.listarTodos();
            resp.getWriter().write(gson.toJson(lista));
        } else {
            String id = pathInfo.substring(1);
            Funcionario f = dao.buscarPorId(id);
            if (f == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Funcionário não encontrado\"}");
            } else {
                resp.getWriter().write(gson.toJson(f));
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        Funcionario novo = gson.fromJson(req.getReader(), Funcionario.class);
        dao.inserir(novo);

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Funcionário criado com sucesso\"}");
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
        Funcionario f = dao.buscarPorId(id);
        if (f == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Funcionário não encontrado\"}");
        } else {
            dao.deletar(id);
            resp.getWriter().write("{\"message\":\"Funcionário deletado com sucesso\"}");
        }
    }
}
