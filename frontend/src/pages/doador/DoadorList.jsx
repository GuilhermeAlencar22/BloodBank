import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoadorList() {
  const [doadores, setDoadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoadores();
  }, []);

  const fetchDoadores = () => {
    fetch("http://localhost:8080/doadores")
      .then((res) => res.json())
      .then((data) => setDoadores(data))
      .catch((err) => console.error("Erro ao listar doadores:", err));
  };

  const handleVoltar = () => {
    navigate("/sistema");
  };

  const handleExcluir = (cpf) => {
    if (window.confirm("Tem certeza que deseja excluir este doador?")) {
      fetch(`http://localhost:8080/doadores/${cpf}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao excluir");
          alert("Doador excluído com sucesso!");
          fetchDoadores();
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao excluir doador.");
        });
    }
  };

  const handleEditar = (cpf) => {
    navigate(`/doadores/editar/${cpf}`);
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2>🩸 Doadores Cadastrados</h2>
      </div>

      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>CPF</th>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Idade</th>
              <th style={thStyle}>Sexo</th>
              <th style={thStyle}>Tipo Sanguíneo</th>
              <th style={thStyle}>Rua</th>
              <th style={thStyle}>CEP</th>
              <th style={thStyle}>Cidade</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {doadores.map((doador) => (
              <tr key={doador.pessoa.cpf}>
                <td style={tdStyle}>{doador.pessoa.cpf}</td>
                <td style={tdStyle}>{doador.pessoa.nome}</td>
                <td style={tdStyle}>{doador.pessoa.idade}</td>
                <td style={tdStyle}>{doador.sexo}</td>
                <td style={tdStyle}>{doador.pessoa.tipoSanguineo}</td>
                <td style={tdStyle}>{doador.pessoa.enderecoRua}</td>
                <td style={tdStyle}>{doador.pessoa.enderecoCep}</td>
                <td style={tdStyle}>{doador.pessoa.enderecoCidade}</td>
                <td style={tdStyle}>{doador.pessoa.enderecoEstado}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEditar(doador.pessoa.cpf)}
                    style={editButtonStyle}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1e8449")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#27ae60")
                    }
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(doador.pessoa.cpf)}
                    style={deleteButtonStyle}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#c0392b")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e74c3c")
                    }
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
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#5a1313")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#7B1E1E")
          }
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

// 🎨 Estilos atualizados

const pageStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontFamily: "'Segoe UI', sans-serif",
};
const headerStyle = { textAlign: "center", marginBottom: "30px" };
const tableWrapper = { overflowX: "auto" };
const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "1000px" };
const thStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#7B1E1E",
  color: "white",
  fontSize: "15px",
};
const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  fontSize: "14px",
  color: "#333",
};
const buttonWrapper = { marginTop: "30px", textAlign: "right" };
const buttonStyle = {
  padding: "10px 24px",
  backgroundColor: "#7B1E1E",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};
const editButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  marginRight: "8px",
  transition: "background-color 0.3s ease",
};
const deleteButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default DoadorList;
