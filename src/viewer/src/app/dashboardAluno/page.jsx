export default function DashAluno() {
    return (
      <main className="h-screen bg-gradient-to-r from-gray-300 to-gray-400 overflow-hidden px-4 md:px-10 flex items-center justify-center">
  
        {/* Versão desktop e mobile: visível fora do md */}
        <section className="flex-1 flex flex-col items-center justify-center text-center md:hidden px-6 sm:px-8">
          <h1 className="text-2xl text-black font-bold pt-10 max-w-full break-words">
            Bem-vindo ao V-MAP
          </h1>
          <h2 className="mt-6 text-sm text-black max-w-xs sm:max-w-md px- sm:px-0">
            O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a
            rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os
            responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais
            segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.
          </h2>
          <div className="pt-10">
            <img
              src="/Aluno-2.png"
              alt="Aluno mobile"
              className="max-w-3xl -mt-10"
            />
          </div>
        </section>
  
        {/* Versão tablet: só texto centralizado, visível só no md */}
        <section className="hidden md:flex lg:hidden flex-1 flex-col items-center justify-center text-center h-screen px-6">
          <h1 className="text-4xl font-bold text-black">
            Bem-vindo ao V-MAP
          </h1>
          <h2 className="mt-6 text-lg max-w-xl text-black">
            O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a
            rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os
            responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais
            segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.
          </h2>
        </section>
  
        {/* Versão desktop: texto alinhado à esquerda e imagem visível no lg+ */}
        <section className="hidden lg:flex flex-1 flex-row items-center justify-center px-10 gap-10">
          <div className="flex flex-col items-start max-w-xl">
            <h1 className="text-6xl font-bold text-black">
              Bem-vindo ao V-MAP
            </h1>
            <h2 className="mt-6 text-2xl text-black">
              O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a
              rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os
              responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais
              segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.
            </h2>
          </div>
          <img
            src="/Aluno.png"
            alt="Aluno"
            className="max-w-3xl mt-35"
          />
        </section>
  
      </main>
    );
  }
  