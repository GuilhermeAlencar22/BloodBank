import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HospitalList() {
  const [hospitais, setHospitais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitais();
  }, []);

  const fetchHospitais = () => {
    fetch("http://localhost:8080/hospitais")
      .then((res) => res.json())
      .then((data) => setHospitais(data))
      .catch((err) => console.error("Erro ao listar hospitais:", err));
  };

  const handleDelete = (cnpj) => {
    if (window.confirm("Tem certeza que deseja excluir este hospital?")) {
      fetch(`http://localhost:8080/hospitais/${cnpj}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao excluir");
          alert("Hospital excluído com sucesso!");
          fetchHospitais(); // Atualiza lista após excluir
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
        <h2>🏥 Hospitais Cadastrados</h2>
      </div>

      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
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
                  <button
                    onClick={() => handleDelete(h.cnpj)}
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
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#21618c"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#2980b9"}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

// 🎨 Estilos:

const pageStyle = {
  maxWidth: "1200px",
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
  minWidth: "800px"
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#2980b9",
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
  backgroundColor: "#2980b9",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
};

export default HospitalList;
