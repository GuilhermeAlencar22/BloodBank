import React, { useEffect, useState } from "react";

function DoadorList() {
  const [doadores, setDoadores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/doadores")
      .then((res) => res.json())
      .then((data) => setDoadores(data))
      .catch((err) => console.error("Erro ao listar doadores:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🩸 Doadores Cadastrados</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>CPF</th>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Idade</th>
            <th style={thStyle}>Sexo</th>
            <th style={thStyle}>Tipo Sanguíneo</th>
            <th style={thStyle}>Rua</th>
            <th style={thStyle}>CEP</th>
            <th style={thStyle}>Cidade</th>
            <th style={thStyle}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {doadores.map((doador) => (
            <tr key={doador.pessoa.cpf}>
              <td style={tdStyle}>{doador.pessoa.cpf}</td>
              <td style={tdStyle}>{doador.pessoa.nome}</td>
              <td style={tdStyle}>{doador.pessoa.idade}</td>
              <td style={tdStyle}>{doador.sexo}</td>
              <td style={tdStyle}>{doador.pessoa.tipoSanguineo}</td>
              <td style={tdStyle}>{doador.pessoa.enderecoRua}</td>
              <td style={tdStyle}>{doador.pessoa.enderecoCep}</td>
              <td style={tdStyle}>{doador.pessoa.enderecoCidade}</td>
              <td style={tdStyle}>{doador.pessoa.enderecoEstado}</td>
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
  backgroundColor: "#c0392b",
  color: "white"
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px"
};

export default DoadorList;
