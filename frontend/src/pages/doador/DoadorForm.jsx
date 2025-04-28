import React, { useState } from "react";

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
    <div>
      <h2>Novo Doador</h2>
      <form onSubmit={handleSubmit}>
        {[
          ["cpf", "CPF"],
          ["nome", "Nome"],
          ["idade", "Idade"],
          ["sexo", "Sexo (M/F)"],
          ["tipoSanguineo", "Tipo Sanguíneo"],
          ["enderecoRua", "Rua"],
          ["enderecoCep", "CEP"],
          ["enderecoCidade", "Cidade"],
          ["enderecoEstado", "Estado"]
        ].map(([fieldName, label]) => (
          <div key={fieldName}>
            <label>{label}:</label>
            <input
              name={fieldName}
              value={form[fieldName]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default DoadorForm;
