// import java.util.List;
// import java.util.Scanner;

// public class App {
//     private static final Scanner sc = new Scanner(System.in);

//     private static final DoadorDAO doadorDAO = new DoadorDAO();
//     private static final HospitalDAO hospitalDAO = new HospitalDAO();
//     private static final GerenteDAO gerenteDAO = new GerenteDAO();
//     private static final SolicitacaoDAO solicitacaoDAO = new SolicitacaoDAO();
//     private static final BolsaSangueDAO bolsaDAO = new BolsaSangueDAO();
//     private static final EstoqueDAO estoqueDAO = new EstoqueDAO();

//     public static void main(String[] args) {
//         int opcao = 0;
//         while (opcao != 9) {
//             System.out.println("\n=== SISTEMA DE BANCO DE SANGUE (NOVO DIAGRAMA) ===");
//             System.out.println("1 - Menu Doador");
//             System.out.println("2 - Menu Hospital");
//             System.out.println("3 - Menu Gerente");
//             System.out.println("4 - Menu Solicitação");
//             System.out.println("5 - Menu BolsaSangue");
//             System.out.println("6 - Menu Estoque");
//             System.out.println("7 - Registrar Doacao (exemplo)");
//             System.out.println("8 - Solicitar Bolsas (exemplo de retirada do estoque)");
//             System.out.println("9 - Sair");
//             System.out.print("Escolha: ");
//             opcao = sc.nextInt(); 
//             sc.nextLine(); // consumir \n

//             switch (opcao) {
//                 case 1 -> menuDoador();
//                 case 2 -> menuHospital();
//                 case 3 -> menuGerente();
//                 case 4 -> menuSolicitacao();
//                 case 5 -> menuBolsaSangue();
//                 case 6 -> menuEstoque();
//                 case 7 -> registrarDoacaoExemplo();
//                 case 8 -> solicitarBolsasExemplo();
//                 case 9 -> System.out.println("Encerrando...");
//                 default -> System.out.println("Opção inválida!");
//             }
//         }
//     }

//     // ----------------------------------------------------------------
//     // (1) MENU DOADOR
//     private static void menuDoador() {
//         int op = 0;
//         while (op != 5) {
//             System.out.println("\n== MENU DOADOR ==");
//             System.out.println("1 - Cadastrar Doador");
//             System.out.println("2 - Listar Doadores");
//             System.out.println("3 - Buscar Doador por CPF");
//             System.out.println("4 - Deletar Doador");
//             System.out.println("5 - Voltar");
//             System.out.print("Escolha: ");
//             op = sc.nextInt(); 
//             sc.nextLine();

//             switch (op) {
//                 case 1 -> cadastrarDoador();
//                 case 2 -> listarDoadores();
//                 case 3 -> buscarDoador();
//                 case 4 -> deletarDoador();
//                 case 5 -> System.out.println("Voltando ao menu principal...");
//                 default -> System.out.println("Opção inválida!");
//             }
//         }
//     }

//     private static void cadastrarDoador() {
//         System.out.println("=== Cadastrar Doador ===");
//         System.out.print("CPF: ");
//         String cpf = sc.nextLine();
//         System.out.print("Nome: ");
//         String nome = sc.nextLine();
//         System.out.print("Idade: ");
//         int idade = sc.nextInt(); 
//         sc.nextLine();
//         System.out.print("Sexo (M/F): ");
//         String sexo = sc.nextLine();
//         System.out.print("Tipo Sanguineo: ");
//         String tipo = sc.nextLine();

//         System.out.print("Rua: ");
//         String rua = sc.nextLine();
//         System.out.print("CEP: ");
//         String cep = sc.nextLine();
//         System.out.print("Cidade: ");
//         String cidade = sc.nextLine();
//         System.out.print("Estado: ");
//         String estado = sc.nextLine();

//         Doador d = new Doador(cpf, nome, idade, sexo, tipo, rua, cep, cidade, estado);
//         doadorDAO.inserir(d);
//         System.out.println("Doador cadastrado com sucesso!");
//     }

//     private static void listarDoadores() {
//         List<Doador> lista = doadorDAO.listarTodos();
//         System.out.println("=== Lista de Doadores ===");
//         for (Doador d : lista) {
//             System.out.println("CPF: " + d.getCpf()
//                 + " | Nome: " + d.getNome()
//                 + " | Tipo: " + d.getTipoSanguineo());
//         }
//     }

