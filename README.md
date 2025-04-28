# 🩸 BloodBank — Sistema de Gerenciamento de Banco de Sangue

---

## 🎯 Sobre o Sistema

O **BloodBank** é uma plataforma completa de gerenciamento de bancos de sangue, desenvolvida para controlar de maneira **eficiente, segura e organizada** todo o fluxo de doações, armazenamento e solicitações hospitalares de bolsas de sangue.

Ideal para instituições de saúde que necessitam **rastreabilidade total** do sangue doado, controle rigoroso do estoque e agilidade nas operações de doação e distribuição.

---

## 📌 Funcionalidades Principais

- **Cadastrar doadores** com informações pessoais e de saúde.
- **Registrar doações de sangue** vinculadas a cada doador.
- **Gerenciar o estoque** de sangue por tipo sanguíneo e quantidade de bolsas.
- **Atender solicitações** de sangue feitas por hospitais.
- **Cadastrar pacientes** que irão receber as bolsas de sangue.
- **Gerenciar funcionários**, diferenciando administradores e atendentes.
- **Acompanhar hospitais parceiros** e os pacientes vinculados.

---

## 🧩 Entidades e Relacionamentos

### 🧍‍♂️ Doador
- Pessoa cadastrada no sistema, associada a um ou mais registros de doação.
- Controla também a quantidade total de bolsas de sangue doadas.

### 🧑‍⚕️ Funcionário
- Responsáveis pela operação do sistema, podendo ser:
  - **Administrador**: gerencia o sistema inteiro.
  - **Atendente**: registra doações e solicitações.

### 🩸 Bolsa de Sangue
- Cada doação gera uma **bolsa de sangue** com identificação única.
- Vinculada ao **CPF do doador** e ao **tipo sanguíneo**.

### 🏥 Hospital
- Instituições cadastradas para receber bolsas de sangue.
- Associadas a seus respectivos **pacientes**.

### 👩‍⚕️ Paciente
- Pessoa que recebe a transfusão de sangue.
- Associado a um hospital e a uma bolsa de sangue recebida.

### 📦 Estoque
- Armazena a quantidade disponível de bolsas, organizadas por tipo sanguíneo.
- Atualizado automaticamente a cada nova doação ou retirada.

### 📜 Solicitação
- Pedido de bolsas de sangue feito por hospitais.
- Formalizado por um **atendente** no sistema, com quantidade e tipos solicitados.

---

## 🔄 Fluxo de Operações

1. **Cadastro de Doador**  
   ➔ Funcionário registra um novo doador.

2. **Realização de Doação**  
   ➔ Cada doação gera bolsas de sangue vinculadas ao CPF do doador.

3. **Atualização do Estoque**  
   ➔ As bolsas doadas aumentam automaticamente o estoque.

4. **Solicitação de Bolsas**  
   ➔ Hospital solicita bolsas específicas (tipo sanguíneo e quantidade).

5. **Distribuição ao Paciente**  
   ➔ A bolsa solicitada é associada a um paciente e o estoque é atualizado.

6. **Controle de Funcionários**  
   ➔ Administradores gerenciam todo o sistema; atendentes realizam cadastros e solicitações.

---

## 🛡️ Benefícios do Sistema

- **Controle total da origem e destino** de cada bolsa de sangue.
- **Eficiência no atendimento** de solicitações hospitalares.
- **Otimização da gestão de estoque**, reduzindo desperdício de sangue.
- **Acompanhamento da performance dos doadores** (quantidade de bolsas doadas).
- **Segurança e rastreabilidade** para todas as etapas da doação e distribuição.
- **Atendimento humanizado e organizado** para pacientes.

---

## 🛠️ Tecnologias Utilizadas

- **Java 17**
- **Servlets + API REST**
- **MySQL 8.x**
- **Jetty 9.4.x (Servidor HTTP)**
- **Maven 3.x**
- **React.js (Front-end)**
- **Gson (JSON Serializer/Deserializer)**

---

# Diagrama Lógico
![image](https://github.com/user-attachments/assets/2cbdefd5-f832-400f-93c1-9410d933a0de)





---
# Diagrama Conceitual
![image](https://github.com/user-attachments/assets/8bd8bf08-6ad3-42b8-a20d-141bfc7cdf11)

---





