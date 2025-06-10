'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from 'next/link';
import ChatBox from "./Components/Chatbot/ChatbotResponsa";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [closingMenu, setClosingMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  


  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleCloseMenu = () => {
    setClosingMenu(true);
    setTimeout(() => {
      setOpenMenu(false);
      setClosingMenu(false);
    }, 300);
  };

 

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <>
      {loading && (
        <div className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1500 ease-out
          ${fadeOut ? 'opacity-0' : 'opacity-80'}`}>
          <img src="/Logo.png" alt="Logo" className="w-70 animate-pulse" />
        </div>
      )}

{(openMenu || closingMenu) && (
      <>
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-20 z-40" onClick={handleCloseMenu}></div>
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-gray-400 z-50 p-6 flex flex-col gap-4 transition-transform duration-300 ${
            closingMenu ? 'animate-slide-out-left' : 'animate-slide-in-left'
          }`}
          style={{ left: 0 }}
        >
      <div className="flex justify-between items-center mb-4">
        <img src="/Logo.png" alt="Logo" className="w-28 cursor-pointer" />
        <button onClick={handleCloseMenu} className="text-black text-2xl">&times;</button>
      </div>
      <a href="#sobrenos"  onClick={() => scrollToSection('sobrenos')} className="text-black text-lg font-semibold">Sobre Nós</a>
      <a href="#faq" onClick={() => scrollToSection('faq')} className="text-black text-lg font-semibold">FAQ</a>
      <button
        onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
        className="text-black text-lg font-semibold flex justify-between items-center w-full"
      > Login
        <svg
          className={`w-5 h-5 transition-transform ${mobileLoginOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {mobileLoginOpen && (
        <div className="ml-4 mt-2 flex flex-col gap-2 text-sm text-black">
          <Link href="./login" className="hover:underline">Minha Conta</Link>
        </div>
      )}
    </div>
  </>
)}


<main className="conteudo relative flex w-full overflow-hidden flex-col lg:flex-row">
  <div
    className="w-full lg:w-1/2  flex-col px-10 z-10  relative py-10 md:py-0 h-230"
    style={{ background: 'linear-gradient(to right, #0F0F0F, #171717, #1E1E1E)' }}
  >
    <div
  className={`fixed top-0 left-0 w-full h-20 z-90 transition-colors duration-300 lg:hidden ${
    scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
  }`}
/>
    <div className="fixed top-6 right-6 lg:hidden z-95">
      <button onClick={() => setOpenMenu(true)} className="text-white text-3xl font-bold">&#9776;</button>
    </div>
    <div className="">
      {/* ---------------------------------------------------------- */}
    <Link href="/"><img src="/Logo.png" alt="Logo" className="w-30 md:w-40 lg:w-45"></img> </Link>
    </div>

    <div className="-mt-5 md:mt-10 lg:mt-15">
      <h1 className="text-white font-bold text-4xl pl-0 md:pl-10 lg:pl-10 md:text-5xl lg:text-6xl leading-tight">
        Gestão Inteligente para Transporte Escolar
      </h1>
      <p className="text-white font-medium pl-0 md:pl-12 lg:pl-12 text-md md:text-lg lg:text-2xl mt-6">
        Simplificamos a gestão do transporte escolar de <br />
        Monte Azul Paulista, agora podendo acompanhar <br />
        e gerenciar de forma prática, segura e digital.
      </p>
      <div className="flex gap-4 pl-0 md:pl-12 lg:pl-12 mt-10 flex-wrap">
      <Link href="./login">  <button
          className="text-white font-semibold px-6 py-3 rounded flex items-center gap-2 transition duration-200 hover:brightness-110 cursor-pointer"
          style={{ background: 'linear-gradient(to right, #00305E, #0355A3)' }}
        >
          Escola
          <svg className="w-5 h-5 transition-transform duration-200 hover:-rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button> </Link>
        <Link href="./login"> <button
          className="text-white font-semibold px-6 py-3 rounded flex items-center gap-2 transition duration-200 hover:brightness-110 cursor-pointer"
          style={{ background: 'linear-gradient(to right, #00305E, #0355A3)' }}
        > 
          Pai/Responsável
          <svg className="w-5 h-5 transition-transform duration-200 hover:-rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button> </Link>
      </div>
    </div>
  </div>

  <div
    className="w-1/2 relative bg-cover bg-center overflow-hidden hidden lg:block"
    style={{ backgroundImage: "url('/BG-BUS.jpg')" }}
  >
  <div
  className={`fixed top-0 left-0 w-full z-40 h-35 transition-colors duration-300 ${
    scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
  }`}
/>
<div className="fixed top-0 right-0 w-full text-white font-bold text-3xl flex gap-8 justify-end pr-10 py-4 z-50 transition-colors duration-300 mt-10">
      <a onClick={() => scrollToSection('sobrenos')}className="hover:text-gray-300 cursor-pointer">Sobre Nós</a>
      <a onClick={() => scrollToSection('faq')} className="hover:text-gray-300 cursor-pointer">FAQ</a>
      <div className="relative group">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1 hover:text-gray-300 cursor-pointer">
          Login
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50 py-2 text-base">
            <Link href="./login" className="block px-4 py-2 hover:bg-gray-300">Minha Conta</Link>
          </div>
        )}
      </div>
    </div>
  </div>
</main>

      <div
        className="relative w-full px-10 py-10 md:py-0 "
        style={{
          background: 'linear-gradient(to right, #00305E, #00305E, #01488D,rgb(3, 78, 153), #0355A3)',
          zIndex: 1,
        }}
      >
        <div
          style={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #1E1E1E, #1E1E1E, #595959,  #595959, #848484)',
            clipPath: 'polygon(0 95%, 100% 65%, 100% 100%, 0% 100%)',
            zIndex: 0,
          }}
        ></div>
        <div style={{ position: 'relative', zIndex: 10 }}>
  <h1 id="sobrenos" className="text-white font-bold text-6xl md:text-6xl lg:text-8xl leading-tight pt-10 md:pt-20 lg:pt-40  -pl-20 md:pl-20 lg:pl-40 text-center md:text-start">
    Quem Somos?
  </h1>
  <p className="text-white font-semibold text-[19px] md:text-md lg:text-3xl md:mt-20 lg:-mt-10 mt-1 md:py-0 lg:py-20 lg:pr-100 pt-10 -px-10 md:px-20 lg:px-40 text-start md:text-start">
    Somos fruto de uma iniciativa que nasceu da necessidade 
    real de tornar o transporte escolar mais transparente,
    seguro e acessível. Acreditamos que a tecnologia
    pode aproximar famílias, escolas e motoristas,
    oferecendo informações em tempo real e promovendo
    confiança em cada trajeto. Com raízes em <span className="text-yellow-500"><strong>Monte Azul Paulista </strong></span>
    e colaboração direta com a comunidade   
    educacional, desenvolvemos uma solução feita por quem
    conhece a realidade local e se importa com o bem-estar
    dos estudantes.
  </p>
</div>
</div>
<div className="w-full py-20"
  style={{
    background: 'linear-gradient(to right, #1E1E1E, #1E1E1E, #595959,  #595959, #848484)',
    zIndex: 0,
  }}
>
  <h2 className="text-white text-center font-bold text-5xl md:text-5xl lg:text-8xl mt-20 md:mt-0 lg:mt-0">
    O que oferecemos?
  </h2>
  <div className="flex flex-col w-full">

  {/* Seção 1 */}
  <div className="flex flex-col lg:flex-row w-full h-auto lg:h-screen overflow-hidden">
    <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 py-10">
      <h3 className="text-white font-bold mt-10 text-3xl md:text-4xl lg:text-7xl text-start lg:text-start lg:pl-40">
        Rastreamento em tempo real
      </h3>
      <p className="mt-6 text-lg md:text-lg lg:text-3xl mb-20 lg:mb-0 lg:pl-40 text-start lg:text-start">
        Acompanhamento ao vivo do trajeto do ônibus escolar, com atualização constante da localização. Junto a uma API poderosa que gera as melhores rotas para os alunos e escola.
      </p>
    </div>

    <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
    <img
        src="./Rota-Image.png"
        className="max-w-290 h-auto object-contain mt-20 lg:mt-40"
        alt="Imagem do trajeto"
      />
    </div>
  </div>

{/* Seção 2 */}
<div className="flex flex-col lg:flex-row w-full h-auto lg:h-screen overflow-hidden">
  {/* Imagem à esquerda */}
  <div className="hidden lg:flex lg:w-1/2 items-center justify-center px-10 py-10">
    <img
      src="./notification-image.png"
      className="lg:max-w-330 h-auto object-contain lg:ml-90 -mt-10"
      alt="Notificação"
    />
  </div>

  {/* Texto à direita */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 py-10">
    <h3 className="text-white font-bold -mt-5 lg:mt-0 text-3xl md:text-4xl lg:text-7xl text-start lg:text-left lg:pl-30">
      Painel para pais e responsáveis
    </h3>
    <p className="mt-10 text-lg md:text-lg lg:text-3xl mb-20 lg:mb-0 lg:pl-30 text-start lg:text-left">
      Acesso a uma plataforma clara e intuitiva com histórico de rotas, horários e alertas automáticos quando o aluno entra ou sai do ônibus, além de previsão de chegada nos pontos.
    </p>
  </div>
</div>


  {/* Seção 3 */}
  <div className="flex flex-col lg:flex-row w-full h-auto lg:h-screen overflow-hidden">
    <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 py-10">
      <h3 className="text-white font-bold text-3xl -mt-10 md:text-4xl lg:text-7xl text-start lg:text-start lg:pl-40">
        Site responsivo
      </h3>
      <p className="mt-6 text-lg md:text-lg lg:text-3xl mb-20 lg:mb-0 lg:pl-40 text-start lg:text-start">
        Um site responsivo para que escolas, pais e alunos possam utilizar o nosso serviço com a maior comodidade possível, seja do celular ou do seu computador de casa.
      </p>
    </div>

    <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
      <img
        src="./responsive-image.png"
        className="max-w-370 h-auto object-contain -ml-10 mt-10"
        alt="Nova funcionalidade"
      />
    </div>
  </div>
</div>
</div>
<section className="relative w-full min-h-[100vh] overflow-hidden">
  {/* Degradê */}
  <div
    style={{
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to right, #1E1E1E, #1E1E1E, #595959, #595959, #848484)',
      zIndex: 0,
    }}
  />
  <div id="faq" className="relative z-1 max-w-6xl mx-auto bg-yellow-400 text-black rounded-3xl shadow-xl px-6 md:px-20 py-20 mt-[6rem] mb-[6rem]">
    <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">Dúvidas Frequentes</h2>
    <div className="flex flex-col gap-8">
      {[
        {
          question: "Como acompanhar meu filho em tempo real?",
          answer:
            "Você poderá fazer o login no nosso aplicativo e visualizar a localização do transporte em tempo real através do mapa integrado.",
        },
        {
          question: "Quais escolas estão integradas ao sistema?",
          answer:
            "Atualmente, todas as escolas municipais de Monte Azul Paulista estão integradas. Novas instituições podem ser adicionadas em breve.",
        },
        {
          question: "Posso cadastrar mais de um filho?",
          answer:
            "Sim! Você pode cadastrar quantos alunos desejar, desde que estejam vinculados a uma das rotas autorizadas.",
        },
        {
          question: "E se o transporte escolar atrasar?",
          answer:
            "Você receberá notificações automáticas caso haja qualquer alteração ou atraso no trajeto programado.",
        },
      ].map(({ question, answer }, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{question}</h3>
          <p>{answer}</p>
        </div>
      ))}
    </div>
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg mt-30 p-10">
    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">Fale Conosco</h2>
    <p className="text-xl md:text-1xl font-bold text-center mb-10">Preencha seus dados abaixo e nosso time entrará em contato!</p>
    <form className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
           placeholder="Nome completo"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
           placeholder="Seu melhor email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          placeholder="Escreva aqui sua mensagem"
          rows="5"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="mt-4 bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition cursor-pointer"
      >
        Enviar Mensagem
      </button>
    </form>
  </div>
  </div>
</section>
  <ChatBox/>





      <style jsx>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out forwards;
        }

        .animate-slide-out-left {
          animation: slideOutLeft 0.3s ease-in forwards;
        }
      `}</style>
    </>
  );
}
