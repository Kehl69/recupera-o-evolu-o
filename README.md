# TaskFlow — API REST com Node.js, Express e MongoDB

Aplicação gerenciadora de tarefas seguindo a arquitetura **MVC** com persistência real no **MongoDB**.

---

## 🗂️ Estrutura do Projeto

```
projeto-mvc/
├── src/
│   ├── app.js                  # Ponto de entrada — configura Express e sobe o servidor
│   ├── config/
│   │   └── database.js         # Conexão com o MongoDB via Mongoose
│   ├── models/
│   │   └── Tarefa.js           # Schema Mongoose (Model)
│   ├── controllers/
│   │   └── tarefaController.js # Lógica de cada operação CRUD (Controller)
│   ├── routes/
│   │   └── tarefaRoutes.js     # Mapeamento de rotas HTTP (Route)
│   └── middlewares/
│       ├── logger.js           # Loga cada requisição recebida
│       └── validacao.js        # Valida campos obrigatórios no body
└── public/                     # Frontend estático servido pelo Express
    ├── index.html
    ├── css/style.css
    └── js/app.js
```

---

## ⚙️ Instalação e Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
```
Edite o `.env` e coloque sua **MongoDB URI**:
```
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/taskflow
PORT=3000
```

> **MongoDB Atlas (gratuito):** acesse [mongodb.com/atlas](https://www.mongodb.com/atlas) e crie um cluster free tier.

### 3. Rodar a aplicação
```bash
# Produção
npm start

# Desenvolvimento (com hot reload)
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🔌 Endpoints da API

| Método | Rota               | Descrição              | Status Code |
|--------|--------------------|------------------------|-------------|
| GET    | /api/tarefas       | Lista todas as tarefas | 200         |
| GET    | /api/tarefas/:id   | Busca uma tarefa       | 200 / 404   |
| POST   | /api/tarefas       | Cria nova tarefa       | 201 / 400   |
| PUT    | /api/tarefas/:id   | Atualiza uma tarefa    | 200 / 404   |
| DELETE | /api/tarefas/:id   | Remove uma tarefa      | 200 / 404   |

### Exemplo de body para POST/PUT:
```json
{
  "titulo": "Estudar Mongoose",
  "descricao": "Entender schemas, models e queries",
  "prioridade": "alta"
}
```

---

## 🏗️ Fluxo de uma Requisição

```
Cliente (Frontend / Postman)
        ↓
   Express Router  (routes/tarefaRoutes.js)
        ↓
   Middleware      (logger → validacao)
        ↓
   Controller      (tarefaController.js)
        ↓
   Model/Mongoose  (Tarefa.js → MongoDB)
        ↓
   Resposta JSON com status code adequado
```

---

## 🛡️ Segurança e Boas Práticas

- ✅ **Dotenv** — credenciais nunca vão para o código
- ✅ **.gitignore** — `.env` e `node_modules/` ignorados
- ✅ **try/catch** — todas as operações assíncronas tratadas
- ✅ **Status codes** corretos em todas as rotas
- ✅ **Validação** de campos obrigatórios via middleware

---

## 📦 Dependências

| Pacote     | Função                              |
|------------|-------------------------------------|
| express    | Framework HTTP                      |
| mongoose   | ODM para MongoDB                    |
| dotenv     | Carrega variáveis de ambiente       |
| nodemon    | Hot reload em desenvolvimento       |
