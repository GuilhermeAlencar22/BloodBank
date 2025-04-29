import React, { useState } from "react";
import "./DoadorForm.css";

function DoadorForm() {
  const [form, setForm] = useState({
    cpf: "",
    nome: "",
    idade: "",
    sexo: "",
    tipoSanguineo: "",
    enderecoRua: "",
    enderecoCep: "",
    enderecoCidade: "",
    enderecoEstado: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const doador = {
      pessoa: {
        cpf: form.cpf,
        nome: form.nome,
        idade: parseInt(form.idade, 10),
        sexo: form.sexo,
        tipoSanguineo: form.tipoSanguineo,
        enderecoRua: form.enderecoRua,
        enderecoCep: form.enderecoCep,
        enderecoCidade: form.enderecoCidade,
        enderecoEstado: form.enderecoEstado
      },
      sexo: form.sexo
    };

    fetch("http://localhost:8080/doadores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doador)
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Erro ao cadastrar doador");
        alert(data.message || "Doador cadastrado com sucesso!");
        setForm({
          cpf: "",
          nome: "",
          idade: "",
          sexo: "",
          tipoSanguineo: "",
          enderecoRua: "",
          enderecoCep: "",
          enderecoCidade: "",
          enderecoEstado: ""
        });
      })
      .catch((err) => {
        alert("Erro ao cadastrar doador: " + err.message);
      });
  };

  return (
    <div className="register-section">
      <div className="register-header">
        <h2>Registro de Doador</h2>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nome:</label>
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>CPF:</label>
            <input name="cpf" value={form.cpf} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Idade:</label>
            <input name="idade" value={form.idade} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Sexo (M/F):</label>
            <input name="sexo" value={form.sexo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo Sanguíneo:</label>
            <input name="tipoSanguineo" value={form.tipoSanguineo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>CEP:</label>
            <input name="enderecoCep" value={form.enderecoCep} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Rua:</label>
            <input name="enderecoRua" value={form.enderecoRua} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Cidade:</label>
            <input name="enderecoCidade" value={form.enderecoCidade} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Estado:</label>
            <input name="enderecoEstado" value={form.enderecoEstado} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default DoadorForm;