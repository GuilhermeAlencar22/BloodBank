package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.PessoaDAO;
import domain.Pessoa;

@WebServlet("/pessoas/*")
public class PessoaServlet extends HttpServlet {

    private final PessoaDAO dao = new PessoaDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            List<Pessoa> lista = dao.listarTodos();
            resp.getWriter().write(gson.toJson(lista));
        } else {
            String cpf = pathInfo.substring(1);
            Pessoa p = dao.buscarPorCpf(cpf);
            if (p == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Pessoa não encontrada\"}");
            } else {
                resp.getWriter().write(gson.toJson(p));
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");

        BufferedReader reader = req.getReader();
        Pessoa nova = gson.fromJson(reader, Pessoa.class);

        dao.inserir(nova);
        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Pessoa cadastrada com sucesso\"}");
    }
}
