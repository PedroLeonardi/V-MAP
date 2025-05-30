"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/SidebarAdm";
import Footer from "./Components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       {children}
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "#1f2937", // bg-gray-800
              color: "#fff",
              border: "1px solid #3b82f6",
              borderRadius: "0.5rem",
            },
            className: "font-sans text-sm",
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
