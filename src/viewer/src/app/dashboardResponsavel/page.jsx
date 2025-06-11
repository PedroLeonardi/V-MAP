'use client'
import { useState, useEffect } from "react";
import ChatBox from '../Components/Chatbot/ChatBotResponsa'
import RotaProtegidaAdm from "../Components/ProtegendoRota/ProtectRoute";

export default function DashAluno() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <RotaProtegidaAdm requiredRole="responsavel">

      <>
        {loading && (
          <div
            className={`fixed inset-0 bg-black/90 backdrop-blur-3xl flex items-center justify-center z-50
          transition-opacity duration-1500 ease-out
          ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
          >
            <img src="/Logo.png" alt="Logo" className="w-70 animate-pulse" />
          </div>
        )}

        <main
          className="h-screen bg-cover bg-center bg-no-repeat overflow-hidden px-4 md:px-10 flex items-center justify-center"
          style={{ backgroundImage: `url('/BG-dash.jpg')` }}
        >

          {/* Versão desktop e mobile: visível fora do md */}
          <section className="flex-1 flex flex-col items-center justify-center text-center md:hidden px-6 sm:px-8">
            <h1 className="text-2xl text-white font-bold pt-10 max-w-full break-words">
              Bem-vindo ao V-MAP
            </h1>
            <h2 className="mt-6 text-sm text-white max-w-xs sm:max-w-md px- sm:px-0">
              O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a
              rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os
              responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais
              segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.
            </h2>
            <div className="pt-10">
              <img
                src="/Aluno.png"
                alt="Aluno mobile"
                className="max-w-3xl -mt-10"
              />
            </div>
          </section>

          {/* Versão tablet: só texto centralizado, visível só no md */}
          <section className="hidden md:flex lg:hidden flex-1 flex-col items-center justify-center text-center h-screen px-6">
            <h1 className="text-4xl font-bold text-white">
              Bem-vindo ao V-MAP
            </h1>
            <h2 className="mt-6 text-lg max-w-xl text-white">
              O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a
              rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os
              responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais
              segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.
            </h2>
          </section>

          {/* Versão desktop: texto alinhado à esquerda e imagem visível no lg+ */}
          <section className="hidden lg:flex flex-1 flex-row items-center justify-between px-10 gap-10">
            {/* Div do texto à esquerda */}
            <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
              <h1 className="text-5xl mb-10 font-bold text-white">
                Bem-vindo ao V-MAP
              </h1>
              <h2 className="mt-6 text-2xl text-white">
                O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a
                rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os
                responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais
                segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.
              </h2>
            </div>

            {/* Div da imagem à direita */}
            <div className="flex-1 flex items-center justify-center pt-10">
              <img
                src="/Aluno.png"
                alt="Aluno"
                className="max-w-"
              />
            </div>
          </section>
          <ChatBox />
        </main>
      </>
    </RotaProtegidaAdm>
  );
}
