import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createPayment, findPaymentsByEmail } from "@/lib/store";
import { createPaymentSchema, queryPaymentsSchema } from "@/lib/validation";
import { Payment } from "@/types/payment";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = createPaymentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const payment: Payment = {
    id: randomUUID(),
    user_email: parsed.data.user_email.trim().toLowerCase(),
    amount: parsed.data.amount,
    service_to_pay_id: parsed.data.service_to_pay_id,
    payment_date: new Date().toISOString(),
  };

  createPayment(payment);

  return NextResponse.json(payment, { status: 201 });
}

export async function GET(request: NextRequest) {
  const userEmail = request.nextUrl.searchParams.get("user_email");

  const parsed = queryPaymentsSchema.safeParse({ user_email: userEmail });

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const payments = findPaymentsByEmail(parsed.data.user_email).sort(
    (a, b) =>
      new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime()
  );

  return NextResponse.json({
    payments,
    count: payments.length,
  });
}
