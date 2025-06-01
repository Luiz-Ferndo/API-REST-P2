# API REST - Sistema de Gerenciamento de Voos

Este é um sistema de gerenciamento de voos desenvolvido em Node.js usando Express.js e MySQL. O sistema permite gerenciar usuários, aeronaves, voos, passageiros e cartões de embarque.

## Estrutura do Projeto

```
API_REST/
├── config/
│   └── db.js           # Configuração do banco de dados
├── controllers/        # Controladores da aplicação
│   ├── aircraftController.js
│   ├── boardingPassController.js
│   ├── flightController.js
│   ├── passengerController.js
│   └── userController.js
├── middlewares/
│   └── auth.js        # Middleware de autenticação JWT
├── models/            # Modelos do Sequelize
│   ├── aircraft.js
│   ├── boardingPass.js
│   ├── flight.js
│   ├── passenger.js
│   └── user.js
├── routes/            # Rotas da API
│   ├── aircraftRoutes.js
│   ├── boardingPassRoutes.js
│   ├── flightRoutes.js
│   ├── index.js
│   ├── passengerRoutes.js
│   └── userRoutes.js
├── .env              # Variáveis de ambiente
├── index.js          # Arquivo principal
└── package.json      # Dependências do projeto
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express.js**: Framework web para Node.js
- **MySQL**: Banco de dados relacional
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js
- **JWT (JSON Web Tokens)**: Para autenticação
- **bcrypt**: Para criptografia de senhas

## Configuração do Ambiente

1. **Variáveis de Ambiente (.env)**
   ```
   PORT=3000
   DB_NAME=demo_flight
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_HOST=127.0.0.1
   JWT_SECRET=sua_chave_secreta
   ```

2. **Dependências Necessárias**
   ```bash
   npm install express sequelize mysql2 bcrypt jsonwebtoken dotenv express-validator
   ```

## Estrutura do Banco de Dados

### Tabelas

1. **sys_user**
   - id (INT, PK)
   - name (VARCHAR)
   - login_email (VARCHAR)
   - password (VARCHAR)
   - user_type (VARCHAR)

2. **aircraft**
   - aircraft_id (INT, PK)
   - model (VARCHAR)
   - capacity (INT)
   - manufacturer (VARCHAR)

3. **flight**
   - flight_id (INT, PK)
   - aircraft_id (INT, FK)
   - flight_number (VARCHAR)
   - origin (VARCHAR)
   - destination (VARCHAR)
   - departure_time (DATETIME)
   - arrival_time (DATETIME)

4. **passenger**
   - passenger_id (INT, PK)
   - first_name (VARCHAR)
   - last_name (VARCHAR)
   - cpf (VARCHAR)

5. **boarding_pass**
   - boarding_pass_id (INT, PK)
   - passenger_id (INT, FK)
   - flight_id (INT, FK)
   - seat_number (VARCHAR)
   - boarding_time (DATETIME)

## Endpoints da API

### Autenticação

1. **Login**
   - Método: POST
   - URL: `/api/login`
   - Body:
     ```json
     {
         "login_email": "email@exemplo.com",
         "password": "senha123"
     }
     ```
   - Resposta: Token JWT

2. **Criar Usuário**
   - Método: POST
   - URL: `/api/users`
   - Body:
     ```json
     {
         "name": "Nome Completo",
         "login_email": "email@exemplo.com",
         "password": "senha123",
         "user_type": "admin"
     }
     ```

### Rotas Protegidas

Todas as rotas abaixo requerem o header de autenticação:
`Authorization: Bearer seu_token_jwt`

#### Usuários
- GET `/api/users` - Lista todos os usuários
- GET `/api/users/:id` - Busca usuário por ID
- PUT `/api/users/:id` - Atualiza usuário
- DELETE `/api/users/:id` - Remove usuário

#### Aeronaves
- GET `/api/aircrafts` - Lista todas as aeronaves
- GET `/api/aircrafts/:id` - Busca aeronave por ID
- POST `/api/aircrafts` - Cria nova aeronave
- PUT `/api/aircrafts/:id` - Atualiza aeronave
- DELETE `/api/aircrafts/:id` - Remove aeronave

#### Voos
- GET `/api/flights` - Lista todos os voos
- GET `/api/flights/:id` - Busca voo por ID
- POST `/api/flights` - Cria novo voo
- PUT `/api/flights/:id` - Atualiza voo
- DELETE `/api/flights/:id` - Remove voo

#### Passageiros
- GET `/api/passengers` - Lista todos os passageiros
- GET `/api/passengers/:id` - Busca passageiro por ID
- POST `/api/passengers` - Cria novo passageiro
- PUT `/api/passengers/:id` - Atualiza passageiro
- DELETE `/api/passengers/:id` - Remove passageiro

#### Cartões de Embarque
- GET `/api/boarding-passes` - Lista todos os cartões
- GET `/api/boarding-passes/:id` - Busca cartão por ID
- POST `/api/boarding-passes` - Cria novo cartão
- PUT `/api/boarding-passes/:id` - Atualiza cartão
- DELETE `/api/boarding-passes/:id` - Remove cartão

## Segurança

1. **Autenticação**
   - Utiliza JWT (JSON Web Tokens)
   - Tokens expiram em 1 hora
   - Todas as rotas (exceto login e criar usuário) são protegidas

2. **Senhas**
   - Criptografadas com bcrypt
   - Salt rounds: 10
   - Nunca são retornadas nas respostas da API

3. **Validações**
   - Campos obrigatórios são verificados
   - Formatos de email são validados
   - IDs são validados antes das operações

## Como Testar

1. **Postman ou Similar**
   - Importe a coleção de endpoints
   - Configure as variáveis de ambiente
   - Use o token JWT retornado no login

2. **Fluxo de Teste**
   ```
   1. Criar usuário
   2. Fazer login e obter token
   3. Usar token nas demais requisições
   ```

## Boas Práticas Implementadas

1. **Organização do Código**
   - Separação em camadas (MVC)
   - Middlewares para lógica comum
   - Rotas agrupadas por domínio

2. **Tratamento de Erros**
   - Respostas de erro padronizadas
   - Logs de erro no console
   - Status HTTP apropriados

3. **Segurança**
   - Senhas criptografadas
   - Autenticação JWT
   - Validação de dados

4. **Banco de Dados**
   - Uso de ORM (Sequelize)
   - Relacionamentos definidos
   - Índices nas chaves 