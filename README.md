# AcaiWavePlus Backend

Backend Node.js para gerenciamento de usuários e perfis, utilizando Firebase Firestore e autenticação via Firebase Admin SDK.

## Estrutura do Projeto

```
src/
  app.ts
  server.ts
  config/
    firebaseAdmin.ts
  controllers/
    profile.controller.ts
    user.controller.ts
  middlewares/
    authenticate.middleware.ts
  models/
    ProfileModel.ts
    UserModel.ts
  repository/
    profile.repository.ts
    user.repository.ts
  routes/
    routes.ts
```

## Principais Tecnologias

- Node.js
- Express
- TypeScript
- Firebase Admin SDK (Firestore & Auth)
- Docker

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/acaiwaveplus-backend.git
   cd acaiwaveplus-backend
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure o arquivo `.env` com suas variáveis do Firebase.

4. Adicione o arquivo `firebase-admin-sdk.json` com suas credenciais do Firebase.

## Scripts

- `npm run dev` — Executa o servidor em modo desenvolvimento.
- `npm run build` — Compila o TypeScript para JavaScript.
- `npm start` — Inicia o servidor em produção (após build).

## Docker

Para rodar com Docker:

```sh
docker-compose up --build
```

## Endpoints

- `GET /user` — Retorna dados do usuário autenticado.
- `GET /profiles` — Lista perfis do usuário.
- `GET /profiles/:profileId` — Detalhes de um perfil.
- `GET /profiles/:profileId/watchlist` — Watchlist do perfil.
- `PATCH /profiles/:profileId/watchlist` — Atualiza watchlist.
- `POST /profiles` — Cria novo perfil.
- `PATCH /profiles/:profileId` — Atualiza perfil.
- `DELETE /profiles/:profileId` — Remove perfil.

## Autenticação

Todos os endpoints requerem autenticação via Firebase (Bearer Token no header `Authorization`).

## Contribuição

Pull requests são bem-vindos! Para grandes mudanças, abra uma issue primeiro para discutir o que deseja modificar.

## Licença
