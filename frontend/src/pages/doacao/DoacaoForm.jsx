import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoacaoForm() {
  const [cpf, setCpf] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `http://localhost:8080/doacao?cpf=${cpf}&quantidade=${quantidade}&tipoSanguineo=${tipoSanguineo}`;

    fetch(url, { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao registrar doação");
        return res.json();
      })
      .then((data) => {
        alert(data.message || "Doação registrada com sucesso!");
        setCpf("");
        setQuantidade("");
        setTipoSanguineo("");
      })
      .catch((err) => {
        alert("Erro ao registrar doação: " + err.message);
      });
  };

  const handleVoltar = () => {
    navigate('/sistema');
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>✅ Registrar Doação de Sangue</h2>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formRow}>
          <div style={formGroup}>
            <label>CPF do Doador:</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              placeholder="Digite o CPF"
              style={inputStyle}
            />
          </div>

          <div style={formGroup}>
            <label>Quantidade de Bolsas:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
              min="1"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={formRow}>
          <div style={formGroup}>
            <label>Tipo Sanguíneo:</label>
            <input
              type="text"
              value={tipoSanguineo}
              onChange={(e) => setTipoSanguineo(e.target.value)}
              required
              placeholder="Ex: A+, O-, AB+..."
              style={inputStyle}
            />
          </div>
        </div>

        <div style={buttonWrapper}>
          <button type="submit" style={submitButton}>
            Registrar
          </button>
          <button
            type="button"
            onClick={handleVoltar}
            style={backButton}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#2c3e50"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "#34495e"}
          >
            Voltar
          </button>
        </div>
      </form>
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

const formStyle = {
  padding: "20px"
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
  backgroundColor: "#34495e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
};

export default DoacaoForm;