//     private static void buscarDoador() {
//         System.out.print("CPF do doador: ");
//         String cpf = sc.nextLine();
//         Doador d = doadorDAO.buscarPorCpf(cpf);
//         if (d != null) {
//             System.out.println("Nome: " + d.getNome()
//                 + ", Tipo: " + d.getTipoSanguineo()
//                 + ", Cidade: " + d.getCidade());
//         } else {
//             System.out.println("Doador não encontrado!");
//         }
//     }

//     private static void deletarDoador() {
//         System.out.print("CPF do doador para deletar: ");
//         String cpf = sc.nextLine();
//         doadorDAO.deletar(cpf);
//         System.out.println("Doador deletado, se existia.");
//     }

//     // ----------------------------------------------------------------
//     // (2) MENU HOSPITAL
//     private static void menuHospital() {
//         int op = 0;
//         while (op != 5) {
//             System.out.println("\n== MENU HOSPITAL ==");
//             System.out.println("1 - Cadastrar Hospital");
//             System.out.println("2 - Listar Hospitais");
//             System.out.println("3 - Buscar Hospital por CNPJ");
//             System.out.println("4 - Deletar Hospital");
//             System.out.println("5 - Voltar");
//             System.out.print("Escolha: ");
//             op = sc.nextInt(); 
//             sc.nextLine();

//             switch (op) {
//                 case 1 -> cadastrarHospital();
//                 case 2 -> listarHospitais();
//                 case 3 -> buscarHospital();
//                 case 4 -> deletarHospital();
//                 case 5 -> System.out.println("Voltando ao menu principal...");
//                 default -> System.out.println("Opção inválida!");
//             }
//         }
//     }

//     private static void cadastrarHospital() {
//         System.out.println("=== Cadastrar Hospital ===");
//         System.out.print("CNPJ: ");
//         String cnpj = sc.nextLine();
//         System.out.print("Nome: ");
//         String nome = sc.nextLine();
//         System.out.print("Telefone: ");
//         String tel = sc.nextLine();
//         System.out.print("Endereço: ");
//         String end = sc.nextLine();

//         Hospital h = new Hospital(cnpj, nome, tel, end);
//         hospitalDAO.inserir(h);
//         System.out.println("Hospital cadastrado!");
//     }

//     private static void listarHospitais() {
//         List<Hospital> lista = hospitalDAO.listarTodos();
//         System.out.println("=== Lista de Hospitais ===");
//         for (Hospital h : lista) {
//             System.out.println("CNPJ: " + h.getCnpj()
//                 + " | Nome: " + h.getNome()
//                 + " | Telefone: " + h.getTelefone());
//         }
//     }

//     private static void buscarHospital() {
//         System.out.print("CNPJ do hospital: ");
//         String cnpj = sc.nextLine();
//         Hospital h = hospitalDAO.buscarPorCnpj(cnpj);
//         if (h != null) {
//             System.out.println("Nome: " + h.getNome()
//                 + ", Telefone: " + h.getTelefone());
//         } else {
//             System.out.println("Hospital não encontrado!");
//         }
//     }

//     private static void deletarHospital() {
//         System.out.print("CNPJ do hospital para deletar: ");
//         String cnpj = sc.nextLine();
//         hospitalDAO.deletar(cnpj);
//         System.out.println("Hospital deletado (se existia).");
//     }

//     // ----------------------------------------------------------------
//     // (3) MENU GERENTE
//     private static void menuGerente() {
//         int op = 0;
//         while (op != 5) {
//             System.out.println("\n== MENU GERENTE ==");
//             System.out.println("1 - Cadastrar Gerente");
//             System.out.println("2 - Listar Gerentes");
//             System.out.println("3 - Buscar Gerente por ID");
//             System.out.println("4 - Deletar Gerente");
//             System.out.println("5 - Voltar");
//             System.out.print("Escolha: ");
//             op = sc.nextInt(); 
//             sc.nextLine();

