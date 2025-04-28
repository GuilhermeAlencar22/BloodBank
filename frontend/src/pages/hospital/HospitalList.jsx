// src/pages/hospital/HospitalList.jsx

import React, { useEffect, useState } from "react";

function HospitalList() {
  const [hospitais, setHospitais] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/hospitais")
      .then((res) => res.json())
      .then((data) => setHospitais(data))
      .catch((err) => console.error("Erro ao listar hospitais:", err));
  }, []);

  const handleDelete = (cnpj) => {
    if (!window.confirm("Tem certeza que deseja excluir este hospital?")) return;

    fetch(`http://localhost:8080/hospitais/${cnpj}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar");
        setHospitais(hospitais.filter((h) => h.cnpj !== cnpj));
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏥 Hospitais Cadastrados</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>CNPJ</th>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Telefone</th>
            <th style={thStyle}>Endereço</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {hospitais.map((h) => (
            <tr key={h.cnpj}>
              <td style={tdStyle}>{h.cnpj}</td>
              <td style={tdStyle}>{h.nome}</td>
              <td style={tdStyle}>{h.telefone}</td>
              <td style={tdStyle}>{h.endereco}</td>
              <td style={tdStyle}>
                <button onClick={() => handleDelete(h.cnpj)} style={deleteButtonStyle}>
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
  backgroundColor: "#2980b9",
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

export default HospitalList;
