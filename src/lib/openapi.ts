export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Payments API",
    description:
      "RESTful API to register payments and query payments by user email.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/",
      description: "Current environment",
    },
  ],
  paths: {
    "/payments": {
      post: {
        tags: ["Payments"],
        summary: "Register a payment",
        description:
          "Creates a new payment for a user. The payment date is set automatically by the server.",
        operationId: "createPayment",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreatePaymentRequest",
              },
              examples: {
                sample: {
                  value: {
                    user_email: "jane@example.com",
                    amount: 49.99,
                    service_to_pay_id: "svc_streaming_001",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Payment created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Payment",
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Payments"],
        summary: "Query payments by user email",
        description:
          "Returns all payments performed by the specified user, ordered by payment date (newest first).",
        operationId: "listPayments",
        parameters: [
          {
            name: "user_email",
            in: "query",
            required: true,
            description: "Email of the user whose payments should be returned",
            schema: {
              type: "string",
              format: "email",
              example: "jane@example.com",
            },
          },
        ],
        responses: {
          "200": {
            description: "List of payments for the user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    payments: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Payment",
                      },
                    },
                    count: {
                      type: "integer",
                      example: 1,
                    },
                  },
                  required: ["payments", "count"],
                },
              },
            },
          },
          "400": {
            description: "Missing or invalid user_email query parameter",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/openapi.json": {
      get: {
        tags: ["Documentation"],
        summary: "OpenAPI specification",
        description: "Returns the OpenAPI 3.0 specification as JSON.",
        operationId: "getOpenApiSpec",
        responses: {
          "200": {
            description: "OpenAPI document",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreatePaymentRequest: {
        type: "object",
        required: ["user_email", "amount", "service_to_pay_id"],
        properties: {
          user_email: {
            type: "string",
            format: "email",
            example: "jane@example.com",
          },
          amount: {
            type: "number",
            exclusiveMinimum: 0,
            example: 49.99,
          },
          service_to_pay_id: {
            type: "string",
            minLength: 1,
            example: "svc_streaming_001",
          },
        },
      },
      Payment: {
        type: "object",
        required: [
          "id",
          "user_email",
          "amount",
          "service_to_pay_id",
          "payment_date",
        ],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
          user_email: {
            type: "string",
            format: "email",
            example: "jane@example.com",
          },
          amount: {
            type: "number",
            example: 49.99,
          },
          service_to_pay_id: {
            type: "string",
            example: "svc_streaming_001",
          },
          payment_date: {
            type: "string",
            format: "date-time",
            description: "ISO 8601 timestamp when the payment was registered",
            example: "2026-11-19T22:15:00.000Z",
          },
        },
      },
      Error: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "string",
            example: "Validation failed",
          },
          details: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
} as const;
