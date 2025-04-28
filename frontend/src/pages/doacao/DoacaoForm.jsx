import React, { useState } from "react";

function DoacaoForm() {
  const [cpf, setCpf] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `http://localhost:8080/doacao?cpf=${cpf}&quantidade=${quantidade}&tipoSanguineo=${tipoSanguineo}`;

    fetch(url, {
      method: "POST"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao registrar doação");
        return res.json();
      })
      .then((data) => {
        alert(data.message || "Doação registrada com sucesso!");
        setCpf("");
        setQuantidade("");
        setTipoSanguineo("");
      })
      .catch((err) => {
        alert("Erro ao registrar doação: " + err.message);
      });
  };

  return (
    <div>
      <h2>Registrar Doação de Sangue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CPF do Doador:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            placeholder="Digite o CPF"
          />
        </div>
        <div>
          <label>Quantidade de Bolsas:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            min="1"
          />
        </div>
        <div>
          <label>Tipo Sanguíneo:</label>
          <input
            type="text"
            value={tipoSanguineo}
            onChange={(e) => setTipoSanguineo(e.target.value)}
            required
            placeholder="Ex: A+, O-, AB+..."
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default DoacaoForm;