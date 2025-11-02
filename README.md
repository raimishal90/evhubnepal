# EVHubNepal

EVHubNepal is an online platform designed to make information about electric vehicles (EVs) easily accessible to everyone in Nepal. Whether you are looking to buy, sell, or learn more about EVs, charging stations, or the latest news, EVHubNepal brings everything together in one place. The platform features a user-friendly website and a powerful backend to help users explore EV options, find charging locations, and connect with the EV community.

This repository contains the full source code for both the website (frontend) and the server (backend) that power EVHubNepal.

## Caution

admin user most be present in database with id 1 to function user db operation

## Project Structure

- `api/` - Backend service (NestJS, PostgreSQL, Prisma)
- `web/` - Frontend application (Next.js, React, Tailwind CSS)

---

## Prerequisites (Versions Used)

- **Node.js**: v18+ (recommended)
- **pnpm**: v8+ (preferred) or npm/yarn
- **Docker & Docker Compose**: Latest

## Main Tech Stack & Versions

- **Backend (API)**
  - NestJS: ^11.0.1
  - Prisma: ^6.12.0
  - PostgreSQL: Official Docker image (default: latest)
- **Frontend (Web)**
  - Next.js: 15.2.4
  - React: ^19
  - Tailwind CSS: ^3.4.17
  - TypeScript: ^5

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/evhubnepal-com/evhubnepal.git
cd evhubnepal
```

### 2. Install Dependencies

#### Backend (API)

```bash
cd api
pnpm install
# Node version: v18+ (check with `node -v`)
# pnpm version: v8+ (check with `pnpm -v`)
```

#### Frontend (Web)

```bash
cd ../web
pnpm install
# Node version: v18+ (check with `node -v`)
# pnpm version: v8+ (check with `pnpm -v`)
```

### 3. Setup and Run PostgreSQL (Docker)

```bash
cd ../api
docker-compose up -d
```

### 4. Setup Database (Prisma)

```bash
cd api
pnpm prisma migrate dev
```

### 5. Run the Applications

#### Backend (API)

```bash
cd api
pnpm start:dev
```

#### Frontend (Web)

```bash
cd web
pnpm dev
```

---

## Additional Notes

- Environment variables may be required. See `.env.example` in each app (if present).
- For more details, see the `README.md` files in `api/` and `web/`.

---

## License

[MIT](LICENSE)
