import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "3rem 1.5rem",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ marginBottom: "0.5rem" }}>Payments API</h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        RESTful API to register and query payments. Interactive docs are
        available via Swagger UI.
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.1rem" }}>Endpoints</h2>
        <ul>
          <li>
            <code>POST /payments</code> — register a payment
          </li>
          <li>
            <code>GET /payments?user_email=...</code> — list payments for a user
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1.1rem" }}>Documentation</h2>
        <ul>
          <li>
            <Link href="/docs">Swagger UI</Link>
          </li>
          <li>
            <Link href="/openapi.json">OpenAPI JSON</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
