import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bull City Run Club",
  description: "Sign in and Sign Up for Bull City Run Club",
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
