# EVHubNepal API

Backend service for EVHubNepal built with NestJS, Prisma, and PostgreSQL.

## Prerequisites

- **Node.js**: v18+
- **npm**: v8+

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in this directory with the following variables:

```env
DATABASE_URL=<your-postgresql-connection-string>
JWT_SECRET=<your-jwt-secret>
SIGNIN_EXPIRE_TIME=<token-expiry-time>
PWD_SECRET=<your-password-secret>
PORT=3001
```

> The project uses a cloud-hosted PostgreSQL database (Neon). No local Docker setup is required.

### 3. Database Setup (Prisma)

```bash
npx prisma migrate dev    # Run migrations
npx prisma db seed        # Seed the database (if seed file exists)
npx prisma studio         # Open database browser UI
```

## Running the API

```bash
npm run start:dev         # Development mode (watch)
npm run start:prod        # Production mode (requires build first)
npm run build             # Build for production
```

The API runs on **http://localhost:3001** by default.

## Testing

```bash
npm test                  # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run test:e2e          # Run end-to-end tests
```

## Useful Notes

- **DTO (Data Transfer Object)**: Used for request validation and data shaping.
- **Argon2**: Used for hashing refresh tokens (preferred over bcrypt due to its 72-byte limit).
- **Config Service**: Environment variables are accessed via `@nestjs/config` using `ConfigService.get<string>('KEY')`.
