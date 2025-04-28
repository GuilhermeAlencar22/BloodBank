// src/pages/estoque/EstoqueForm.js

import React, { useState } from "react";

function EstoqueForm() {
  const [form, setForm] = useState({
    tipoSanguineo: "",
    qtdBolsas: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Monta o payload conforme o que o back-end espera:
    const payload = {
      tipoSanguineo: form.tipoSanguineo,
      qtdBolsas: parseInt(form.qtdBolsas, 10)
    };

    try {
      const response = await fetch("http://localhost:8080/estoque", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao adicionar ao estoque");
      }
      alert(data.message || "Estoque atualizado com sucesso!");
      // Limpar formulário
      setForm({ tipoSanguineo: "", qtdBolsas: "" });
    } catch (err) {
      alert("Erro ao adicionar ao estoque: " + err.message);
    }
  };

  return (
    <div>
      <h2>Adicionar/Atualizar Estoque</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo Sanguíneo:</label>
          <input
            type="text"
            name="tipoSanguineo"
            value={form.tipoSanguineo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantidade de Bolsas:</label>
          <input
            type="number"
            name="qtdBolsas"
            value={form.qtdBolsas}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EstoqueForm;
