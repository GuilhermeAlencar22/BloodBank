import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GerenteList() {
  const [gerentes, setGerentes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGerentes();
  }, []);

  const fetchGerentes = () => {
    fetch("http://localhost:8080/gerentes")
      .then((res) => res.json())
      .then((data) => setGerentes(data))
      .catch((err) => console.error("Erro ao listar gerentes:", err));
  };

  const handleDelete = (idFuncionario) => {
    if (window.confirm("Tem certeza que deseja excluir este gerente?")) {
      fetch(`http://localhost:8080/gerentes/${idFuncionario}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao excluir gerente");
          alert("Gerente excluído com sucesso!");
          fetchGerentes();
        })
        .catch((err) => alert(err.message));
    }
  };

  const handleVoltar = () => {
    navigate('/sistema');
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>🧑‍💼 Gerentes Cadastrados</h2>
      </div>

      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
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
                  <button
                    onClick={() => handleDelete(g.idFuncionario)}
                    style={deleteButtonStyle}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = "#c0392b"}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = "#e74c3c"}
                  >
                    Excluir
                  </button>
                </td>
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

// 🎨 Estilos organizados:

const pageStyle = {
  maxWidth: "1000px",
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
  minWidth: "700px"
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#34495e",
  color: "white",
  fontSize: "15px"
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  fontSize: "14px",
  color: "#333"
};

const deleteButtonStyle = {
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
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

export default GerenteList;
