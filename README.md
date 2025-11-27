
📦 PROJETO FULL-STACK: SISTEMA DE GESTÃO DE PRODUTOS E CATEGORIAS (CRUD)Este documento é o Guia de Execução e Documentação para o projeto Full-Stack de Sistema de Gestão de Produtos e Categorias.O objetivo principal é implementar as funcionalidades CRUD (Create, Read, Update, Delete) completas para as entidades Produto e Categoria. A comunicação entre o Front-End e o Back-End é realizada exclusivamente através da Fetch API nativa do JavaScript, garantindo a utilização correta dos métodos HTTP.1. INTRODUÇÃOEste projeto implementa uma solução Full-Stack utilizando:Front-End: ReactJS.Back-End (API REST): Spark Java com persistência via JDBC.A comunicação entre as camadas é estritamente via Fetch API nativa do JavaScript, utilizando os métodos HTTP (GET, POST, PUT e DELETE).2. IDENTIFICAÇÃONome CompletoMatrículaHenrique Linhares Pinheiro Loiola25173566[Nome do(a) Parceiro(a) Aqui][Matrícula do(a) Parceiro(a) Aqui]3. ESTRUTURA DO REPOSITÓRIOO repositório app_frontProdutos segue a estrutura de diretórios obrigatória:app_frontProdutos/
├── BackEnd/crud-produto/   (Código completo da API REST - Spark Java/JDBC)
├── FrontEnd/crud-produtos/ (Código completo da aplicação Web - ReactJS)
└── README.md               (Este guia de execução e documentação)
4. INSTRUÇÕES DE EXECUÇÃOPara garantir o funcionamento correto da aplicação, o Back-End (API) deve ser iniciado antes do Front-End (React).4.1. Execução do Back-End (Spark Java / JDBC) 🛠️O Back-End é uma API REST que utiliza MySQL/MariaDB para persistência de dados e roda na porta padrão 4567.4.1.1. Pré-RequisitosJava Development Kit (JDK): Versão 11 ou superior.MySQL Server/MariaDB: Servidor de banco de dados ativo.Ambiente de Desenvolvimento Java: IDE (IntelliJ, Eclipse) ou VS Code com as devidas extensões.4.1.2. Configuração do Banco de DadosCriação do Banco e Estrutura: Execute o script SQL a seguir em seu cliente MySQL para criar a base de dados aulajdbc e as tabelas categorias e produtos.SQLSET NAMES 'utf8mb4';
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
Ajuste de Conexão: Localize o arquivo de configuração JDBC (package util, classe ConnectionFactory) e ajuste as credenciais (usuário e senha) para garantir a conexão com seu servidor MySQL local.4.1.3. Inicialização do Servidor APIAcesse o diretório BackEnd/crud-produto/ na sua IDE ou terminal.Compile e execute a classe principal do servidor (api.ApiProduto).Confirmação: A API estará ativa na porta 4567.Verifique o funcionamento acessando: http://localhost:4567/produtos.4.2. Execução do Front-End (ReactJS) 💻O Front-End provê a interface de usuário e roda na porta padrão 3000 (http://localhost:3000).4.2.1. Pré-RequisitosNode.js e npm: Instalados e configurados na máquina.4.2.2. Instalação e InicializaçãoAbra um terminal e navegue até o diretório do Front-End:Bashcd FrontEnd/crud-produtos
Instale as dependências do projeto:Bashnpm install
Inicie o servidor de desenvolvimento da aplicação:Bashnpm start
4.2.3. Acesso à AplicaçãoO acesso deve ser feito através do navegador na URL: http://localhost:3000.⚠️ Importante: Certifique-se de que o Back-End (porta 4567) esteja ativo antes de acessar o Front-End para garantir a comunicação de dados.