//             switch (op) {
//                 case 1 -> cadastrarGerente();
//                 case 2 -> listarGerentes();
//                 case 3 -> buscarGerente();
//                 case 4 -> deletarGerente();
//                 case 5 -> System.out.println("Voltando ao menu principal...");
//                 default -> System.out.println("Opção inválida!");
//             }
//         }
//     }

//     private static void cadastrarGerente() {
//         System.out.println("=== Cadastrar Gerente ===");
//         System.out.print("Nome: ");
//         String nome = sc.nextLine();
//         Gerente g = new Gerente(0, nome);
//         gerenteDAO.inserir(g);
//         System.out.println("Gerente cadastrado!");
//     }

//     private static void listarGerentes() {
//         List<Gerente> lista = gerenteDAO.listarTodos();
//         System.out.println("=== Lista de Gerentes ===");
//         for (Gerente g : lista) {
//             System.out.println("ID: " + g.getIdGerente() + " | Nome: " + g.getNome());
//         }
//     }

//     private static void buscarGerente() {
//         System.out.print("ID do Gerente: ");
//         int idG = sc.nextInt(); 
//         sc.nextLine();
//         Gerente g = gerenteDAO.buscarPorId(idG);
//         if (g != null) {
//             System.out.println("Nome do Gerente: " + g.getNome());
//         } else {
//             System.out.println("Gerente não encontrado!");
//         }
//     }

//     private static void deletarGerente() {
//         System.out.print("ID do Gerente para deletar: ");
//         int idG = sc.nextInt(); 
//         sc.nextLine();
//         gerenteDAO.deletar(idG);
//         System.out.println("Gerente excluído (se existia).");
//     }

//     // ----------------------------------------------------------------
//     // (4) MENU SOLICITACAO
//     private static void menuSolicitacao() {
//         int op = 0;
//         while (op != 5) {
//             System.out.println("\n== MENU SOLICITACAO ==");
//             System.out.println("1 - Cadastrar Solicitação");
//             System.out.println("2 - Listar Solicitações");
//             System.out.println("3 - Buscar Solicitação por ID");
//             System.out.println("4 - Deletar Solicitação");
//             System.out.println("5 - Voltar");
//             System.out.print("Escolha: ");
//             op = sc.nextInt(); 
//             sc.nextLine();

//             switch (op) {
//                 case 1 -> cadastrarSolicitacao();
//                 case 2 -> listarSolicitacoes();
//                 case 3 -> buscarSolicitacao();
//                 case 4 -> deletarSolicitacao();
//                 case 5 -> System.out.println("Voltando ao menu principal...");
//                 default -> System.out.println("Opção inválida!");
//             }
//         }
//     }

//     private static void cadastrarSolicitacao() {
//         System.out.println("=== Cadastrar Solicitação ===");
//         System.out.print("Tipo sanguineo: ");
//         String tipo = sc.nextLine();
//         System.out.print("Qtd Bolsas Solicitadas: ");
//         int qtd = sc.nextInt(); 
//         sc.nextLine();
//         System.out.print("ID do Gerente: ");
//         int idG = sc.nextInt(); 
//         sc.nextLine();
//         System.out.print("CNPJ do Hospital: ");
//         String cnpj = sc.nextLine();

//         Solicitacao s = new Solicitacao(0, tipo, qtd, idG, cnpj);
//         solicitacaoDAO.inserir(s);
//         System.out.println("Solicitacao registrada com sucesso!");
//     }

//     private static void listarSolicitacoes() {
//         List<Solicitacao> lista = solicitacaoDAO.listarTodos();
//         System.out.println("=== Lista de Solicitações ===");
//         for (Solicitacao s : lista) {
//             System.out.println("ID: " + s.getIdSolicitacao()
//                 + " | Tipo: " + s.getTipoSanguineo()
//                 + " | Qtd: " + s.getQtdBolsasSolicitadas()
//                 + " | Gerente: " + s.getIdGerente()
//                 + " | Hospital: " + s.getCnpjHospital());
//         }
//     }

//     private static void buscarSolicitacao() {
//         System.out.print("ID da Solicitação: ");
//         int idS = sc.nextInt(); 
//         sc.nextLine();
//         Solicitacao s = solicitacaoDAO.buscarPorId(idS);
//         if (s != null) {
//             System.out.println("Tipo: " + s.getTipoSanguineo()
//                 + ", Qtd: " + s.getQtdBolsasSolicitadas());
//         } else {
//             System.out.println("Solicitacao não encontrada!");
//         }
//     }

