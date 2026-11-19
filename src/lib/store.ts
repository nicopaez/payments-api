import { Payment } from "@/types/payment";

/**
 * In-memory payment store.
 *
 * On Vercel serverless, each instance has its own memory. Data persists within
 * a warm instance but is not shared across instances and is lost on cold starts.
 * Swap this module for a durable store (e.g. Vercel Postgres / Neon / Redis)
 * before using in production.
 */
const globalForStore = globalThis as unknown as {
  paymentsStore?: Payment[];
};

const payments: Payment[] = globalForStore.paymentsStore ?? [];

if (process.env.NODE_ENV !== "production") {
  globalForStore.paymentsStore = payments;
}

export function createPayment(payment: Payment): Payment {
  payments.push(payment);
  return payment;
}

export function findPaymentsByEmail(userEmail: string): Payment[] {
  const normalized = userEmail.trim().toLowerCase();
  return payments.filter((p) => p.user_email.toLowerCase() === normalized);
}

export function getAllPayments(): Payment[] {
  return [...payments];
}
