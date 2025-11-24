# MiniProj2-Back — ANIMALEC (API)

![Express](https://img.shields.io/badge/Express-4.21-black?logo=express) ![MongoDB](https://img.shields.io/badge/MongoDB-Local%20%3A%2027017-green?logo=mongodb) ![JWT](https://img.shields.io/badge/Auth-JWT%20%2B%20Basic-orange) ![Status](https://img.shields.io/badge/Status-Listening%20on%208080-blue)

API do projeto ANIMALEC, alinhada com o livro “Desenvolvimento Avançado para a Web”. Sem dados hardcoded — toda a informação é persistida em MongoDB.

## Requisitos
- Node.js ≥ 18
- MongoDB local (`mongodb://localhost:27017`)

## Configuração
- `.env`:
```
MONGO_URI=mongodb://localhost:27017/local
JWT_SECRET=dev-secret
```

## Execução
```bash
npm install
npm run seed   # cria admin/admin e dados base
npm start      # Your app is listening on 8080
```
- Aceda a `http://localhost:8080/` (ANIMALEC API)

## Collections
- `users_animalec` — utilizadores (autenticação)
- `animals_animalec` — animais
- `expert_animalec` — especialistas
- `sponsor_animalec` — patrocinadores

## Endpoints
- `GET /auth` — Autenticação via HTTP Basic
  - Header: `Authorization: Basic <base64(username:password)>`
  - Resposta: `{ token: "Bearer ...", user: { id, name, username } }`
- `POST /auth` — Autenticação via body JSON
  - Body: `{ "username":"admin", "password":"admin" }`
  - Resposta: igual ao GET
- `POST /register` — Criar utilizador
  - Body: `{ username, name, password }`
  - Resposta: `{ id, username, name }`
- `GET /animals` — Listar animais (requer `Authorization: Bearer <token>`) 
- `GET /experts` — Listar experts (requer Bearer)
- `POST /experts` — Criar expert `{ name, field, email }` (requer Bearer)
- `GET /sponsors` — Listar sponsors (requer Bearer)
- `POST /sponsors` — Criar sponsor `{ name, contribution, contact }` (requer Bearer)

## Exemplos (Livro/Animalec)
- Autenticar (POST):
```http
POST /auth
Content-Type: application/json

{ "username": "admin", "password": "admin" }
```
- Autenticar (Basic):
```http
GET /auth
Authorization: Basic YWRtaW46YWRtaW4=
```
- Listar com token:
```http
GET /animals
Authorization: Bearer <token>
```
- Criar expert:
```http
POST /experts
Authorization: Bearer <token>
Content-Type: application/json

{ "name": "Dr. Ana", "field": "Mamíferos", "email": "ana@example.com" }
```

## Notas
- Passwords armazenadas com `bcrypt` (hash). 
- Tokens JWT expiram em 2h.
- Porta padrão: `8080`.

---
![Modern](https://img.shields.io/badge/Design-Modern-ff69b4) ![No%20Hardcode](https://img.shields.io/badge/Data-No%20Hardcode-success) ![Seed](https://img.shields.io/badge/Seed-admin%2Fadmin-brightgreen)
