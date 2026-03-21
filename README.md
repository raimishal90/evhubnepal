# EVHubNepal

EVHubNepal is an online platform designed to make information about electric vehicles (EVs) easily accessible to everyone in Nepal. Whether you are looking to buy, sell, or learn more about EVs, charging stations, or the latest news, EVHubNepal brings everything together in one place. The platform features a user-friendly website and a powerful backend to help users explore EV options, find charging locations, and connect with the EV community.

This repository contains the full source code for both the website (frontend) and the server (backend) that power EVHubNepal.

## Caution

admin user must be present in database with id 1 to function user db operation

## Project Structure

- `api/` - Backend service (NestJS, PostgreSQL, Prisma)
- `web/` - Frontend application (Next.js, React, Tailwind CSS)

---

## Prerequisites

- **Node.js**: v18+ (check with `node -v`)
- **npm**: v8+ (check with `npm -v`)

## Main Tech Stack

- **Backend (API)**
  - NestJS: ^11.0.1
  - Prisma: ^6.12.0
  - PostgreSQL (Neon - cloud hosted)
- **Frontend (Web)**
  - Next.js: ^15.5.6
  - React: ^19
  - Tailwind CSS: ^3.4.17
  - TypeScript: ^5

---

## How to Run the Application

### 1. Clone the Repository

```bash
git clone https://github.com/raimishal90/evhubnepal.git
cd evhubnepal
```

### 2. Setup Environment Variables

Create a `.env` file inside the `api/` directory with the following variables:

```env
DATABASE_URL=<your-postgresql-connection-string>
JWT_SECRET=<your-jwt-secret>
SIGNIN_EXPIRE_TIME=<token-expiry-time>
PWD_SECRET=<your-password-secret>
PORT=3001
```

> The project uses a cloud-hosted PostgreSQL database (Neon). No local Docker setup is required for the database.

### 3. Install Dependencies

#### Backend (API)

```bash
cd api
npm install
```

#### Frontend (Web)

```bash
cd ../web
npm install
```

### 4. Setup Database (Prisma)

Run Prisma migrations to set up the database schema:

```bash
cd ../api
npx prisma migrate dev
```

To seed the database (if seed file exists):

```bash
npx prisma db seed
```

To view the database in a browser UI:

```bash
npx prisma studio
```

### 5. Run the Applications

You need to run both the API and the web app in **separate terminals**.

#### Terminal 1 - Backend (API)

```bash
cd api
npm run start:dev
```

The API will start on **http://localhost:3001** (or the PORT defined in `.env`).

#### Terminal 2 - Frontend (Web)

```bash
cd web
npm run dev
```

The web app will start on **http://localhost:3000**.

### 6. Access the Application

- **Web App**: http://localhost:3000
- **API Server**: http://localhost:3001

---

## Useful Commands

| Command | Directory | Description |
| --- | --- | --- |
| `npm run start:dev` | `api/` | Start API in development mode (watch) |
| `npm run dev` | `web/` | Start web app in development mode |
| `npm run build` | `api/` | Build the API for production |
| `npm run build` | `web/` | Build the web app for production |
| `npm run start:prod` | `api/` | Run the API in production mode |
| `npm run start` | `web/` | Run the web app in production mode |
| `npx prisma studio` | `api/` | Open Prisma database browser UI |
| `npx prisma migrate dev` | `api/` | Run database migrations |
| `npm run lint` | `api/` or `web/` | Run linter |
| `npm test` | `api/` | Run API tests |

---

## License

[MIT](LICENSE)
