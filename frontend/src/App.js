import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/login/Login';

import Sistema from './pages/sistema/Sistema';
// Componentes compartilhados
import Layout from "./components/Layout";

// Página Inicial
import Home from "./pages/Home/Home";
import SobreNos from "./pages/sobre-nos/SobreNos";

// Páginas funcionais
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
      <Layout>
        <Routes>
          {/* Página Inicial */}
          <Route path="/" element={<Home />} />

          {/* Sobre */}
          <Route path="/sobre" element={<SobreNos />} />

          {/* Doadores */}
          <Route path="/doadores" element={<DoadorList />} />
          <Route path="/doadores/novo" element={<DoadorForm />} />

          {/* Hospitais */}
          <Route path="/hospitais" element={<HospitalList />} />
          <Route path="/hospitais/novo" element={<HospitalForm />} />
          
          <Route path="/Sistema" element={<Sistema />} />

          {/* Gerentes */}
          <Route path="/gerentes" element={<GerenteList />} />
          <Route path="/gerentes/novo" element={<GerenteForm />} />

          {/* Solicitações */}
          <Route path="/solicitacoes" element={<SolicitacaoList />} />
          <Route path="/solicitacoes/novo" element={<SolicitacaoForm />} />

          {/* Estoque */}
          <Route path="/estoque" element={<EstoqueList />} />
          <Route path="/estoque/novo" element={<EstoqueForm />} />

          {/* Doações */}
          <Route path="/doacoes" element={<DoacaoForm />} />
          <Route path="/cadastro" element={<DoadorForm />} />

          <Route path="/login" element={<Login />} />
        
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
