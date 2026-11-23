# Payments API

RESTful payments API built with Next.js, designed for deployment on [Vercel](https://vercel.com).

## Features

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/payments` | Register a payment (`user_email`, `amount`, `service_to_pay_id`). The server records `payment_date`. |
| `GET` | `/payments?user_email=` | List payments performed by the specified user. |

Interactive documentation is available at `/docs` (Swagger UI). The OpenAPI 3.0 spec is served at `/openapi.json`.

## Stack

- **Next.js 15** (App Router) — Vercel-native serverless routes
- **TypeScript** + **Zod** — typed validation
- **PostgreSQL** (via `pg`) — durable storage
- **swagger-ui-react** — OpenAPI / Swagger docs

## Quick start

```bash
npm install
cp .env.example .env     # defaults match docker-compose.yml
docker compose up -d     # start a local Postgres instance
npm run db:migrate       # create the payments table
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Docs: [http://localhost:3000/docs](http://localhost:3000/docs).

## Example requests

### Create a payment

```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{
    "user_email": "jane@example.com",
    "amount": 49.99,
    "service_to_pay_id": "svc_streaming_001"
  }'
```

### Query payments

```bash
curl "http://localhost:3000/payments?user_email=jane@example.com"
```

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts, then promote to production with `vercel --prod`.

### Option B — GitHub integration

1. Push this repo to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Set the `DATABASE_URL` environment variable (e.g. a Vercel Postgres / Neon connection string).
5. Run `npm run db:migrate` against that database (locally, or as part of your deploy step) before serving traffic.
6. Deploy.

`vercel.json` sets the framework to Next.js and a default region (`iad1`). Adjust the region if needed.

## Storage

Payments are stored in PostgreSQL. The connection pool lives in `src/lib/db.ts` and reads `DATABASE_URL` (see `.env.example`). Schema changes live under `migrations/` as plain SQL files; apply them with `npm run db:migrate`, which tracks what's already applied in a `schema_migrations` table.

`docker-compose.yml` runs a local Postgres 16 instance for development (`docker compose up -d`, `docker compose down` to stop it, add `-v` to also drop its data volume). Set `PGSSL=false` when connecting to a local/non-TLS Postgres instance — this is the `.env.example` default.

## Project structure

```
docker-compose.yml       # local Postgres for development
migrations/
  0001_create_payments.sql
scripts/
  migrate.mjs            # applies migrations/*.sql in order
src/
  app/
    payments/route.ts    # POST & GET /payments
    openapi.json/route.ts
    docs/page.tsx         # Swagger UI
    page.tsx              # Landing page
  components/
    SwaggerUI.tsx
  lib/
    db.ts                 # pg connection pool
    store.ts              # Postgres-backed payment queries
    validation.ts
    openapi.ts
  types/
    payment.ts
```
