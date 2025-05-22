import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function HospitalForm() {
  const { cnpj } = useParams();
  const isEdit = Boolean(cnpj);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cnpj: "",
    nome: "",
    telefone: "",
    endereco: ""
  });

  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8080/hospitais/${cnpj}`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao buscar hospital");
          return res.json();
        })
        .then(data => setForm(data))
        .catch(err => {
          console.error("[HospitalForm] Erro:", err);
          alert("Falha ao carregar hospital.");
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, cnpj]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const url = isEdit
      ? `http://localhost:8080/hospitais/${cnpj}`
      : "http://localhost:8080/hospitais";

    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Erro ao salvar");
        alert(data.message || "Salvo com sucesso!");
        navigate("/sistema");
      })
      .catch(err => {
        console.error("[HospitalForm] Erro ao salvar:", err);
        alert("Erro: " + err.message);
      });
  };

  const handleVoltar = () => navigate("/sistema");

  if (loading) return <div style={{ padding: 20 }}>Carregando hospital...</div>;

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>{isEdit ? "✏️ Editar Hospital" : "🏥 Cadastrar Hospital"}</h2>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formRow}>
          <div style={formGroup}>
            <label>CNPJ:</label>
            <input
              name="cnpj"
              value={form.cnpj}
              onChange={handleChange}
              required
              disabled={isEdit}
              style={inputStyle}
            />
          </div>
          <div style={formGroup}>
            <label>Nome:</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={formRow}>
          <div style={formGroup}>
            <label>Telefone:</label>
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={formGroup}>
            <label>Endereço:</label>
            <input
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              style={inputStyle}
            />
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

// Estilos visuais

const pageStyle = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontFamily: "'Segoe UI', sans-serif"
};

const headerStyle = { textAlign: "center", marginBottom: "30px" };
const formStyle = { padding: "20px" };
const formRow = {
  display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap"
};
const formGroup = {
  flex: "1", display: "flex", flexDirection: "column"
};
const inputStyle = {
  padding: "10px", border: "1px solid #ccc",
  borderRadius: "6px", fontSize: "15px", marginTop: "6px"
};
const buttonWrapper = {
  display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "30px"
};
const submitButton = {
  padding: "12px 30px", backgroundColor: "#7B1E1E",
  color: "white", border: "none", borderRadius: "8px",
  fontWeight: "bold", fontSize: "16px", cursor: "pointer",
  transition: "background-color 0.3s ease"
};
const backButton = {
  padding: "12px 30px", backgroundColor: "#2980b9",
  color: "white", border: "none", borderRadius: "8px",
  fontWeight: "bold", fontSize: "16px", cursor: "pointer",
  transition: "background-color 0.3s ease"
};

export default HospitalForm;
