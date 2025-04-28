package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.BolsaSangueDAO;
import dao.DoaDAO;
import dao.EstoqueDAO;
import dao.PessoaDAO;
import domain.BolsaSangue;
import domain.Doa;
import domain.Estoque;
import domain.Pessoa;

@WebServlet("/doacao")
public class DoacaoServlet extends HttpServlet {

    private final DoaDAO doaDAO = new DoaDAO();
    private final PessoaDAO pessoaDAO = new PessoaDAO();
    private final BolsaSangueDAO bolsaDAO = new BolsaSangueDAO();
    private final EstoqueDAO estoqueDAO = new EstoqueDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");

        String cpf = req.getParameter("cpf");
        String quantidadeStr = req.getParameter("quantidade");
        String tipoSanguineo = req.getParameter("tipoSanguineo");

        if (cpf == null || quantidadeStr == null || tipoSanguineo == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Parâmetros obrigatórios ausentes.\"}");
            return;
        }

        int quantidade;
        try {
            quantidade = Integer.parseInt(quantidadeStr);
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Quantidade inválida.\"}");
            return;
        }

        Pessoa doador = pessoaDAO.buscarPorCpf(cpf);
        if (doador == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Doador não encontrado.\"}");
            return;
        }

        for (int i = 0; i < quantidade; i++) {
            String idBolsa = "BOLSA-" + System.currentTimeMillis() + "-" + i;

            BolsaSangue bolsa = new BolsaSangue();
            bolsa.setIdBolsa(idBolsa);
            bolsa.setTipoSanguineo(tipoSanguineo);
            bolsaDAO.inserir(bolsa);

            Doa doacao = new Doa();
            doacao.setIdBolsa(idBolsa);
            doacao.setCpfDoador(cpf);
            doaDAO.inserir(doacao);
        }

        // Atualiza o estoque
        Estoque estoque = estoqueDAO.buscarPorTipo(tipoSanguineo);
        if (estoque == null) {
            Estoque novo = new Estoque();
            novo.setIdEstoque((int) (System.currentTimeMillis() % 100000));
            novo.setTipoSanguineo(tipoSanguineo);
            novo.setQtdBolsas(quantidade);
            estoqueDAO.inserir(novo);
        } else {
            estoque.setQtdBolsas(estoque.getQtdBolsas() + quantidade);
            estoqueDAO.atualizar(estoque);
        }

        // 🔥 Atualizar a quantidade de bolsas doadas pelo doador
        doador.setQtdBolsasDoadas(doador.getQtdBolsasDoadas() + quantidade);
        pessoaDAO.atualizarQtdBolsasDoadas(doador.getCpf(), doador.getQtdBolsasDoadas());

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Doação registrada e quantidade de bolsas atualizada!\"}");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        List<Doa> lista = doaDAO.listarTodas();
        resp.getWriter().write(gson.toJson(lista));
    }
}
