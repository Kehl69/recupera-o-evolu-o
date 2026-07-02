# Loja API — Migração NoSQL → MySQL

API REST em Node.js + Express, migrada de MongoDB para **MySQL** (driver `mysql2`, com Prepared Statements em todas as queries) e com autenticação por **token (JWT)**.

## 1. Estrutura

```
├── src/
│   ├── config/database.js        → Pool de conexão MySQL (mysql2/promise)
│   ├── controllers/              → authController, categoriaController, produtoController,
│   │                                clienteController, pedidoController
│   ├── models/                   → categoriaModel, produtoModel, clienteModel, pedidoModel,
│   │                                usuarioModel (todas as queries usam "?")
│   ├── middlewares/auth.js       → Valida token JWT + cabeçalho x-user-id
│   ├── routes/                   → apiRoutes, authRoutes, categoriaRoutes, produtosRoutes,
│   │                                clientesRoutes, pedidosRoutes
│   ├── scripts/criarUsuario.js   → Cria um usuário de teste com senha bcrypt
│   └── database/loja.sql         → Script da base "loja" (fornecido pelo professor)
└── .env.example
```

## 2. Como rodar

```bash
npm install
cp .env.example .env   # edite com as credenciais do seu MySQL
```

Crie o banco e rode o script:

```bash
mysql -u root -p -e "CREATE DATABASE loja;"
mysql -u root -p loja < src/database/loja.sql
# opcional: dados de exemplo (categorias, produtos, clientes, pedidos)
mysql -u root -p loja < src/database/loja_seed_dados_exemplo.sql
```

Suba o servidor:

```bash
npm run dev      # com nodemon
# ou
npm start
```

## 3. Autenticação

A base de exemplo já vem com um usuário (`candido`) cuja senha está em hash **MD5 legado** (não temos o texto puro). Para testar, crie um usuário novo com senha conhecida:

```bash
node src/scripts/criarUsuario.js "Seu Nome" "seunick" "suasenha"
```

Depois faça login:

```
POST /api/login
Content-Type: application/json

{ "nick": "seunick", "senha": "suasenha" }
```

Resposta: `{ "token": "...", "id_usuario": 2, ... }`

## 4. Usando o CRUD protegido

Toda rota de `/api/categorias`, `/api/produtos`, `/api/clientes` e `/api/pedidos` **exige
os dois cabeçalhos abaixo ao mesmo tempo**:

```
Authorization: Bearer <token>
x-user-id: <id_usuario>
```

- Sem token → **401**
- Sem `x-user-id` → **401**
- Token válido mas `x-user-id` não bate com o ID dentro do token → **403**

## 5. Rota pública (sem autenticação)

```
GET /api/status
GET /api/versao
```

Retorna: `{ "versao": "2.0.0", "status": "online", ... }`

## 6. Endpoints do CRUD

Cada entidade (`categorias`, `produtos`, `clientes`, `pedidos`) expõe:

```
GET    /api/<entidade>          listar todos
GET    /api/<entidade>/:id      buscar um
POST   /api/<entidade>          criar
PUT    /api/<entidade>/:id      atualizar
DELETE /api/<entidade>/:id      remover
```

`POST /api/pedidos` aceita itens do pedido em uma transação:

```json
{
  "data": "2026-06-30",
  "clientes_id_cliente": 1,
  "itens": [
    { "produtos_id_produto": 6, "quantidade": 1, "valor": 736 }
  ]
}
```

---
Esta API foi testada localmente de ponta a ponta (login, bloqueio 401/403, CRUD completo
nas 4 entidades, e persistência confirmada diretamente no MySQL) antes da entrega.
