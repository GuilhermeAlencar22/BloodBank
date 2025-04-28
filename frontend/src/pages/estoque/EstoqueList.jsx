import React, { useEffect, useState } from "react";

function EstoqueList() {
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/estoque")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao buscar o estoque");
        return res.json();
      })
      .then(setEstoque)
      .catch((error) => console.error("Erro ao listar estoque:", error));
  }, []);

  return (
    <div>
      <h2>📦 Estoque Atual de Sangue</h2>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f9f9f9" }}>
            <th style={estiloCabecalho}>Tipo Sanguíneo</th>
            <th style={estiloCabecalho}>Quantidade de Bolsas</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((item) => (
            <tr key={item.idEstoque}>
              <td style={estiloCelula}>{item.tipoSanguineo}</td>
              <td style={estiloCelula}>{item.qtdBolsas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const estiloCabecalho = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  fontWeight: "bold",
  color: "#c0392b"
};

const estiloCelula = {
  padding: "10px",
  borderBottom: "1px solid #eee"
};

export default EstoqueList;
