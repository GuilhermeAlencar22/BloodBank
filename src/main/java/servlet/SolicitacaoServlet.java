package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.EstoqueDAO;
import dao.SolicitacaoDAO;
import domain.Estoque;
import domain.Solicitacao;

@WebServlet("/solicitacoes/*")
public class SolicitacaoServlet extends HttpServlet {

    private final SolicitacaoDAO dao = new SolicitacaoDAO();
    private final EstoqueDAO estoqueDAO = new EstoqueDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            List<Solicitacao> lista = dao.listarTodos();
            resp.getWriter().write(gson.toJson(lista));
        } else {
            String id = pathInfo.substring(1);
            Solicitacao s = dao.buscarPorId(id);
            if (s == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Solicitação não encontrada\"}");
            } else {
                resp.getWriter().write(gson.toJson(s));
            }
        }
    }

    @Override
protected void doPut(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

    resp.setContentType("application/json");
    String pathInfo = req.getPathInfo();

    if (pathInfo == null || pathInfo.equals("/")) {
        resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        resp.getWriter().write("{\"error\":\"ID da solicitação não informado\"}");
        return;
    }

    String id = pathInfo.substring(1);
    Solicitacao existente = dao.buscarPorId(id);

    if (existente == null) {
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        resp.getWriter().write("{\"error\":\"Solicitação não encontrada\"}");
        return;
    }

    Solicitacao atualizada = gson.fromJson(req.getReader(), Solicitacao.class);

    // Não reprocessamos estoque aqui — apenas alteramos os dados da solicitação
    dao.atualizar(atualizada);

    resp.getWriter().write("{\"message\":\"Solicitação atualizada com sucesso\"}");
}



    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");

        // Ler solicitação recebida
        Solicitacao nova = gson.fromJson(req.getReader(), Solicitacao.class);

        // Buscar estoque disponível para o tipo sanguíneo
        Estoque estoque = estoqueDAO.buscarPorTipo(nova.getTipoSanguineo());

        if (estoque == null || estoque.getQtdBolsas() < nova.getQtdBolsasSolicitadas()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Estoque insuficiente para o tipo sanguíneo solicitado\"}");
            return;
        }

        // Subtrair do estoque
        estoque.setQtdBolsas(estoque.getQtdBolsas() - nova.getQtdBolsasSolicitadas());
        estoqueDAO.atualizar(estoque);

        // Registrar a solicitação
        dao.inserir(nova);

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Solicitação registrada com sucesso e estoque atualizado\"}");
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
        Solicitacao s = dao.buscarPorId(id);
        if (s == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Solicitação não encontrada\"}");
        } else {
            dao.deletar(id);
            resp.getWriter().write("{\"message\":\"Solicitação deletada\"}");
        }
    }
}
