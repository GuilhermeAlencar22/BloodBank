// src/pages/gerente/GerenteList.jsx

import React, { useEffect, useState } from "react";

function GerenteList() {
  const [gerentes, setGerentes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/gerentes")
      .then((res) => res.json())
      .then((data) => setGerentes(data))
      .catch((err) => console.error("Erro ao listar gerentes:", err));
  }, []);

  const handleDelete = (idFuncionario) => {
    if (!window.confirm("Tem certeza que deseja excluir este gerente?")) return;

    fetch(`http://localhost:8080/gerentes/${idFuncionario}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar gerente");
        setGerentes(gerentes.filter((g) => g.idFuncionario !== idFuncionario));
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧑‍💼 Gerentes Cadastrados</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>ID Funcionário</th>
            <th style={thStyle}>CNPJ do Hospital</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {gerentes.map((g) => (
            <tr key={g.idFuncionario}>
              <td style={tdStyle}>{g.idFuncionario}</td>
              <td style={tdStyle}>{g.cnpjHospital}</td>
              <td style={tdStyle}>
                <button onClick={() => handleDelete(g.idFuncionario)} style={deleteButtonStyle}>
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
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "4px"
};

export default GerenteList;
