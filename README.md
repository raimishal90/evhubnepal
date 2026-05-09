# EVHubNepal

EVHubNepal is a full-stack platform focused on electric vehicles in Nepal.
It includes:
- A **frontend web app** for browsing EVs, charging stations, and EV-related content.
- A **backend API** for authentication, vehicles, categories, media, and related data operations.

## Repository Structure

- `web/` – Next.js frontend (React + Tailwind CSS)
- `api/` – NestJS backend (Prisma + PostgreSQL)
- `Requirement.md` – high-level product requirements
- `Reference.md` – reference site link

## Tech Stack

### Frontend (`web`)
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

### Backend (`api`)
- NestJS 11
- Prisma ORM
- PostgreSQL
- JWT authentication

## Prerequisites

- Node.js 18+
- npm 8+
- PostgreSQL connection string (for API)

## Quick Start

### 1) Clone the repository

```bash
git clone https://github.com/raimishal90/evhubnepal.git
cd evhubnepal
```

### 2) Configure environment variables

Create `api/.env`:

```env
DATABASE_URL=<your-postgresql-connection-string>
JWT_SECRET=<your-jwt-secret>
SIGNIN_EXPIRE_TIME=<token-expiry-time>
PWD_SECRET=<your-password-secret>
PORT=3001
```

Optional frontend environment variables (in `web/.env.local` if needed):

```env
CUSTOM_KEY=<optional>
ANALYZE=false
```

> Note: frontend API base URL is currently hardcoded in `web/lib/config.ts` as `http://localhost:3001`.

### 3) Install dependencies

```bash
cd api
npm install

cd ../web
npm install
```

If frontend install fails due peer dependency conflict (React 19 vs `react-day-picker`), use:

```bash
npm install --legacy-peer-deps
```

### 4) Prepare database (API)

```bash
cd api
npx prisma migrate dev
npx prisma db seed
```

Open Prisma Studio (optional):

```bash
npx prisma studio
```

### 5) Run the apps (in separate terminals)

Terminal A (API):

```bash
cd api
npm run start:dev
```

Terminal B (Web):

```bash
cd web
npm run dev
```

## Access URLs

- Web: `http://localhost:3000`
- API: `http://localhost:3001`

## Available Scripts

### API (`api/package.json`)

- `npm run start:dev` – run API in watch mode
- `npm run build` – build API
- `npm run start:prod` – run built API
- `npm run lint` – run eslint (auto-fix enabled)
- `npm test` – run unit tests
- `npm run test:e2e` – run end-to-end tests

### Web (`web/package.json`)

- `npm run dev` – run Next.js dev server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – run Next.js lint

## Project Notes

- The system expects an admin user with **ID = 1** for some user DB operations.
- Additional module-level docs are available:
  - `api/README.md`
  - `web/README.md`
  - `web/API_INTEGRATION_README.md`
  - `web/AXIOS_SETUP_README.md`
  - `web/AUTH_ERROR_HANDLING_README.md`

## Troubleshooting

- If API lint fails, it may be due to existing strict TypeScript ESLint issues in the current codebase.
- If `npm test` in API reports "No tests found", verify expected `*.spec.ts` files exist under `api/src`.
- If frontend build/lint fails after dependency installation issues, reinstall with `--legacy-peer-deps`.
