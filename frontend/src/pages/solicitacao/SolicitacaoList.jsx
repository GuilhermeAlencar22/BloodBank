import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SolicitacaoList() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const fetchSolicitacoes = () => {
    fetch("http://localhost:8080/solicitacoes")
      .then((res) => res.json())
      .then((data) => setSolicitacoes(data))
      .catch((err) => console.error("Erro ao buscar solicitações", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir esta solicitação?")) {
      fetch(`http://localhost:8080/solicitacoes/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao deletar solicitação");
          alert("Solicitação excluída com sucesso!");
          fetchSolicitacoes();
        })
        .catch((err) => alert(err.message));
    }
  };

  const handleEdit = (id) => {
    navigate(`/solicitacoes/editar/${id}`);
  };

  const handleVoltar = () => {
    navigate('/sistema');
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>📑 Solicitações Registradas</h2>
      </div>

      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Tipo Sanguíneo</th>
              <th style={thStyle}>Qtd Bolsas</th>
              <th style={thStyle}>ID Gerente</th>
              <th style={thStyle}>Data</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((s) => (
              <tr key={s.idSolicitacao}>
                <td style={tdStyle}>{s.idSolicitacao}</td>
                <td style={tdStyle}>{s.tipoSanguineo}</td>
                <td style={tdStyle}>{s.qtdBolsasSolicitadas}</td>
                <td style={tdStyle}>{s.idGerente}</td>
                <td style={tdStyle}>
                  {new Date(s.dataSolicitacao).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(s.idSolicitacao)}
                    style={editButtonStyle}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = "#1e8449"}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = "#27ae60"}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(s.idSolicitacao)}
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

const pageStyle = {
  maxWidth: "1100px",
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
  minWidth: "900px"
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

const editButtonStyle = {
  backgroundColor: "#27ae60",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  marginRight: "6px",
  transition: "background-color 0.3s ease"
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

export default SolicitacaoList;
