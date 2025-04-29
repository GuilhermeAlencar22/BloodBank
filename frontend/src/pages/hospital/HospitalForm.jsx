import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HospitalForm() {
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const hospital = { cnpj, nome, telefone, endereco };

    fetch("http://localhost:8080/hospitais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospital),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar hospital");
        alert("Hospital cadastrado com sucesso!");
        setCnpj("");
        setNome("");
        setTelefone("");
        setEndereco("");
      })
      .catch((err) => alert(err));
  };

  const handleVoltar = () => {
    navigate('/sistema');
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>🏥 Cadastrar Hospital</h2>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formRow}>
          <div style={formGroup}>
            <label>CNPJ:</label>
            <input
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroup}>
            <label>Nome:</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={formRow}>
          <div style={formGroup}>
            <label>Telefone:</label>
            <input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={formGroup}>
            <label>Endereço:</label>
            <input
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={buttonWrapper}>
          <button type="submit" style={submitButton}>
            Salvar
          </button>
          <button 
            type="button"
            onClick={handleVoltar}
            style={backButton}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#21618c"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "#2980b9"}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

// 🎨 Estilos organizados:

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

const formStyle = {
  padding: "20px",
};

const formRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
  flexWrap: "wrap"
};

const formGroup = {
  flex: "1",
  display: "flex",
  flexDirection: "column"
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
  marginTop: "6px"
};

const buttonWrapper = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "30px"
};

const submitButton = {
  padding: "12px 30px",
  backgroundColor: "#7B1E1E",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
};

const backButton = {
  padding: "12px 30px",
  backgroundColor: "#2980b9",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
};

export default HospitalForm;
