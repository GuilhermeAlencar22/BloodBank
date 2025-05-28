import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./DoadorForm.css";

export default function DoadorForm() {
  const { cpf } = useParams();
  const isEdit = Boolean(cpf);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || null;

  const [form, setForm] = useState({
    cpf: "",
    nome: "",
    idade: "",
    sexo: "",
    tipoSanguineo: "",
    enderecoRua: "",
    enderecoCep: "",
    enderecoCidade: "",
    enderecoEstado: "",
  });

  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8080/doadores/${cpf}`)
        .then(res => {
          if (!res.ok) throw new Error("GET falhou");
          return res.json();
        })
        .then(data => {
          setForm({
            cpf: data.pessoa.cpf || "",
            nome: data.pessoa.nome || "",
            idade: data.pessoa.idade?.toString() || "",
            sexo: data.sexo || "",
            tipoSanguineo: data.pessoa.tipoSanguineo || "",
            enderecoRua: data.pessoa.enderecoRua || "",
            enderecoCep: data.pessoa.enderecoCep || "",
            enderecoCidade: data.pessoa.enderecoCidade || "",
            enderecoEstado: data.pessoa.enderecoEstado || "",
          });
        })
        .catch(err => {
          console.error("[DoadorForm] Erro ao buscar:", err);
          alert("Falha ao carregar dados do doador.");
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, cpf]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const doadorPayload = {
      pessoa: {
        cpf: form.cpf,
        nome: form.nome,
        idade: parseInt(form.idade, 10),
        tipoSanguineo: form.tipoSanguineo,
        enderecoRua: form.enderecoRua,
        enderecoCidade: form.enderecoCidade,
        enderecoEstado: form.enderecoEstado,
        enderecoCep: form.enderecoCep
      },
      sexo: form.sexo
    };

    const url = "http://localhost:8080/doadores";
    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doadorPayload),
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Erro ao salvar");

        alert(
          data.message ||
            (isEdit
              ? "Doador atualizado com sucesso!"
              : "Doador cadastrado com sucesso!")
        );

        if (!isEdit) {
          setForm({
            cpf: "",
            nome: "",
            idade: "",
            sexo: "",
            tipoSanguineo: "",
            enderecoRua: "",
            enderecoCep: "",
            enderecoCidade: "",
            enderecoEstado: "",
          });
        }

        if (from === "menu") {
          navigate(location.pathname, { state: { from } }); // permanece na tela
        } else {
          navigate("/doadores"); // volta para listagem
        }
      })
      .catch(err => {
        console.error("[DoadorForm] Erro ao salvar:", err);
        alert("Erro ao salvar: " + err.message);
      });
  };

  const handleVoltar = () => {
    if (from === "home") {
      navigate("/");
    } else if (from === "sistema") {
      navigate("/sistema");
    } else if (from === "menu") {
      navigate("/"); // ou outro destino que desejar
    } else {
      navigate("/doadores");
    }
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Carregando dados do doador...</div>;
  }

  return (
    <div className="register-section">
      <div className="register-header">
        <h2>{isEdit ? "✏️ Editar Doador" : "Novo Doador"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <label>CPF:</label>
            <input
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              required
              disabled={isEdit}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nome:</label>
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Idade:</label>
            <input
              type="number"
              name="idade"
              value={form.idade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Sexo:</label>
            <input name="sexo" value={form.sexo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo Sanguíneo:</label>
            <input
              name="tipoSanguineo"
              value={form.tipoSanguineo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>CEP:</label>
            <input
              name="enderecoCep"
              value={form.enderecoCep}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Rua:</label>
            <input
              name="enderecoRua"
              value={form.enderecoRua}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cidade:</label>
            <input
              name="enderecoCidade"
              value={form.enderecoCidade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Estado:</label>
            <input
              name="enderecoEstado"
              value={form.enderecoEstado}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">
            {isEdit ? "Salvar Alterações" : "Cadastrar"}
          </button>

          {(from === "home" || from === "sistema") && (
            <button
              type="button"
              onClick={handleVoltar}
              className="back-button"
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "#21618c")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "#2980b9")}
            >
              Voltar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