//     private static void deletarSolicitacao() {
//         System.out.print("ID da Solicitação para deletar: ");
//         int idS = sc.nextInt(); 
//         sc.nextLine();
//         solicitacaoDAO.deletar(idS);
//         System.out.println("Solicitação excluída (se existia).");
//     }

//     // ----------------------------------------------------------------
//     // (5) MENU BOLSA DE SANGUE
//     private static void menuBolsaSangue() {
//         int op = 0;
//         while (op != 5) {
//             System.out.println("\n== MENU BOLSA DE SANGUE ==");
//             System.out.println("1 - Criar Bolsa");
//             System.out.println("2 - Listar Bolsas");
//             System.out.println("3 - Buscar Bolsa por ID");
//             System.out.println("4 - Deletar Bolsa");
//             System.out.println("5 - Voltar");
//             System.out.print("Escolha: ");
//             op = sc.nextInt(); 
//             sc.nextLine();

//             switch (op) {
//                 case 1 -> criarBolsa();
//                 case 2 -> listarBolsas();
//                 case 3 -> buscarBolsa();
//                 case 4 -> deletarBolsa();
//                 case 5 -> System.out.println("Voltando...");
//                 default -> System.out.println("Opção inválida!");
//             }
//         }
//     }

//     private static void criarBolsa() {
//         System.out.println("=== Criar Bolsa ===");
//         System.out.print("Tipo Sanguineo: ");
//         String tipo = sc.nextLine();
//         System.out.print("CPF do Doador (opcional se quiser vincular): ");
//         String cpfDoador = sc.nextLine();

//         BolsaSangue b = new BolsaSangue(0, tipo, cpfDoador);
//         bolsaDAO.inserir(b);
//         System.out.println("Bolsa criada, ID gerado: " + b.getIdBolsa());
//     }

//     private static void listarBolsas() {
//         List<BolsaSangue> lista = bolsaDAO.listarTodas();
//         System.out.println("=== Lista de Bolsas de Sangue ===");
//         for (BolsaSangue b : lista) {
//             System.out.println("ID: " + b.getIdBolsa()
//                 + " | Tipo: " + b.getTipoSanguineo()
//                 + " | Doador: " + b.getCpfDoador());
//         }
//     }

//     private static void buscarBolsa() {
//         System.out.print("ID da Bolsa: ");
//         int id = sc.nextInt(); 
//         sc.nextLine();
//         BolsaSangue b = bolsaDAO.buscarPorId(id);
//         if (b != null) {
//             System.out.println("Tipo: " + b.getTipoSanguineo()
//                 + ", Doador: " + b.getCpfDoador());
//         } else {
//             System.out.println("Bolsa não encontrada!");
//         }
//     }

//     private static void deletarBolsa() {
//         System.out.print("ID da Bolsa a deletar: ");
//         int id = sc.nextInt(); 
//         sc.nextLine();
//         bolsaDAO.deletar(id);
//         System.out.println("Bolsa removida (se existia).");
//     }

//     // ----------------------------------------------------------------
//     // (6) MENU ESTOQUE
//     private static void menuEstoque() {
//         int op = 0;
//         while (op != 5) {
//             System.out.println("\n== MENU ESTOQUE ==");
//             System.out.println("1 - Inserir (tipo, qtd)");
//             System.out.println("2 - Listar Estoque");
//             System.out.println("3 - Buscar por Tipo");
//             System.out.println("4 - Deletar por ID");
//             System.out.println("5 - Voltar");
//             System.out.print("Escolha: ");
//             op = sc.nextInt(); 
//             sc.nextLine();

//             switch (op) {
//                 case 1 -> inserirEstoque();
//                 case 2 -> listarEstoque();
//                 case 3 -> buscarEstoquePorTipo();
//                 case 4 -> deletarEstoque();
//                 case 5 -> System.out.println("Voltando...");
//                 default -> System.out.println("Opção inválida!");
//             }
//         }
//     }

