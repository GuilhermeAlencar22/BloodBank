# 🩸 BloodBank — Sistema de Gerenciamento de Banco de Sangue

---

## 🎯 Sobre o Sistema

O **BloodBank** é uma plataforma completa para gerenciamento de bancos de sangue, desenvolvida para controlar de forma **eficiente, segura e organizada** todas as etapas do processo: doação, armazenamento e atendimento às solicitações hospitalares.

Ideal para instituições de saúde que buscam **rastreabilidade total** das bolsas doadas, **controle de estoque em tempo real** e **agilidade na gestão**.

---

## 📌 Funcionalidades Principais

- **Cadastrar doadores** com dados pessoais e clínicos.
- **Registrar doações de sangue** vinculadas a cada doador.
- **Gerenciar o estoque** de sangue por tipo sanguíneo.
- **Atender solicitações** feitas por hospitais parceiros.
- **Cadastrar pacientes** receptores de bolsas.
- **Gerenciar funcionários**, diferenciando administradores e atendentes.
- **Acompanhar hospitais** e os pacientes atendidos.

---

## 🧩 Entidades e Relacionamentos

### 🧍‍♂️ Doador
- Pessoa cadastrada no sistema.
- Associado a doações e ao histórico de bolsas geradas.

### 🧑‍⚕️ Funcionário
- Usuário responsável por operar o sistema.
  - **Administrador**: acesso completo.
  - **Atendente**: realiza registros e solicitações.

### 🩸 Bolsa de Sangue
- Criada a cada doação.
- Vinculada ao CPF do doador e ao tipo sanguíneo.

### 🏥 Hospital
- Instituição cadastrada para receber sangue.
- Associada a pacientes e solicitações.

### 👩‍⚕️ Paciente
- Receptor de uma bolsa de sangue.
- Vinculado a um hospital e a uma bolsa utilizada.

### 📦 Estoque
- Quantidade disponível de bolsas por tipo sanguíneo.
- Atualizado automaticamente.

### 📜 Solicitação
- Pedido de bolsas por parte do hospital.
- Registrado por um atendente.

---

## 🔄 Fluxo de Operações

1. **Cadastro de Doador**  
   ➔ Funcionário registra um novo doador.

2. **Registro de Doação**  
   ➔ Cada doação gera uma ou mais bolsas vinculadas ao doador.

3. **Atualização do Estoque**  
   ➔ Bolsas doadas são adicionadas ao estoque automaticamente.

4. **Solicitação de Bolsas**  
   ➔ Hospital solicita bolsas de sangue via sistema.

5. **Distribuição ao Paciente**  
   ➔ Bolsa é associada a um paciente e o estoque é reduzido.

6. **Gestão de Funcionários**  
   ➔ Administradores gerenciam o sistema, atendentes executam ações operacionais.

---

## 🛡️ Benefícios do Sistema

- **Rastreabilidade completa** do ciclo da bolsa de sangue.
- **Eficiência no atendimento hospitalar**.
- **Gestão automatizada de estoque**, evitando perdas.
- **Monitoramento da frequência de doações**.
- **Segurança e confiabilidade** em todas as etapas.
- **Organização e agilidade** no atendimento a pacientes.

---

## 🛠️ Tecnologias Utilizadas

- **Java**
- **JavaScript**
- **Servlets + API REST**
- **SQL puro**
- **CSS**
- **Maven 3.x**
- **React.js (Front-end)**
- **Gson (JSON Serializer/Deserializer)**

---

## 📦 Instruções de Execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/BloodBank.git
cd BloodBank

# Compile e execute o servidor
mvn clean package
mvn jetty:run

# Abra outro terminal
cd frontend
npm install
npm start

A interface web estará disponível em:
http://localhost:3000
```

---

# Diagrama Lógico
![image](https://github.com/user-attachments/assets/2cbdefd5-f832-400f-93c1-9410d933a0de)





---
# Diagrama Conceitual
![image](https://github.com/user-attachments/assets/8bd8bf08-6ad3-42b8-a20d-141bfc7cdf11)

---





