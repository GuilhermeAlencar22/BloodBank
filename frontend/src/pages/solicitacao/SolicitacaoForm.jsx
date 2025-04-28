import React, { useState, useEffect } from "react";

function SolicitacaoForm() {
  const [idSolicitacao, setIdSolicitacao] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [qtdBolsasSolicitadas, setQtdBolsasSolicitadas] = useState(1);
  const [idGerente, setIdGerente] = useState("");
  const [gerentes, setGerentes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/gerentes")
      .then(res => res.json())
      .then(data => setGerentes(data))
      .catch(err => console.error("Erro ao carregar gerentes", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const solicitacao = {
      idSolicitacao,
      tipoSanguineo,
      qtdBolsasSolicitadas,
      idGerente,
    };

    fetch("http://localhost:8080/solicitacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solicitacao),
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao criar solicitação");
        alert("Solicitação registrada com sucesso!");
        setIdSolicitacao("");
        setTipoSanguineo("");
        setQtdBolsasSolicitadas(1);
        setIdGerente("");
      })
      .catch(err => alert(err.message));
  };

  return (
    <div>
      <h2>Nova Solicitação</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID da Solicitação:</label>
          <input value={idSolicitacao} onChange={(e) => setIdSolicitacao(e.target.value)} required />
        </div>
        <div>
          <label>Tipo Sanguíneo:</label>
          <input value={tipoSanguineo} onChange={(e) => setTipoSanguineo(e.target.value)} required />
        </div>
        <div>
          <label>Quantidade de Bolsas:</label>
          <input type="number" min="1" value={qtdBolsasSolicitadas} onChange={(e) => setQtdBolsasSolicitadas(parseInt(e.target.value))} required />
        </div>
        <div>
          <label>ID do Gerente:</label>
          <select value={idGerente} onChange={(e) => setIdGerente(e.target.value)} required>
            <option value="">Selecione</option>
            {gerentes.map(g => (
              <option key={g.idFuncionario} value={g.idFuncionario}>{g.idFuncionario}</option>
            ))}
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default SolicitacaoForm;
