Este guia contém as instruções detalhadas para configurar, iniciar e testar o projeto Front-End (ReactJS) e o Back-End (Spark Java/JDBC), garantindo que o avaliador possa executar a aplicação com sucesso.1. Identificação da DuplaNome CompletoMatrícula[Seu Nome Aqui][Sua Matrícula Aqui][Nome do(a) Parceiro(a) Aqui][Matrícula do(a) Parceiro(a) Aqui]2. Estrutura do RepositórioO repositório app_frontProdutos segue a estrutura obrigatória, separando claramente o Front-End (React) e o Back-End (Spark Java/JDBC).app_frontProdutos/
├── BackEnd/        <- Código completo do Spark Java/JDBC
├── FrontEnd/       <- Código completo do Projeto ReactJS
└── READme.pdf      <- Este arquivo de documentação
3. Instruções de Execução do Back-End (Spark Java / JDBC) 🛠️O Back-End é uma API REST desenvolvida em Spark Java que utiliza JDBC para persistência de dados em um banco MySQL/MariaDB.3.1. Pré-RequisitosJava Development Kit (JDK): Versão 11 ou superior instalada.MySQL Server/MariaDB: Servidor de banco de dados rodando (pode ser via XAMPP, Docker, ou instalação nativa).Ambiente de Desenvolvimento: VS Code (com extensões Java) ou IDE como IntelliJ/Eclipse.3.2. Configuração do Banco de DadosCriação do Banco: Execute os comandos SQL a seguir (ou use o arquivo .txt contido no Back-End) no seu cliente MySQL (Workbench, linha de comando, etc.) para criar o banco de dados e as tabelas necessárias:SQLSET NAMES 'utf8mb4';
CREATE DATABASE IF NOT EXISTS aulajdbc;
USE aulajdbc;

CREATE TABLE IF NOT EXISTS categorias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

INSERT INTO categorias (nome) VALUES 
('Eletrônicos'),
('Livros'),
('Alimentos');


CREATE TABLE IF NOT EXISTS produtos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    preco DOUBLE NOT NULL,
    estoque INT NOT NULL,
    id_categoria BIGINT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);
Configuração de Conexão (Variáveis de Ambiente):Verifique o arquivo de configuração do seu projeto Back-End (geralmente em dao/ConnectionFactory ou similar) e ajuste as credenciais do banco de dados para corresponder à sua instalação local.ParâmetroValor Padrão no ProjetoSeu AjusteURL JDBCjdbc:mysql://localhost/aulajdbc(Manter se a porta for 3306)Usuárioroot[Seu Usuário do MySQL]Senha[Sua Senha Vazia][Sua Senha do MySQL]3.3. Inicialização do Back-EndNavegue: Abra o diretório BackEnd/ no seu terminal.Compile e Execute: O Back-End deve ser compilado e executado. Se estiver usando uma IDE (como VS Code ou IntelliJ), execute a classe principal (provavelmente api.ApiProduto ou o equivalente).Confirmação: Após a execução, o terminal deve exibir a mensagem:"API de Produtos iniciada na porta 4567. Acesse: http://localhost:4567/produtos"4. Instruções de Execução do Front-End (ReactJS) 💻O Front-End é um aplicativo de página única (SPA) em ReactJS que se comunica com a API REST do Back-End na porta 4567.4.1. Pré-RequisitosNode.js e npm: Instalados na máquina (o npm é o gerenciador de pacotes padrão do Node.js).4.2. Instalação e InicializaçãoNavegue: Abra um novo terminal e navegue até o diretório do Front-End:Bashcd FrontEnd
Instale as Dependências: Instale as bibliotecas necessárias (React, React Router DOM, etc.):Bashnpm install
Inicie a Aplicação: Inicie o servidor de desenvolvimento do React:Bashnpm start
4.3. Acesso no NavegadorAcesse: O navegador será aberto automaticamente (ou abra manualmente) na URL:http://localhost:3000OBSERVAÇÃO: O Front-End espera que o Back-End esteja rodando em http://localhost:4567 antes de ser acessado.5. Funcionalidades CRUD ImplementadasA aplicação Front-End implementa todas as operações CRUD (Create, Read, Update, Delete) para Produtos e Categorias, conforme as rotas definidas no Back-End:EntidadeOperaçãoMétodo HTTPURL (Back-End)Tela no Front-EndProdutoListagem/LeituraGET/produtosListaProdutoCriaçãoPOST/produtosCadastroProdutoProdutoAtualizaçãoPUT/produtos/:idLista (Modo Edição)ProdutoRemoçãoDELETE/produtos/:idListaCategoriaListagem/LeituraGET/categoriasGerenciadorCategoriaCategoriaCriaçãoPOST/categoriasGerenciadorCategoriaCategoriaAtualizaçãoPUT/categorias/:idGerenciadorCategoriaCategoriaRemoçãoDELETE/categorias/:idGerenciadorCategoriaTecnologia de Comunicação: Todas as interações Front-End ↔ Back-End são feitas utilizando a Fetch API nativa do JavaScript.
