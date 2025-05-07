// src/pages/sistema/Sistema.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import "./Sistema.css";

function Sistema() {
  const [estoqueData, setEstoqueData] = useState([]);
  const [sexoData, setSexoData] = useState({ M: 0, F: 0, Outro: 0 });

  useEffect(() => {
    // Buscar dados do estoque
    fetch("http://localhost:8080/estoque")
      .then(res => res.json())
      .then(data => {
        console.log("Estoque recebido:", data);
        setEstoqueData(data);
      })
      .catch(err => console.error("Erro ao buscar estoque:", err));

    // Buscar dados dos doadores
    fetch("http://localhost:8080/doadores")
      .then(res => res.json())
      .then(data => {
        console.log("Doadores recebidos:", data);
        const counts = { M: 0, F: 0, Outro: 0 };
        data.forEach(doador => {
          const sexo = doador.sexo?.toUpperCase();
          if (sexo === "M") counts.M++;
          else if (sexo === "F") counts.F++;
          else counts.Outro++;
        });
        setSexoData(counts);
      })
      .catch(err => console.error("Erro ao buscar doadores:", err));
  }, []);

  useEffect(() => {
    Chart.getChart("bloodChart")?.destroy();
    Chart.getChart("doadoresChart")?.destroy();

    const ctx1 = document.getElementById("bloodChart");
    if (ctx1 && estoqueData.length > 0) {
      const labels = estoqueData.map(e => e.tipoSanguineo);
      const values = estoqueData.map(e => e.qtdBolsas);
      new Chart(ctx1, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Bolsas em Estoque",
            data: values,
            backgroundColor: "#7B1E1E"
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } } }
        }
      });
    }

    const ctx2 = document.getElementById("doadoresChart");
    const total = Object.values(sexoData).reduce((a, b) => a + b, 0);
    if (ctx2 && total > 0) {
      new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: ["Homens", "Mulheres", "Outros"],
          datasets: [{
            data: [sexoData.M, sexoData.F, sexoData.Outro],
            backgroundColor: ["#ec3e67", "#478eff", "#aaa"]
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: "bottom" } }
        }
      });
    }
  }, [estoqueData, sexoData]);

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

      <div className="sistema-analytics">
        <h2 className="sistema-subheader">Estatísticas do Sistema</h2>
        <div className="sistema-charts">
          <div className="chart-card">
            <h3>Estoque por Tipo Sanguíneo</h3>
            <canvas id="bloodChart"></canvas>
          </div>
          <div className="chart-card">
            <h3>Perfil dos Doadores</h3>
            <canvas id="doadoresChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sistema;
