# BloodBank 🩸💉
---

# 🎯 Sistema de Gerenciamento de Banco de Sangue

O **Sistema de Gerenciamento de Banco de Sangue** é uma plataforma completa destinada a gerenciar, de forma segura e eficiente, o processo de doação, armazenamento e distribuição de sangue. Este sistema é voltado para instituições de saúde que precisam de um controle rigoroso sobre os estoques de bolsas de sangue e a logística envolvida nas solicitações hospitalares.

## 📌 Objetivo do Sistema

O **Mini Mundo - Banco de Sangue** visa centralizar e organizar as operações de um banco de sangue com as seguintes funcionalidades:

- **Registrar doações de sangue**, vinculando cada bolsa a um doador específico.
- **Controlar o estoque de sangue** por tipo sanguíneo e quantidade disponível.
- **Atender às solicitações de bolsas** feitas por hospitais.
- **Registrar pacientes** que irão receber as bolsas de sangue.
- **Gerenciar a atuação dos funcionários**, diferenciando as funções de administradores e atendentes.
- **Controlar os dados dos hospitais** que requisitam bolsas e dos pacientes que as recebem.

## 🧩 Principais Entidades e Relacionamentos

### **Doador**
- Pessoa cadastrada no sistema com dados pessoais e endereço.
- Pode realizar várias doações de sangue, associando cada doação a um tipo sanguíneo.
- Pode ser indicada por um funcionário do banco de sangue.

### **Funcionário**
- Pessoas responsáveis pelas funções administrativas ou de atendimento.
- Existem duas categorias: **Administrador** (controle geral do sistema) e **Atendente** (responsável por registrar solicitações de sangue).

### **Bolsa de Sangue**
- Unidade de sangue armazenada no sistema.
- Cada bolsa está vinculada a um doador específico e registrada no estoque conforme seu tipo sanguíneo e quantidade disponível.

### **Estoque**
- Registra a quantidade de sangue disponível e os tipos sanguíneos em estoque.
- Controla o armazenamento das bolsas de sangue.

### **Solicitação**
- Pedido feito por um atendente para determinado tipo sanguíneo, especificando a quantidade de bolsas desejadas.
- A solicitação é registrada e associada a um hospital específico.

### **Hospital**
- Instituição que solicita o sangue e que recebe as bolsas conforme as solicitações realizadas.
- Cada hospital é associado aos pacientes que receberão as bolsas de sangue.

### **Paciente**
- Pessoa que irá receber uma ou mais bolsas de sangue, com vínculo com o hospital e com a solicitação realizada.

## 🔄 Fluxo de Operações

### 1. **Cadastro de Doador**
- Um **funcionário** (administrador ou atendente) cadastra um novo doador no sistema.
  
### 2. **Doação de Sangue**
- O **doador** realiza a doação de sangue, e uma **bolsa de sangue** é criada e associada ao seu CPF.

### 3. **Registro no Estoque**
- A **bolsa de sangue** é registrada no **estoque** do banco de sangue, de acordo com o tipo sanguíneo e a quantidade disponível.

### 4. **Solicitação de Bolsas**
- Um **hospital** solicita bolsas de sangue específicas. Um **atendente** formaliza a solicitação no sistema.

### 5. **Distribuição para o Paciente**
- A **bolsa** é alocada ao **paciente** vinculado ao hospital, e a solicitação é atendida conforme o tipo sanguíneo e quantidade requerida.

## 🛡️ Benefícios do Sistema

O **Sistema de Gerenciamento de Banco de Sangue** traz inúmeros benefícios, incluindo:

- **Otimização do tempo de resposta** às solicitações hospitalares, agilizando a distribuição de sangue.
- **Melhoria na gestão do estoque**, evitando desperdícios e garantindo o controle de bolsas de sangue por tipo sanguíneo e quantidade.
- **Rastreabilidade completa das bolsas de sangue** desde a doação até o uso final, garantindo maior segurança e controle.
- **Controle eficiente do desempenho dos funcionários** responsáveis pelas operações do banco de sangue.
- **Facilidade no atendimento humanizado aos pacientes**, mantendo um banco de dados completo e organizado para cada paciente e hospital.

---
# Diagrama Lógico
![image](https://github.com/user-attachments/assets/4fd09c5f-4ef9-4380-9536-221c9fe005be)




---
# Diagrama Conceitual
![image](https://github.com/user-attachments/assets/8bd8bf08-6ad3-42b8-a20d-141bfc7cdf11)

---





