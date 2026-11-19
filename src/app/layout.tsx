import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments API",
  description: "RESTful payments API with OpenAPI documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
