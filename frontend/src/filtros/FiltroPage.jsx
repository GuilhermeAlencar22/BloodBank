import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Filtro.css";

function FiltroPage() {
  const navigate = useNavigate();

  const [doadores, setDoadores] = useState([]);
  const [nomeOuCpf, setNomeOuCpf] = useState("");
  const [tipo, setTipo] = useState("");
  const [sexo, setSexo] = useState("");
  const [faixaEtaria, setFaixaEtaria] = useState("");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/doadores")
      .then(res => res.json())
      .then(setDoadores)
      .catch(err => console.error("Erro ao buscar doadores:", err));
  }, []);

  const filtrarPorNomeOuCpf = () => {
    const termo = nomeOuCpf.trim().toLowerCase();
    const encontrados = doadores.filter(d => {
      const nome = d.pessoa?.nome?.toLowerCase() || "";
      const cpf = d.pessoa?.cpf || "";
      return nome.includes(termo) || cpf.includes(termo);
    });
    setResultado(encontrados);
  };

  const filtrarCombinado = () => {
    const filtrados = doadores.filter(d => {
      const idade = d.pessoa?.idade;
      const tipoMatch = tipo === "" || d.pessoa?.tipoSanguineo === tipo;
      const sexoMatch = sexo === "" || d.sexo === sexo;

      let idadeMatch = true;
      if (faixaEtaria === "18–25") idadeMatch = idade >= 18 && idade <= 25;
      else if (faixaEtaria === "26–35") idadeMatch = idade > 25 && idade <= 35;
      else if (faixaEtaria === "36–45") idadeMatch = idade > 35 && idade <= 45;
      else if (faixaEtaria === "46–60") idadeMatch = idade > 45 && idade <= 60;
      else if (faixaEtaria === "60+") idadeMatch = idade > 60;

      return tipoMatch && sexoMatch && idadeMatch;
    });
    setResultado(filtrados);
  };

  const handleVoltar = () => navigate("/sistema");

  return (
    <div className="filtro-container">
      <h1 className="filtro-title">🔍 Filtros Avançados</h1>

      <div className="filtro-card">
        <h3>🔎 Buscar por Nome ou CPF</h3>
        <input
          value={nomeOuCpf}
          onChange={(e) => setNomeOuCpf(e.target.value)}
          placeholder="Digite o nome ou CPF"
        />
        <button onClick={filtrarPorNomeOuCpf}>Buscar</button>
      </div>

      <div className="filtro-card">
        <h3>🎯 Filtros Combinados</h3>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Tipo Sanguíneo</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(tp => (
            <option key={tp} value={tp}>{tp}</option>
          ))}
        </select>

        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="">Sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="Outro">Outro</option>
        </select>

        <select value={faixaEtaria} onChange={(e) => setFaixaEtaria(e.target.value)}>
          <option value="">Faixa Etária</option>
          <option value="18–25">18–25</option>
          <option value="26–35">26–35</option>
          <option value="36–45">36–45</option>
          <option value="46–60">46–60</option>
          <option value="60+">60+</option>
        </select>

        <button onClick={filtrarCombinado}>Filtrar</button>
      </div>

      <div className="filtro-card">
        <h3>📋 Resultados:</h3>
        {resultado.length === 0 ? (
          <p>Nenhum resultado.</p>
        ) : (
          <ul>
            {resultado.map((d, i) => (
              <li key={i}>
                <strong>{d.pessoa?.nome}</strong> (CPF: {d.pessoa?.cpf}) — 
                Tipo: {d.pessoa?.tipoSanguineo}, 
                Sexo: {d.sexo}, 
                Idade: {d.pessoa?.idade}, 
                Bolsas doadas: {d.qtdBolsasDoadas}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filtro-actions">
        <button className="btn-voltar" onClick={handleVoltar}>Voltar</button>
      </div>
    </div>
  );
}

export default FiltroPage;