//     private static void inserirEstoque() {
//         System.out.println("=== Inserir no Estoque ===");
//         System.out.print("Tipo Sanguineo: ");
//         String tipo = sc.nextLine();
//         System.out.print("Quantidade: ");
//         int qtd = sc.nextInt(); 
//         sc.nextLine();

//         Estoque e = new Estoque(0, tipo, qtd);
//         estoqueDAO.inserir(e);
//         System.out.println("Estoque inserido, ID gerado: " + e.getIdEstoque());
//     }

//     private static void listarEstoque() {
//         List<Estoque> lista = estoqueDAO.listarTodos();
//         System.out.println("=== Lista de Estoque ===");
//         for (Estoque e : lista) {
//             System.out.println("ID: " + e.getIdEstoque()
//                 + " | Tipo: " + e.getTipoSanguineo()
//                 + " | Qtd: " + e.getQtdBolsas());
//         }
//     }

//     private static void buscarEstoquePorTipo() {
//         System.out.print("Tipo Sanguineo: ");
//         String tipo = sc.nextLine();
//         Estoque e = estoqueDAO.buscarPorTipo(tipo);
//         if (e != null) {
//             System.out.println("Tipo: " + e.getTipoSanguineo()
//                 + ", Qtd: " + e.getQtdBolsas());
//         } else {
//             System.out.println("Não há estoque para esse tipo!");
//         }
//     }

//     private static void deletarEstoque() {
//         System.out.print("ID do estoque a deletar: ");
//         int id = sc.nextInt(); 
//         sc.nextLine();
//         estoqueDAO.deletar(id);
//         System.out.println("Removido do estoque (se existia).");
//     }

//     // ----------------------------------------------------------------
//     // (7) Registrar doacao (exemplo) - cria X bolsas e soma no estoque
//     private static void registrarDoacaoExemplo() {
//         System.out.println("=== Registrar Doacao ===");
//         System.out.print("CPF do doador: ");
//         String cpf = sc.nextLine();
//         Doador doador = doadorDAO.buscarPorCpf(cpf);
//         if (doador == null) {
//             System.out.println("Doador não encontrado. Cadastre antes.");
//             return;
//         }

//         System.out.print("Quantas bolsas está doando? ");
//         int qtd = sc.nextInt(); 
//         sc.nextLine();

//         // Cria X bolsas
//         for (int i = 0; i < qtd; i++) {
//             BolsaSangue bolsa = new BolsaSangue(0, doador.getTipoSanguineo(), cpf);
//             bolsaDAO.inserir(bolsa);
//         }

//         // Atualiza estoque
//         Estoque e = estoqueDAO.buscarPorTipo(doador.getTipoSanguineo());
//         if (e == null) {
//             e = new Estoque(0, doador.getTipoSanguineo(), qtd);
//             estoqueDAO.inserir(e);
//         } else {
//             e.setQtdBolsas(e.getQtdBolsas() + qtd);
//             estoqueDAO.atualizar(e);
//         }

//         System.out.println("Doação registrada! " + qtd + " bolsas do tipo " 
//             + doador.getTipoSanguineo() + " criadas.");
//     }

//     // ----------------------------------------------------------------
//     // (8) Solicitar Bolsas do Estoque (exemplo)
//     private static void solicitarBolsasExemplo() {
//         System.out.println("=== Solicitar Bolsas (Exemplo) ===");
//         System.out.print("Tipo Sanguineo necessário: ");
//         String tipo = sc.nextLine();
//         System.out.print("Qtd desejada: ");
//         int qtd = sc.nextInt(); 
//         sc.nextLine();

//         // Verificar no estoque
//         Estoque e = estoqueDAO.buscarPorTipo(tipo);
//         if (e == null || e.getQtdBolsas() < qtd) {
//             System.out.println("Estoque insuficiente ou inexistente para " + tipo);
//             return;
//         }

//         System.out.print("Confirmar retirada de " + qtd + " bolsas? (S/N): ");
//         String resp = sc.nextLine().toUpperCase();
//         if (resp.equals("S")) {
//             e.setQtdBolsas(e.getQtdBolsas() - qtd);
//             estoqueDAO.atualizar(e);
//             System.out.println("Retirada realizada com sucesso!");
//         } else {
//             System.out.println("Retirada cancelada.");
//         }
//     }
// }
