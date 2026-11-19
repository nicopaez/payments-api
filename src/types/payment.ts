export interface Payment {
  id: string;
  user_email: string;
  amount: number;
  service_to_pay_id: string;
  payment_date: string;
}

export interface CreatePaymentInput {
  user_email: string;
  amount: number;
  service_to_pay_id: string;
}
