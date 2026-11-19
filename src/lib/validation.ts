import { z } from "zod";

export const createPaymentSchema = z.object({
  user_email: z
    .string({ required_error: "user_email is required" })
    .email("user_email must be a valid email address"),
  amount: z
    .number({ required_error: "amount is required", invalid_type_error: "amount must be a number" })
    .positive("amount must be greater than 0"),
  service_to_pay_id: z
    .string({ required_error: "service_to_pay_id is required" })
    .min(1, "service_to_pay_id must not be empty"),
});

export const queryPaymentsSchema = z.object({
  user_email: z
    .string({ required_error: "user_email query parameter is required" })
    .email("user_email must be a valid email address"),
});
