# GoFinances API

API RESTful desenvolvida com **Node.js** e **Express** para servir os dados financeiros utilizados nas aplicações **GoFinances Web** e **GoFinances Mobile**.

Essa API gerencia transações financeiras pessoais, com suporte a:

- Cadastro de novas transações.
- Listagem de todas as transações de cada mês.
- Destaques com totais de entrada, saída e saldo.
- Filtros por mês e categorias (usado na versão mobile).
- Integração com banco de dados **PostgreSQL**.

---

## Tecnologias

- Node.js
- Express.js
- PostgreSQL
- Sequelize ou Query Builder (dependendo da implementação)
- CORS
- Dotenv
- UUID / Auto Increment
- Body Parser

---

## Instalação

```bash
git clone https://github.com/edmar-zx/goFinancesAPI.git
```
```bash
cd gofinances-api
```

## Configuração do Ambiente (.env)
- Crie um arquivo .env na raiz do projeto com as seguintes variáveis (ajuste conforme seu ambiente):

```bash
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=gofinances
```
# Banco de Dados
- Antes de executar a API, crie o banco de dados e a tabela:

### Criar Banco de Dados
- CREATE DATABASE gofinances;

### Criar Tabela de Transações
```bash
CREATE TABLE transacoes (
	id SERIAL PRIMARY KEY,
	titulo VARCHAR(30) NOT NULL,
	valor NUMERIC(10,2) NOT NULL,
	tipo VARCHAR(10) NOT NULL CHECK(tipo in ('entrada', 'saida')),
	categoria VARCHAR(25) NOT NULL,
	data TIMESTAMP(0) NOT NULL DEFAULT now()
);
```
### Teste de mesês anteriores para o Resumo de categorias por entrada e saída (**Versão Mobile**)
- Faça um INSERT com outros meses para visualizar o gráfico de resumo dos meses anteriores
```bash
-- Junho 2025
INSERT INTO transacoes (titulo, valor, tipo, categoria, data) VALUES
-- Entradas
('Freelance Design Web', 1200.00, 'entrada', 'Freelance', '2025-06-12 14:00:00'),
('Investimentos Renda Fixa', 350.00, 'entrada', 'Rendimentos', '2025-06-20 09:00:00'),
('Venda Ações Tech Corp', 800.00, 'entrada', 'Investimentos', '2025-06-25 16:30:00'),
('Reembolso Uber Viagem', 150.00, 'entrada', 'Reembolsos', '2025-06-18 11:00:00'),
('Salário Empresa XYZ', 500.00, 'entrada', 'Salário', '2025-06-28 10:00:00'),

-- Saídas
('Supermercado Ponto Certo', 5000.00, 'saida', 'Supermercado', '2025-06-05 10:00:00'),
('Residencial Prime - Aluguel', 1500.00, 'saida', 'Aluguel', '2025-06-01 09:00:00'),
('Mercado Central', 300.50, 'saida', 'Supermercado', '2025-06-10 15:30:00'),
('Net Fast Internet', 120.00, 'saida', 'Internet', '2025-06-08 11:00:00'),
('CineMax Cinema', 200.00, 'saida', 'Lazer', '2025-06-15 20:00:00');


-- Maio 2025
INSERT INTO transacoes (titulo, valor, tipo, categoria, data) VALUES
-- Entradas
('Freelance Redação Artigos', 1000.00, 'entrada', 'Freelance', '2025-05-15 13:00:00'),
('Rendimentos Juros Banco', 300.00, 'entrada', 'Rendimentos', '2025-05-22 09:30:00'),
('Venda Fundos Imobiliários', 700.00, 'entrada', 'Investimentos', '2025-05-27 15:45:00'),
('Reembolso Curso Online', 200.00, 'entrada', 'Reembolsos', '2025-05-10 10:00:00'),
('Salário Empresa ABC', 450.00, 'entrada', 'Salário', '2025-05-29 10:00:00'),

-- Saídas
('Mercado São José', 800.00, 'saida', 'Supermercado', '2025-05-05 10:00:00'),
('Conta Luz CPFL', 120.00, 'saida', 'Energia', '2025-05-02 11:00:00'),
('Cinema Estrela', 50.00, 'saida', 'Lazer', '2025-05-15 20:00:00'),
('Passagem Ônibus Local', 180.00, 'saida', 'Transporte', '2025-05-12 08:00:00'),
('Farmácia Saúde+ Vida', 75.00, 'saida', 'Farmácia', '2025-05-20 16:00:00');

-- Abril 2025
INSERT INTO transacoes (titulo, valor, tipo, categoria, data) VALUES
-- Entradas
('Consultoria TI', 1500.00, 'entrada', 'Freelance', '2025-04-10 14:00:00'),
('Dividendos Ações', 400.00, 'entrada', 'Rendimentos', '2025-04-15 09:00:00'),
('Venda Curso Online', 600.00, 'entrada', 'Cursos', '2025-04-20 11:30:00'),
('Doação Recebida', 300.00, 'entrada', 'Doações', '2025-04-25 16:00:00'),
('Salário Empresa Alfa', 4800.00, 'entrada', 'Salário', '2025-04-05 10:00:00'),

-- Saídas
('Conta Água Sabesp', 90.00, 'saida', 'Água', '2025-04-03 12:00:00'),
('Compra Roupas Loja X', 250.00, 'saida', 'Roupas', '2025-04-07 15:00:00'),
('Assinatura Netflix', 45.00, 'saida', 'Assinaturas', '2025-04-12 20:00:00'),
('Consulta Médica', 200.00, 'saida', 'Saúde', '2025-04-18 10:00:00'),
('Serviços Faxina', 180.00, 'saida', 'Serviços Domésticos', '2025-04-22 08:30:00');


-- Março 2025
INSERT INTO transacoes (titulo, valor, tipo, categoria, data) VALUES
-- Entradas
('Projeto Freelancer B', 1300.00, 'entrada', 'Freelance', '2025-03-11 14:00:00'),
('Rendimentos CDB', 350.00, 'entrada', 'Rendimentos', '2025-03-17 09:30:00'),
('Venda Livro Digital', 550.00, 'entrada', 'Cursos', '2025-03-21 16:00:00'),
('Doação Amigo', 250.00, 'entrada', 'Doações', '2025-03-25 13:00:00'),
('Salário Empresa Beta', 4700.00, 'entrada', 'Salário', '2025-03-05 10:00:00'),

-- Saídas
('Conta Telefone Vivo', 90.00, 'saida', 'Telefone', '2025-03-04 11:00:00'),
('Compra Presentes', 300.00, 'saida', 'Presentes', '2025-03-08 18:00:00'),
('Cartão de Crédito Visa', 700.00, 'saida', 'Cartão de Crédito', '2025-03-13 10:00:00'),
('Emergência Mecânica', 600.00, 'saida', 'Emergências', '2025-03-19 14:00:00'),
('Pet Shop Amigo', 120.00, 'saida', 'Pet', '2025-03-22 09:00:00');
```


## Como executar

- Para executar a API digite o seguinte comando no terminal (**Git Bash**)
```bash
node app.js
```



