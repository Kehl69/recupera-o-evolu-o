
# 🚀 TaskFlow API MVC

API REST desenvolvida com Node.js, Express e MongoDB seguindo o padrão MVC.
Permite criar, listar, atualizar e excluir tarefas com persistência real em banco de dados.
Projeto acadêmico focado em arquitetura de software, documentação e boas práticas.

![Node.js](https://img.shields.io/badge/Node.js-20-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-success)
 
## Tela de Login

![Tela de login](<public/img/Captura de tela 2026-06-18 113007.png>)

## Gerenciamento de produtos

![Tela de Gerenciamento de produtos](<public/img/Captura de tela 2026-06-18 113135.png>)

## 🛠 Stack Tecnológica

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Nodemon

## 📂 Estrutura

```text
src/
├── config/database.js
├── controllers/tarefaController.js
├── models/Tarefa.js
├── routes/tarefaRoutes.js
├── middlewares/
```

## ⚙️ Instalação

```bash
git clone URL_DO_REPOSITORIO
cd recupera-o-evolu-o-main
npm install
```

## ▶️ Executando

```bash
npm run dev
```

ou

```bash
npm start
```

## 🔐 Variáveis de Ambiente

Crie um arquivo .env na raiz:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/taskflow
JWT_SECRET=sua_chave_secreta
```

## 📡 Principais Rotas

- GET /api/tarefas
- GET /api/tarefas/:id
- POST /api/tarefas
- PUT /api/tarefas/:id
- DELETE /api/tarefas/:id

## 👨‍💻 Fluxo MVC

Rota → Middleware → Controller → Model → MongoDB → Resposta HTTP
