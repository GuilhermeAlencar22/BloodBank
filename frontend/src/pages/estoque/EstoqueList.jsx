import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EstoqueList() {
  const [estoque, setEstoque] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/estoque")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao buscar o estoque");
        return res.json();
      })
      .then(setEstoque)
      .catch((error) => console.error("Erro ao listar estoque:", error));
  }, []);

  const handleVoltar = () => {
    navigate('/sistema');
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>📦 Estoque Atual de Sangue</h2>
      </div>

      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Tipo Sanguíneo</th>
              <th style={thStyle}>Quantidade de Bolsas</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((item) => (
              <tr key={item.idEstoque}>
                <td style={tdStyle}>{item.tipoSanguineo}</td>
                <td style={tdStyle}>{item.qtdBolsas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={buttonWrapper}>
        <button 
          onClick={handleVoltar}
          style={backButtonStyle}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#2c3e50"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#34495e"}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

// 🎨 Estilos:

const pageStyle = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontFamily: "'Segoe UI', sans-serif"
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px"
};

const tableWrapper = {
  overflowX: "auto"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px"
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#c0392b",
  color: "white",
  fontWeight: "bold",
  borderBottom: "2px solid #ddd",
  fontSize: "15px"
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
  color: "#333"
};

const buttonWrapper = {
  marginTop: "30px",
  textAlign: "right"
};

const backButtonStyle = {
  padding: "10px 24px",
  backgroundColor: "#34495e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
};

export default EstoqueList;
