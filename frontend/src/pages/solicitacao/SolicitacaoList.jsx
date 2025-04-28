// src/pages/solicitacao/SolicitacaoList.jsx

import React, { useEffect, useState } from "react";

function SolicitacaoList() {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/solicitacoes")
      .then((res) => res.json())
      .then((data) => setSolicitacoes(data))
      .catch((err) => console.error("Erro ao buscar solicitações", err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Deseja realmente excluir esta solicitação?")) return;

    fetch(`http://localhost:8080/solicitacoes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar");
        setSolicitacoes(solicitacoes.filter((s) => s.idSolicitacao !== id));
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📑 Solicitações Registradas</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Tipo Sanguíneo</th>
            <th style={thStyle}>Qtd Bolsas</th>
            <th style={thStyle}>ID Gerente</th>
            <th style={thStyle}>Data</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((s) => (
            <tr key={s.idSolicitacao}>
              <td style={tdStyle}>{s.idSolicitacao}</td>
              <td style={tdStyle}>{s.tipoSanguineo}</td>
              <td style={tdStyle}>{s.qtdBolsasSolicitadas}</td>
              <td style={tdStyle}>{s.idGerente}</td>
              <td style={tdStyle}>{new Date(s.dataSolicitacao).toLocaleString()}</td>
              <td style={tdStyle}>
                <button onClick={() => handleDelete(s.idSolicitacao)} style={deleteButtonStyle}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#34495e",
  color: "white"
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px"
};

const deleteButtonStyle = {
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer"
};

export default SolicitacaoList;
