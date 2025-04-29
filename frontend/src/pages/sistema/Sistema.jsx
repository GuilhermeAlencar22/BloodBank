// src/pages/sistema/Sistema.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Sistema.css";

function Sistema() {
  return (
    <div className="sistema-container">
      <h1 className="sistema-header">Painel do Banco de Sangue</h1>
      <div className="sistema-grid">

        <div className="sistema-card">
          <h3>👤 Doadores</h3>
          <Link to="/doadores">📋 Listar Doadores</Link>
        </div>

        <div className="sistema-card">
          <h3>🏥 Hospitais</h3>
          <Link to="/hospitais">📋 Listar Hospitais</Link><br />
          <Link to="/hospitais/novo">➕ Cadastrar Hospital</Link>
        </div>

        <div className="sistema-card">
          <h3>🧑‍💼 Gerentes</h3>
          <Link to="/gerentes">📋 Listar Gerentes</Link><br />
          <Link to="/gerentes/novo">➕ Cadastrar Gerente</Link>
        </div>

        <div className="sistema-card">
          <h3>📑 Solicitações</h3>
          <Link to="/solicitacoes">📋 Listar Solicitações</Link><br />
          <Link to="/solicitacoes/novo">➕ Solicitar Bolsas</Link>
        </div>

        <div className="sistema-card">
          <h3>📦 Estoque</h3>
          <Link to="/estoque">📋 Ver Estoque</Link><br />
          <Link to="/estoque/novo">➕ Adicionar Estoque</Link>
        </div>

        <div className="sistema-card">
          <h3>⚙️ Funcionalidades</h3>
          <Link to="/doacoes">✅ Registrar Doação</Link>
        </div>

      </div>
    </div>
  );
}

export default Sistema;
