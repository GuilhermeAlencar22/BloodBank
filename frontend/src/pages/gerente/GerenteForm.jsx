import React, { useState, useEffect } from "react";

function GerenteForm() {
  const [idFuncionario, setIdFuncionario] = useState("");
  const [nome, setNome] = useState("");
  const [cnpjHospital, setCnpjHospital] = useState("");
  const [hospitais, setHospitais] = useState([]);

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

    // Cadastra o funcionário
    fetch("http://localhost:8080/funcionarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(funcionario),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar funcionário");
        // Cadastra o gerente
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

  return (
    <div>
      <h2>Cadastrar Gerente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Funcionário:</label>
          <input value={idFuncionario} onChange={(e) => setIdFuncionario(e.target.value)} required />
        </div>
        <div>
          <label>Nome:</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Hospital (CNPJ):</label>
          <select value={cnpjHospital} onChange={(e) => setCnpjHospital(e.target.value)} required>
            <option value="">Selecione um hospital</option>
            {hospitais.map((h) => (
              <option key={h.cnpj} value={h.cnpj}>{h.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default GerenteForm;
