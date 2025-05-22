import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function GerenteForm() {
  const { id } = useParams(); // usado para edição
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [idFuncionario, setIdFuncionario] = useState("");
  const [nome, setNome] = useState("");
  const [cnpjHospital, setCnpjHospital] = useState("");
  const [hospitais, setHospitais] = useState([]);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    fetch("http://localhost:8080/hospitais")
      .then((res) => res.json())
      .then((data) => setHospitais(data))
      .catch((err) => console.error("Erro ao buscar hospitais", err));
  }, []);

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8080/gerentes/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao buscar gerente");
          return res.json();
        })
        .then(data => {
          setIdFuncionario(data.idFuncionario);
          setCnpjHospital(data.cnpjHospital);
        })
        .catch(err => {
          console.error(err);
          alert("Erro ao carregar gerente.");
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const gerente = {
      idFuncionario,
      cnpjHospital,
    };

    const url = isEdit
      ? `http://localhost:8080/gerentes/${idFuncionario}`
      : "http://localhost:8080/gerentes";
    const method = isEdit ? "PUT" : "POST";

    const salvarGerente = () => {
      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gerente),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao salvar gerente");
          return res.json();
        })
        .then((data) => {
          alert(data.message || "Gerente salvo com sucesso!");
          navigate("/gerentes");
        })
        .catch((err) => alert(err.message));
    };

    if (isEdit) {
      salvarGerente();
    } else {
      // Criação: primeiro cria funcionário
      const funcionario = { idFuncionario, nome };
      fetch("http://localhost:8080/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funcionario),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao cadastrar funcionário");
          salvarGerente();
        })
        .catch((err) => alert(err.message));
    }
  };

  const handleVoltar = () => {
    navigate("/sistema");
  };

  if (loading) return <div style={{ padding: 20 }}>Carregando dados do gerente...</div>;

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>{isEdit ? "✏️ Editar Gerente" : "🧑‍💼 Cadastrar Gerente"}</h2>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formRow}>
          <div style={formGroup}>
            <label>ID do Funcionário:</label>
            <input
              value={idFuncionario}
              onChange={(e) => setIdFuncionario(e.target.value)}
              required
              disabled={isEdit}
              style={inputStyle}
            />
          </div>

          {!isEdit && (
            <div style={formGroup}>
              <label>Nome:</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          )}
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
            {isEdit ? "Salvar Alterações" : "Cadastrar"}
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

const formStyle = { padding: "20px" };

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
