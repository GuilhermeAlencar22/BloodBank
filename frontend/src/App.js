import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Páginas
import DoadorList from "./pages/doador/DoadorList";
import DoadorForm from "./pages/doador/DoadorForm";

import HospitalList from "./pages/hospital/HospitalList";
import HospitalForm from "./pages/hospital/HospitalForm";

import GerenteList from "./pages/gerente/GerenteList";
import GerenteForm from "./pages/gerente/GerenteForm";

import SolicitacaoList from "./pages/solicitacao/SolicitacaoList";
import SolicitacaoForm from "./pages/solicitacao/SolicitacaoForm";

import EstoqueList from "./pages/estoque/EstoqueList";
import EstoqueForm from "./pages/estoque/EstoqueForm";

import DoacaoForm from "./pages/doacao/DoacaoForm";

function App() {
  return (
    <Router>
      <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif", maxWidth: "1000px", margin: "auto" }}>
        <header style={{ marginBottom: "40px", borderBottom: "2px solid #c0392b" }}>
          <h1 style={{ color: "#c0392b" }}>🩸 Banco de Sangue</h1>
          <p style={{ fontStyle: "italic" }}>
            Sistema completo para gerenciamento de doadores, hospitais, solicitações e estoque de sangue.
          </p>
        </header>

        {/* Menu */}
        <nav style={{ marginBottom: "40px" }}>
          <section>
            <h3>🔹 Doadores</h3>
            <Link to="/doadores">📋 Listar</Link> |{" "}
            <Link to="/doadores/novo">➕ Cadastrar</Link>
          </section>
          <section>
            <h3>🏥 Hospitais</h3>
            <Link to="/hospitais">📋 Listar</Link> |{" "}
            <Link to="/hospitais/novo">➕ Cadastrar</Link>
          </section>
          <section>
            <h3>🧑‍💼 Gerentes</h3>
            <Link to="/gerentes">📋 Listar</Link> |{" "}
            <Link to="/gerentes/novo">➕ Cadastrar</Link>
          </section>
          <section>
            <h3>📑 Solicitações de Bolsas</h3>
            <Link to="/solicitacoes">📋 Listar</Link> |{" "}
            <Link to="/solicitacoes/novo">➕ Solicitar Bolsas</Link>
          </section>
          <section>
            <h3>📦 Estoque</h3>
            <Link to="/estoque">📋 Ver Estoque</Link> |{" "}
            <Link to="/estoque/novo">➕ Adicionar Manualmente</Link>
          </section>
          <section>
            <h3>⚙️ Funcionalidades</h3>
            <Link to="/doacoes">✅ Registrar Doação</Link>
          </section>
        </nav>

        {/* Rotas */}
        <Routes>
          {/* Doadores */}
          <Route path="/doadores" element={<DoadorList />} />
          <Route path="/doadores/novo" element={<DoadorForm />} />

          {/* Hospitais */}
          <Route path="/hospitais" element={<HospitalList />} />
          <Route path="/hospitais/novo" element={<HospitalForm />} />

          {/* Gerentes */}
          <Route path="/gerentes" element={<GerenteList />} />
          <Route path="/gerentes/novo" element={<GerenteForm />} />

          {/* Solicitações */}
          <Route path="/solicitacoes" element={<SolicitacaoList />} />
          <Route path="/solicitacoes/novo" element={<SolicitacaoForm />} />

          {/* Estoque */}
          <Route path="/estoque" element={<EstoqueList />} />
          <Route path="/estoque/novo" element={<EstoqueForm />} />

          {/* Registro de Doações */}
          <Route path="/doacoes" element={<DoacaoForm />} />

          {/* Página Inicial */}
          <Route path="/" element={<h2>🔴 Bem-vindo ao Sistema de Banco de Sangue!</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
