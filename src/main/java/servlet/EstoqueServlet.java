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
import domain.Estoque;

@WebServlet("/estoque")
public class EstoqueServlet extends HttpServlet {
    private final EstoqueDAO estoqueDAO = new EstoqueDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        List<Estoque> lista = estoqueDAO.listarTodos();
        resp.getWriter().write(gson.toJson(lista));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");

        // Desserializar o JSON enviado; note que NÃO esperamos um idEstoque vindo do front-end.
        Estoque e = gson.fromJson(req.getReader(), Estoque.class);

        // Buscar pelo tipo sanguíneo para atualizar o estoque existente ou criar um novo
        Estoque existente = estoqueDAO.buscarPorTipo(e.getTipoSanguineo());
        if (existente != null) {
            // Incrementa a quantidade com o valor informado pelo front-end
            existente.setQtdBolsas(existente.getQtdBolsas() + e.getQtdBolsas());
            estoqueDAO.atualizar(existente);
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("{\"message\":\"Estoque atualizado com sucesso\"}");
        } else {
            // Insere um novo registro; o idEstoque será gerado automaticamente pelo banco
            estoqueDAO.inserir(e);
            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write("{\"message\":\"Estoque criado com sucesso\"}");
        }
    }
}
