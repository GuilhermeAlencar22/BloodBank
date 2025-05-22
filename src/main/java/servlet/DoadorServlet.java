package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.DoadorDAO;
import dao.PessoaDAO;
import domain.Doador;
import domain.Pessoa;

@WebServlet("/doadores/*")
public class DoadorServlet extends HttpServlet {

    private final DoadorDAO doadorDAO = new DoadorDAO();
    private final PessoaDAO pessoaDAO = new PessoaDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            List<Doador> lista = doadorDAO.listarTodos();
            resp.getWriter().write(gson.toJson(lista));
        } else {
            String cpf = pathInfo.substring(1);
            Doador d = doadorDAO.buscarPorCpf(cpf);
            if (d == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Doador não encontrado\"}");
            } else {
                resp.getWriter().write(gson.toJson(d));
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");

        Doador doador = gson.fromJson(req.getReader(), Doador.class);
        Pessoa p = doador.getPessoa();

        Pessoa existingPessoa = pessoaDAO.buscarPorCpf(p.getCpf());
        if (existingPessoa != null) {
            resp.setStatus(HttpServletResponse.SC_CONFLICT);
            resp.getWriter().write("{\"error\":\"Pessoa já cadastrada\"}");
            return;
        }

        pessoaDAO.inserir(p);

        Doador existingDoador = doadorDAO.buscarPorCpf(p.getCpf());
        if (existingDoador != null) {
            resp.setStatus(HttpServletResponse.SC_CONFLICT);
            resp.getWriter().write("{\"error\":\"Doador já cadastrado\"}");
            return;
        }

        doadorDAO.inserir(doador);
        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Doador cadastrado com sucesso\"}");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"CPF não informado\"}");
            return;
        }
        String cpf = pathInfo.substring(1);
        Doador d = doadorDAO.buscarPorCpf(cpf);
        if (d == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Doador não encontrado\"}");
        } else {
            doadorDAO.deletar(cpf);
            resp.getWriter().write("{\"message\":\"Doador deletado com sucesso\"}");
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");

        Doador doadorAtualizado = gson.fromJson(req.getReader(), Doador.class);
        String cpf = doadorAtualizado.getCpf();

        Doador existente = doadorDAO.buscarPorCpf(cpf);
        if (existente == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Doador não encontrado\"}");
            return;
        }

        // Atualiza os dados na tabela Pessoa
        pessoaDAO.atualizar(doadorAtualizado.getPessoa());

        // Atualiza os dados na tabela Doador
        doadorDAO.atualizar(doadorAtualizado);

        resp.getWriter().write("{\"message\":\"Doador atualizado com sucesso\"}");
    }
}
