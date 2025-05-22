import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Sistema from './pages/sistema/Sistema';
import Layout from "./components/Layout";

import Home from "./pages/Home/Home";
import SobreNos from "./pages/sobre-nos/SobreNos";

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
import FiltroPage from "./filtros/FiltroPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home e Sobre */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<SobreNos />} />

          {/* Sistema e Dashboard */}
          <Route path="/sistema" element={<Sistema />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Doadores */}
          <Route path="/doadores" element={<DoadorList />} />
          <Route path="/doadores/novo" element={<DoadorForm />} />
          <Route path="/doadores/editar/:cpf" element={<DoadorForm />} />

          {/* Hospitais */}
          <Route path="/hospitais" element={<HospitalList />} />
          <Route path="/hospitais/novo" element={<HospitalForm />} />
          <Route path="/hospitais/editar/:cnpj" element={<HospitalForm />} />

          {/* Gerentes */}
          <Route path="/gerentes" element={<GerenteList />} />
          <Route path="/gerentes/novo" element={<GerenteForm />} />
          <Route path="/gerentes/editar/:id" element={<GerenteForm />} />

          {/* Solicitações */}
          <Route path="/solicitacoes" element={<SolicitacaoList />} />
          <Route path="/solicitacoes/novo" element={<SolicitacaoForm />} />
          <Route path="/solicitacoes/editar/:id" element={<SolicitacaoForm />} />

          {/* Estoque */}
          <Route path="/estoque" element={<EstoqueList />} />
          <Route path="/estoque/novo" element={<EstoqueForm />} />
          <Route path="/estoques/editar/:id" element={<EstoqueForm />} />

          {/* Doações */}
          <Route path="/doacoes" element={<DoacaoForm />} />

          {/* Filtros */}
          <Route path="/filtros" element={<FiltroPage />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
