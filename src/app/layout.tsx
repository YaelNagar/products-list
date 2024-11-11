"use client";
import NavBar from "./components/NavBar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
