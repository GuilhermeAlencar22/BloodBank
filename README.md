# 🩸 BloodBank — Sistema de Gerenciamento de Banco de Sangue

---

## 🎯 Sobre o Sistema
O **BloodBank** é uma plataforma completa de gerenciamento de bancos de sangue, desenvolvida para controlar de maneira eficiente, segura e organizada todo o fluxo de doações, armazenamento e solicitações hospitalares de bolsas de sangue.

Ideal para instituições de saúde que necessitam rastreabilidade total do sangue doado, controle rigoroso do estoque e agilidade nas operações de doação e distribuição.

---

## 📌 Funcionalidades Principais
- Cadastrar doadores com informações pessoais e de saúde.
- Registrar doações de sangue vinculadas a cada doador.
- Gerenciar o estoque de sangue por tipo sanguíneo e quantidade de bolsas.
- Atender solicitações de sangue feitas por hospitais.
- Cadastrar hospitais parceiros.
- Cadastrar gerentes responsáveis pelos hospitais.
- Login exclusivo de Atendente (com controle de sessão e logout).
- Navegação profissional entre páginas (Home, Sobre, Sistema, Cadastro, Login, Logout).
- Segurança e rastreabilidade no fluxo de bolsas doadas.

---

## 🧩 Entidades e Relacionamentos

### 🧍‍♂️ Doador
- Pessoa cadastrada no sistema.
- Associada a um ou mais registros de doação.
- Controla a quantidade total de bolsas de sangue doadas.

### 🧑‍⚕️ Funcionário
- Responsáveis pela operação do sistema:
  - **Administrador**: gerencia todo o sistema.
  - **Atendente**: cadastra doadores, registra doações e gerencia solicitações.

### 🩸 Bolsa de Sangue
- Cada doação gera uma bolsa de sangue com identificação única.
- Bolsa vinculada ao CPF do doador e ao tipo sanguíneo.

### 🏥 Hospital
- Instituições cadastradas para receber bolsas de sangue.
- Associadas a seus respectivos gerentes.

### 👩‍⚕️ Paciente (implementação futura opcional)
- Pessoa que receberá as bolsas de sangue.

### 📦 Estoque
- Armazena a quantidade disponível de bolsas por tipo sanguíneo.
- Atualizado automaticamente a cada nova doação ou solicitação.

### 📜 Solicitação
- Pedido formalizado por hospitais via gerentes para bolsas específicas de sangue.

---

## 🔄 Fluxo de Operações
- **Cadastro de Doador:** atendente registra um novo doador.
- **Registro de Doação:** doação gera novas bolsas associadas ao CPF.
- **Atualização do Estoque:** aumento automático do estoque.
- **Solicitação de Bolsas:** hospital solicita bolsas pelo tipo sanguíneo.
- **Controle de Funcionários:** login e logout do atendente controlam as permissões de acesso.

---

## 🛡️ Benefícios do Sistema
- Controle total da origem e destino de cada bolsa de sangue.
- Eficiência no atendimento das solicitações hospitalares.
- Otimização da gestão de estoque, reduzindo desperdícios.
- Interface moderna, responsiva e focada em experiência do usuário (UX).
- Rastreamento seguro de todas as etapas da doação à distribuição.
- Fluxo seguro de login e logout de usuários (controle de sessão).

---

## 🛠️ Tecnologias Utilizadas
- **Back-End:** Java 17 + Servlets + API REST
- **Banco de Dados:** MySQL 8.x
- **Servidor HTTP:** Jetty 9.4.x
- **Gerenciamento de Dependências:** Maven 3.x
- **Front-End:** React.js + CSS Puro
- **Comunicação JSON:** Gson
- **Gerenciamento de Sessão:** SessionStorage

---

# Diagrama Lógico
![image](https://github.com/user-attachments/assets/2cbdefd5-f832-400f-93c1-9410d933a0de)





---
# Diagrama Conceitual
![image](https://github.com/user-attachments/assets/8bd8bf08-6ad3-42b8-a20d-141bfc7cdf11)

---





