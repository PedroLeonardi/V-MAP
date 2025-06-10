import { Geist, Geist_Mono, Archivo_Black } from "next/font/google";
import Header from "./Components/Header/Header";
import "./globals.css";
import { Toaster } from "sonner";
// import Header from "./Components/Header/Header";
// import Sidebar from "./Components/Sidebar/SidebarAdm";
import Footer from "./Components/Footer/Footer";
// import SplashScreen from "./Components/SplashScreen/SplashScreen";

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

// export default function RootLayout({ children }) {
//   return (
//     <html lang="pt-br">
//       <body className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable}`}>
//         <div className="flex flex-col min-h-screen">
//           {/* <Header /> */}
//           <main className="flex-grow">
//             {children}
//           </main>
export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable}`}> 

        {/* 
          estrutura diferente de layout para poder encaixar meus toast, 
          header e sidebar...
        */}


        {/* header para telas pequenas */}
        {/* <div className="block lg:hidden">
          <Header />
        </div> */}

        {/* estrutura sidebar em telas grandes */}
        {/* <div className="flex"> */}
          {/* visivel apenas para telas grandes*/}
          {/* <div className="hidden lg:block">
            <Sidebar />
          </div> */}

          {/* conteudo principal */}
          {/*Comentei por enquanto porque no meu pc estava ficando meio pesado */}
        {/* <SplashScreen> */}

          <main className="flex-1">{children}</main>
        {/* </div> */}

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

          {/* </SplashScreen> */}
      </body>
    </html>
  );
}