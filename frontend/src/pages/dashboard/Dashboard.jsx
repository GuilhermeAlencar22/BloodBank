import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const stateToRegion = {
  AC: 'Norte', AL: 'Nordeste', AP: 'Norte', AM: 'Norte', BA: 'Nordeste',
  CE: 'Nordeste', DF: 'Centro-Oeste', ES: 'Sudeste', GO: 'Centro-Oeste',
  MA: 'Nordeste', MT: 'Centro-Oeste', MS: 'Centro-Oeste', MG: 'Sudeste',
  PA: 'Norte', PB: 'Nordeste', PR: 'Sul', PE: 'Nordeste', PI: 'Nordeste',
  RJ: 'Sudeste', RN: 'Nordeste', RS: 'Sul', RO: 'Norte', RR: 'Norte',
  SC: 'Sul', SP: 'Sudeste', SE: 'Nordeste', TO: 'Norte'
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [estoqueData, setEstoqueData] = useState([]);
  const [sexoData, setSexoData] = useState({ M: 0, F: 0, Outro: 0 });
  const [faixaEtariaData, setFaixaEtariaData] = useState({});
  const [tiposData, setTiposData] = useState({});
  const [doacoesMensais, setDoacoesMensais] = useState({});
  const [doacoesPorTipo, setDoacoesPorTipo] = useState({});
  const [doacoesTotal, setDoacoesTotal] = useState(0);
  const [mediaDiaria, setMediaDiaria] = useState(0);
  const [hospitais, setHospitais] = useState([]);
  const [regionData, setRegionData] = useState({
    Norte: 0, Nordeste: 0, 'Centro-Oeste': 0, Sudeste: 0, Sul: 0
  });

  useEffect(() => {
    fetch("http://localhost:8080/estoque")
      .then(res => res.json())
      .then(setEstoqueData)
      .catch(err => console.error("Erro ao buscar estoque:", err));

    fetch("http://localhost:8080/doadores")
      .then(res => res.json())
      .then(data => {
        const sexo = { M: 0, F: 0, Outro: 0 };
        const faixas = { "18–25": 0, "26–35": 0, "36–45": 0, "46–60": 0, "60+": 0 };
        const tipos = {};
        data.forEach(d => {
          const s = d.sexo?.trim().toUpperCase();
          if (s === "M") sexo.M++;
          else if (s === "F") sexo.F++;
          else sexo.Outro++;
          const t = d.pessoa?.tipoSanguineo?.trim().toUpperCase() || "ND";
          tipos[t] = (tipos[t] || 0) + 1;
          const id = d.pessoa?.idade;
          if (id >= 18 && id <= 25) faixas["18–25"]++;
          else if (id <= 35) faixas["26–35"]++;
          else if (id <= 45) faixas["36–45"]++;
          else if (id <= 60) faixas["46–60"]++;
          else if (id > 60) faixas["60+"]++;
        });
        setSexoData(sexo);
        setFaixaEtariaData(faixas);
        setTiposData(tipos);
      })
      .catch(err => console.error("Erro ao buscar doadores:", err));

    fetch("http://localhost:8080/doacao")
      .then(res => res.json())
      .then(data => {
        setDoacoesTotal(data.length);

        if (data.length) {
          const datasValidas = data
            .map(d => new Date(d.dataDoacao))
            .filter(d => !isNaN(d));

          const maisAntiga = new Date(Math.min(...datasValidas));
          const maisRecente = new Date(Math.max(...datasValidas));
          const diasAtivos = Math.max(
            Math.ceil((maisRecente - maisAntiga) / (1000 * 60 * 60 * 24)),
            1
          );

          const media = (data.length / diasAtivos).toFixed(2);
          setMediaDiaria(media);
        }

        const porMes = {}, porTipo = {};
        data.forEach(d => {
          const date = new Date(d.dataDoacao);
          if (!isNaN(date)) {
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            porMes[key] = (porMes[key] || 0) + 1;
          }
          const t = d.tipoSanguineo?.toUpperCase() || "ND";
          porTipo[t] = (porTipo[t] || 0) + 1;
        });
        setDoacoesMensais(porMes);
        setDoacoesPorTipo(porTipo);
      })
      .catch(err => console.error("Erro ao buscar doações:", err));

    fetch("http://localhost:8080/hospitais")
      .then(res => res.json())
      .then(setHospitais)
      .catch(err => console.error("Erro ao buscar hospitais:", err));

    fetch("http://localhost:8080/pessoas")
      .then(res => res.json())
      .then(data => {
        const regions = { Norte: 0, Nordeste: 0, 'Centro-Oeste': 0, Sudeste: 0, Sul: 0 };
        data.forEach(p => {
          const uf = p.enderecoEstado?.trim().toUpperCase();
          const reg = stateToRegion[uf];
          if (reg) regions[reg]++;
        });
        setRegionData(regions);
      })
      .catch(err => console.error("Erro ao buscar pessoas:", err));
  }, []);

  useEffect(() => {
    [
      'estoqueChart','perfilChart','faixaEtariaChart','mensalChart',
      'doacoesPorTipoChart','tiposChart','regionChart'
    ].forEach(id => Chart.getChart(id)?.destroy());

    const renderChart = (id, cfg) => {
      const ctx = document.getElementById(id);
      if (ctx) new Chart(ctx, cfg);
    };

    if (estoqueData.length) {
      renderChart('estoqueChart', {
        type: 'bar',
        data: {
          labels: estoqueData.map(e => e.tipoSanguineo),
          datasets: [{
            label: 'Bolsas em Estoque',
            data: estoqueData.map(e => e.qtdBolsas),
            backgroundColor: '#7B1E1E'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    const totalSexo = Object.values(sexoData).reduce((a, b) => a + b, 0);
    if (totalSexo) {
      renderChart('perfilChart', {
        type: 'doughnut',
        data: {
          labels: ['Homens', 'Mulheres', 'Outros'],
          datasets: [{
            data: [sexoData.M, sexoData.F, sexoData.Outro],
            backgroundColor: ['#ec3e67', '#478eff', '#aaa']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    if (Object.keys(faixaEtariaData).length) {
      renderChart('faixaEtariaChart', {
        type: 'bar',
        data: {
          labels: Object.keys(faixaEtariaData),
          datasets: [{
            label: 'Doadores por Faixa Etária',
            data: Object.values(faixaEtariaData),
            backgroundColor: '#7B1E1E'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    if (Object.keys(doacoesMensais).length) {
      const keys = Object.keys(doacoesMensais).sort();
      renderChart('mensalChart', {
        type: 'line',
        data: {
          labels: keys,
          datasets: [{
            label: 'Doações por Mês',
            data: keys.map(k => doacoesMensais[k]),
            borderColor: '#7B1E1E',
            fill: false,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    if (Object.keys(tiposData).length) {
      renderChart('tiposChart', {
        type: 'pie',
        data: {
          labels: Object.keys(tiposData),
          datasets: [{
            data: Object.values(tiposData),
            backgroundColor: ['#F1948A', '#BB8FCE', '#85C1E9', '#76D7C4', '#F7DC6F', '#F0B27A', '#E59866', '#AEB6BF', '#D98880', '#73C6B6', '#BFC9CA', '#D2B4DE']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    if (Object.values(regionData).some(v => v > 0)) {
      renderChart('regionChart', {
        type: 'bar',
        data: {
          labels: Object.keys(regionData),
          datasets: [{
            label: 'Doadores por Região',
            data: Object.values(regionData),
            backgroundColor: '#7B1E1E'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  }, [
    estoqueData, sexoData, faixaEtariaData,
    doacoesMensais, tiposData, doacoesPorTipo, regionData
  ]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Transparência e Impacto</h1>
      <p className="dashboard-intro">
        Este painel mostra dados atualizados sobre doações, estoque, perfil de doadores e os hospitais atendidos.
      </p>
      <div className="dashboard-charts">
        <div className="chart-card total-doacoes">
            <h3>Total de Doações</h3>
            <p className="hospital-counter">{doacoesTotal}</p>
            <p className="card-subinfo">Média diária: {mediaDiaria} doações/dia</p>
        </div>
        <div className="chart-card"><h3>Doações por Mês</h3><canvas id="mensalChart"></canvas></div>
        <div className="chart-card"><h3>Doações por Tipo Sanguíneo </h3><canvas id="tiposChart"></canvas></div>
        <div className="chart-card"><h3>Doadores por Faixa Etária</h3><canvas id="faixaEtariaChart"></canvas></div>
        <div className="chart-card"><h3>Perfil por Sexo</h3><canvas id="perfilChart"></canvas></div>
        <div className="chart-card">
          <h3>Hospitais Cadastrados ({hospitais.length})</h3>
          <ul className="hospital-list">
            {hospitais.map(h => (
              <li key={h.cnpj} className="hospital-item">
                <strong>{h.nome}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="chart-card"><h3>Doadores por Região</h3><canvas id="regionChart"></canvas></div>
      </div>
    </div>
  );
}
