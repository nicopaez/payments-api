CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  user_email TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  service_to_pay_id TEXT NOT NULL,
  payment_date TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payments_user_email ON payments (user_email);
