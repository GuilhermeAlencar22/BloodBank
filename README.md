# BloodBank 🩸💉
---

### 🎯 Mini Mundo – Sistema de Gerenciamento de Banco de Sangue

O **Sistema de Gerenciamento de Banco de Sangue** tem como finalidade gerenciar de forma segura, eficiente e centralizada todo o processo de doação, armazenamento e distribuição de sangue. Ele é voltado para instituições de saúde que precisam de um controle rigoroso sobre os estoques de bolsas de sangue e a logística envolvida nas solicitações hospitalares.

---

### 📌 Objetivo do Sistema

O sistema visa:
- Registrar doações de sangue, vinculando cada bolsa a um doador.
- Controlar o estoque de sangue por tipo sanguíneo e quantidade disponível.
- Atender às solicitações de bolsas feitas por hospitais.
- Registrar pacientes que receberão o sangue.
- Gerenciar a atuação de funcionários no processo, distinguindo suas funções como administradores e atendentes.
- Controlar os dados dos hospitais que requisitam bolsas e dos pacientes que as recebem.

---

### 🧩 Principais Entidades e Relacionamentos

- **Doador**: Pessoa cadastrada no sistema com dados pessoais e endereço, que pode realizar várias doações. Pode ser indicada por um funcionário.
- **Funcionário**: Pessoa responsável por funções administrativas ou de atendimento. Está dividido em **Administrador** (controle geral) e **Atendente** (responsável por registrar solicitações).
- **Bolsa de Sangue**: Unidade armazenada no sistema, vinculada a um doador e registrada no estoque conforme o tipo sanguíneo e quantidade disponível.
- **Estoque**: Registra a quantidade e tipo de sangue disponível, mantendo o controle sobre as bolsas armazenadas.
- **Solicitação**: Pedido feito por um atendente para determinado tipo sanguíneo, especificando a quantidade de bolsas desejadas.
- **Hospital**: Instituição que realiza a requisição de sangue e está associada aos pacientes que receberão as bolsas.
- **Paciente**: Pessoa que recebe uma ou mais bolsas de sangue. Está associada ao hospital e à solicitação realizada.

---

### 🔄 Fluxo de Operações

1. Um **funcionário** (administrador ou atendente) cadastra **doadores** no sistema.
2. O **doador** realiza a doação, e uma **bolsa de sangue** é criada, vinculada ao seu CPF.
3. A **bolsa** é registrada no **estoque**, de acordo com o tipo sanguíneo e quantidade disponível.
4. Um **hospital** faz uma **requisição**, e um **atendente** formaliza a **solicitação** no sistema.
5. A bolsa é destinada ao **paciente**, vinculado ao hospital e à solicitação.

---

### 🛡️ Benefícios do Sistema

- Otimiza o tempo de resposta às solicitações hospitalares.
- Melhora a gestão do estoque e reduz desperdícios.
- Garante rastreabilidade das bolsas de sangue desde a doação até o uso final.
- Controla o desempenho dos funcionários responsáveis pelos registros.
- Facilita o atendimento humanizado aos pacientes ao manter um banco de dados completo.

---
# Diagrama Lógico
![image](https://github.com/user-attachments/assets/2147e24a-4eec-4260-bcf0-26d1412b859d)

---
# Diagrama Conceitual
![image](https://github.com/user-attachments/assets/857b7f38-90d5-434a-8ba6-dfb3e0f8458d)


