import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SolicitacaoForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [idSolicitacao, setIdSolicitacao] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [qtdBolsasSolicitadas, setQtdBolsasSolicitadas] = useState(1);
  const [idGerente, setIdGerente] = useState("");
  const [gerentes, setGerentes] = useState([]);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    fetch("http://localhost:8080/gerentes")
      .then(res => res.json())
      .then(data => setGerentes(data))
      .catch(err => console.error("Erro ao carregar gerentes", err));
  }, []);

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8080/solicitacoes/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao buscar solicitação");
          return res.json();
        })
        .then(data => {
          setIdSolicitacao(data.idSolicitacao);
          setTipoSanguineo(data.tipoSanguineo);
          setQtdBolsasSolicitadas(data.qtdBolsasSolicitadas);
          setIdGerente(data.idGerente);
        })
        .catch(err => {
          console.error(err);
          alert("Erro ao carregar solicitação.");
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const solicitacao = {
      idSolicitacao,
      tipoSanguineo,
      qtdBolsasSolicitadas,
      idGerente,
    };

    const url = isEdit
      ? `http://localhost:8080/solicitacoes/${idSolicitacao}`
      : "http://localhost:8080/solicitacoes";

    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solicitacao),
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar solicitação");
        return res.json();
      })
      .then(data => {
        alert(data.message || "Solicitação salva com sucesso!");
        navigate("/solicitacoes");
      })
      .catch(err => alert(err.message));
  };

  const handleVoltar = () => {
    navigate('/sistema');
  };

  if (loading) return <div style={{ padding: 20 }}>Carregando solicitação...</div>;

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>{isEdit ? "✏️ Editar Solicitação" : "📑 Nova Solicitação de Bolsas"}</h2>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formRow}>
          <div style={formGroup}>
            <label>ID da Solicitação:</label>
            <input
              value={idSolicitacao}
              onChange={(e) => setIdSolicitacao(e.target.value)}
              required
              disabled={isEdit}
              style={inputStyle}
            />
          </div>

          <div style={formGroup}>
            <label>Tipo Sanguíneo:</label>
            <input
              value={tipoSanguineo}
              onChange={(e) => setTipoSanguineo(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={formRow}>
          <div style={formGroup}>
            <label>Quantidade de Bolsas:</label>
            <input
              type="number"
              min="1"
              value={qtdBolsasSolicitadas}
              onChange={(e) => setQtdBolsasSolicitadas(parseInt(e.target.value))}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroup}>
            <label>ID do Gerente:</label>
            <select
              value={idGerente}
              onChange={(e) => setIdGerente(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecione</option>
              {gerentes.map(g => (
                <option key={g.idFuncionario} value={g.idFuncionario}>
                  {g.idFuncionario}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={buttonWrapper}>
          <button type="submit" style={submitButton}>
            {isEdit ? "Salvar Alterações" : "Registrar"}
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

export default SolicitacaoForm;
