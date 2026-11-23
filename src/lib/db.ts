import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  pgPool?: Pool;
};

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  return new Pool({
    connectionString,
    ssl:
      process.env.PGSSL === "false"
        ? false
        : { rejectUnauthorized: false },
  });
}

export const pool = globalForDb.pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = pool;
}
