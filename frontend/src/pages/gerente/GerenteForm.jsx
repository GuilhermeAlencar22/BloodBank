import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GerenteForm() {
  const [idFuncionario, setIdFuncionario] = useState("");
  const [nome, setNome] = useState("");
  const [cnpjHospital, setCnpjHospital] = useState("");
  const [hospitais, setHospitais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/hospitais")
      .then((res) => res.json())
      .then((data) => setHospitais(data))
      .catch((err) => console.error("Erro ao buscar hospitais", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const funcionario = {
      idFuncionario,
      nome,
    };

    const gerente = {
      idFuncionario,
      cnpjHospital,
    };

    fetch("http://localhost:8080/funcionarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(funcionario),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar funcionário");
        return fetch("http://localhost:8080/gerentes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gerente),
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar gerente");
        alert("Gerente cadastrado com sucesso!");
        setIdFuncionario("");
        setNome("");
        setCnpjHospital("");
      })
      .catch((err) => alert(err.message));
  };

  const handleVoltar = () => {
    navigate('/sistema');
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>🧑‍💼 Cadastrar Gerente</h2>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formRow}>
          <div style={formGroup}>
            <label>ID do Funcionário:</label>
            <input
              value={idFuncionario}
              onChange={(e) => setIdFuncionario(e.target.value)}
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
          <div style={{ ...formGroup, flex: "1" }}>
            <label>Hospital (CNPJ):</label>
            <select
              value={cnpjHospital}
              onChange={(e) => setCnpjHospital(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecione um hospital</option>
              {hospitais.map((h) => (
                <option key={h.cnpj} value={h.cnpj}>
                  {h.nome}
                </option>
              ))}
            </select>
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
  backgroundColor: "#34495e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
};

export default GerenteForm;
