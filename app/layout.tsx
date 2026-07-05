import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pendulum Calculator",
  description: "A simple pendulum Calculator - will be updated soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
