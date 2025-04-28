import React, { useState } from "react";

function HospitalForm() {
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const hospital = { cnpj, nome, telefone, endereco };

    fetch("http://localhost:8080/hospitais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospital),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar hospital");
        alert("Hospital cadastrado com sucesso!");
        setCnpj("");
        setNome("");
        setTelefone("");
        setEndereco("");
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h2>Cadastrar Hospital</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CNPJ:</label>
          <input value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
        </div>
        <div>
          <label>Nome:</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Telefone:</label>
          <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div>
          <label>Endereço:</label>
          <input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default HospitalForm;
