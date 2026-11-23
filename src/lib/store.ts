import { Payment } from "@/types/payment";
import { pool } from "@/lib/db";

interface PaymentRow {
  id: string;
  user_email: string;
  amount: string;
  service_to_pay_id: string;
  payment_date: Date;
}

function toPayment(row: PaymentRow): Payment {
  return {
    id: row.id,
    user_email: row.user_email,
    amount: Number(row.amount),
    service_to_pay_id: row.service_to_pay_id,
    payment_date: row.payment_date.toISOString(),
  };
}

export async function createPayment(payment: Payment): Promise<Payment> {
  const { rows } = await pool.query<PaymentRow>(
    `INSERT INTO payments (id, user_email, amount, service_to_pay_id, payment_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_email, amount, service_to_pay_id, payment_date`,
    [
      payment.id,
      payment.user_email,
      payment.amount,
      payment.service_to_pay_id,
      payment.payment_date,
    ]
  );

  return toPayment(rows[0]);
}

export async function findPaymentsByEmail(
  userEmail: string
): Promise<Payment[]> {
  const normalized = userEmail.trim().toLowerCase();
  const { rows } = await pool.query<PaymentRow>(
    `SELECT id, user_email, amount, service_to_pay_id, payment_date
     FROM payments
     WHERE user_email = $1`,
    [normalized]
  );

  return rows.map(toPayment);
}

export async function getAllPayments(): Promise<Payment[]> {
  const { rows } = await pool.query<PaymentRow>(
    `SELECT id, user_email, amount, service_to_pay_id, payment_date
     FROM payments`
  );

  return rows.map(toPayment);
}
