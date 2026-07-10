import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Lora } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap"
});

const sans = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const signature = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Andra | Livros Digitais",
  description:
    "Vitrine editorial de livros digitais cristãos, reflexivos e devocionais."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${serif.variable} ${sans.variable} ${signature.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
