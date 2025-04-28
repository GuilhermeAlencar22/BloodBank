-- blood_bank.Bolsa_Sangue definição

CREATE TABLE `Bolsa_Sangue` (
  `id_bolsa` varchar(50) NOT NULL,
  `tipo_sanguineo` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id_bolsa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Estoque definição

CREATE TABLE `Estoque` (
  `id_estoque` int NOT NULL AUTO_INCREMENT,
  `tipo_sanguineo` varchar(3) DEFAULT NULL,
  `qtd_bolsas` int DEFAULT NULL,
  PRIMARY KEY (`id_estoque`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Funcionario definição

CREATE TABLE `Funcionario` (
  `id_funcionario` varchar(20) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Hospital definição

CREATE TABLE `Hospital` (
  `cnpj` varchar(20) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cnpj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Pessoa definição

CREATE TABLE `Pessoa` (
  `cpf` varchar(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `endereco_cidade` varchar(255) DEFAULT NULL,
  `endereco_estado` varchar(255) DEFAULT NULL,
  `endereco_rua` varchar(255) DEFAULT NULL,
  `endereco_cep` varchar(20) DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `tipo_sanguineo` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Administrador definição

CREATE TABLE `Administrador` (
  `id_funcionario` varchar(20) DEFAULT NULL,
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionario` (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Armazena definição

CREATE TABLE `Armazena` (
  `id_estoque` int DEFAULT NULL,
  `id_bolsa` varchar(20) DEFAULT NULL,
  KEY `id_bolsa` (`id_bolsa`),
  KEY `armazena_ibfk_1` (`id_estoque`),
  CONSTRAINT `armazena_ibfk_1` FOREIGN KEY (`id_estoque`) REFERENCES `Estoque` (`id_estoque`),
  CONSTRAINT `armazena_ibfk_2` FOREIGN KEY (`id_bolsa`) REFERENCES `Bolsa_Sangue` (`id_bolsa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Atende definição

CREATE TABLE `Atende` (
  `cnpj_hospital` varchar(20) DEFAULT NULL,
  `cpf_paciente` varchar(11) DEFAULT NULL,
  `id_funcionario` varchar(20) DEFAULT NULL,
  `data_atendimento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `cnpj_hospital` (`cnpj_hospital`),
  KEY `cpf_paciente` (`cpf_paciente`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `atende_ibfk_1` FOREIGN KEY (`cnpj_hospital`) REFERENCES `Hospital` (`cnpj`),
  CONSTRAINT `atende_ibfk_2` FOREIGN KEY (`cpf_paciente`) REFERENCES `Pessoa` (`cpf`),
  CONSTRAINT `atende_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionario` (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Atendente definição

CREATE TABLE `Atendente` (
  `id_funcionario` varchar(20) DEFAULT NULL,
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `atendente_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionario` (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Doa definição

CREATE TABLE `Doa` (
  `id_bolsa` varchar(50) DEFAULT NULL,
  `cpf_doador` varchar(11) DEFAULT NULL,
  `data_doacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `qtd_bolsas_doadas` int DEFAULT '0',
  KEY `cpf_doador` (`cpf_doador`),
  KEY `id_bolsa` (`id_bolsa`),
  CONSTRAINT `doa_ibfk_1` FOREIGN KEY (`cpf_doador`) REFERENCES `Pessoa` (`cpf`),
  CONSTRAINT `doa_ibfk_2` FOREIGN KEY (`id_bolsa`) REFERENCES `Bolsa_Sangue` (`id_bolsa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Doador definição

CREATE TABLE `Doador` (
  `cpf` varchar(11) NOT NULL,
  `qtd_bolsas_doadas` int DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  KEY `cpf` (`cpf`),
  CONSTRAINT `doador_ibfk_1` FOREIGN KEY (`cpf`) REFERENCES `Pessoa` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Gerente definição

CREATE TABLE `Gerente` (
  `id_funcionario` varchar(20) DEFAULT NULL,
  `cnpj_hospital` varchar(20) DEFAULT NULL,
  KEY `id_funcionario` (`id_funcionario`),
  KEY `cnpj_hospital` (`cnpj_hospital`),
  CONSTRAINT `gerente_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionario` (`id_funcionario`),
  CONSTRAINT `gerente_ibfk_2` FOREIGN KEY (`cnpj_hospital`) REFERENCES `Hospital` (`cnpj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.IndicadoPor definição

CREATE TABLE `IndicadoPor` (
  `cpf_doador` varchar(11) DEFAULT NULL,
  `cpf_paciente` varchar(11) DEFAULT NULL,
  `data_indicacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `cpf_doador` (`cpf_doador`),
  KEY `cpf_paciente` (`cpf_paciente`),
  CONSTRAINT `indicadopor_ibfk_1` FOREIGN KEY (`cpf_doador`) REFERENCES `Pessoa` (`cpf`),
  CONSTRAINT `indicadopor_ibfk_2` FOREIGN KEY (`cpf_paciente`) REFERENCES `Pessoa` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Paciente definição

CREATE TABLE `Paciente` (
  `cpf` varchar(11) NOT NULL,
  KEY `cpf` (`cpf`),
  CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`cpf`) REFERENCES `Pessoa` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Recebe definição

CREATE TABLE `Recebe` (
  `id_bolsa` varchar(20) DEFAULT NULL,
  `cpf_paciente` varchar(11) DEFAULT NULL,
  `data_recebimento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `cpf_paciente` (`cpf_paciente`),
  KEY `id_bolsa` (`id_bolsa`),
  CONSTRAINT `recebe_ibfk_1` FOREIGN KEY (`cpf_paciente`) REFERENCES `Pessoa` (`cpf`),
  CONSTRAINT `recebe_ibfk_2` FOREIGN KEY (`id_bolsa`) REFERENCES `Bolsa_Sangue` (`id_bolsa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Solicitacao definição

CREATE TABLE `Solicitacao` (
  `id_solicitacao` varchar(20) NOT NULL,
  `qtd_bolsas_solicitadas` int DEFAULT NULL,
  `tipo_sanguineo` varchar(3) DEFAULT NULL,
  `id_gerente` varchar(20) DEFAULT NULL,
  `data_solicitacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_solicitacao`),
  KEY `id_gerente` (`id_gerente`),
  CONSTRAINT `solicitacao_ibfk_1` FOREIGN KEY (`id_gerente`) REFERENCES `Funcionario` (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- blood_bank.Solicita definição

CREATE TABLE `Solicita` (
  `id_solicitacao` varchar(20) DEFAULT NULL,
  `id_funcionario` varchar(20) DEFAULT NULL,
  KEY `id_solicitacao` (`id_solicitacao`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `solicita_ibfk_1` FOREIGN KEY (`id_solicitacao`) REFERENCES `Solicitacao` (`id_solicitacao`),
  CONSTRAINT `solicita_ibfk_2` FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionario` (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
