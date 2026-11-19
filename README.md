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
- **swagger-ui-react** — OpenAPI / Swagger docs

## Quick start

```bash
npm install
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
4. Deploy — no extra env vars required for the default in-memory store.

`vercel.json` sets the framework to Next.js and a default region (`iad1`). Adjust the region if needed.

## Storage note

Payments are stored in memory for simplicity. On Vercel serverless, data lives only while an instance stays warm and is not shared across instances. For production, replace `src/lib/store.ts` with a durable backend (Vercel Postgres, Neon, Upstash Redis, etc.).

## Project structure

```
src/
  app/
    payments/route.ts   # POST & GET /payments
    openapi.json/route.ts
    docs/page.tsx       # Swagger UI
    page.tsx            # Landing page
  components/
    SwaggerUI.tsx
  lib/
    store.ts
    validation.ts
    openapi.ts
  types/
    payment.ts
```
