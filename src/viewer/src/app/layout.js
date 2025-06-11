import { Geist, Geist_Mono, Archivo_Black } from "next/font/google";
import Header from "./Components/Header/Header";
import "./globals.css";
import { Toaster } from "sonner";

import Footer from "./Components/Footer/Footer";
import SplashScreen from "./Components/SplashScreen/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export const metadata = {
  title: "V-MAP",
  description: "Sistema de Gestão de Transporte Escolar",
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable}`}> 


        <SplashScreen>

          <main className="flex-1">{children}</main>
        

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
        <Footer/>

          </SplashScreen>
      </body>
    </html>
  );
}