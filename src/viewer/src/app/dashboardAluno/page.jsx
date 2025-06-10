<<<<<<< HEAD
 'use client';
 // imports
 import { useState } from "react";
 import { BsArrowLeftCircle} from "react-icons/bs";
 import { toast } from 'sonner';
 import { RiDashboardFill } from "react-icons/ri";
 import { FaGraduationCap } from "react-icons/fa";
 import { MdDirectionsBus } from "react-icons/md";
 import { IoLogOut, IoChatboxEllipses } from "react-icons/io5";
 import { MdOutlineSupportAgent } from "react-icons/md";
 
 
 export default function DashAluno () {
     // função para dashboard
   const [open, setOpen] = useState(true);
   const [menuAtivo, setMenuAtivo] = useState("Dashboard");
 
   // map items
   const menus = [
     { title: "Minhas informações", icon: <FaGraduationCap /> },
     { title: "Rota", icon: <MdDirectionsBus />}
   ];
 
   return (
    <section>
     <div className={`hidden lg:flex h-screen p-5 pt-8 flex flex-col justify-between ${open ? "w-100" : "w-20"} duration-300 relative `} style={{ background: 'linear-gradient(to right, #0F0F0F, #171717, #1E1E1E)'}}>
       <BsArrowLeftCircle
         className={`text-white text-3xl bg-black rounded-full absolute -right-3 top-9 border border-gray-800 cursor-pointer ${!open && "rotate-180"}`}
         onClick={() => setOpen(!open)}
       />
 
       
       <div>
         <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
           <img
             src="./logo.png"
             className={`w-20 duration-300 ${open}`}
             alt="Logo"
           />
           <h1 className={`text-white text-3xl ml-5 font-extrabold origin-left duration-200 ${!open && "scale-0"}`}>DASHBOARD</h1>
         </div>
 
         {/* menus */}
         <ul className="pt-6">
           {menus.map((menu, index) => (
             <li
               key={index}
               title={!open ? menu.title : ""}
               onClick={() => setMenuAtivo(menu.title)}
               className={`flex items-center gap-4 cursor-pointer text-gray-300 text-sm p-2 rounded-md duration-200 hover:bg-gray-700 hover:text-white  ${
                 menu.spacing ? "mt-6" : "mt-2"
               } ${menuAtivo === menu.title ? "bg-gray-600 text-white font-bold" : ""}`}
             >
               <span className={`text-2xl duration-300 ${open}`}>{menu.icon}</span>
               <span className={`text-base duration-200 ${!open && "hidden"}`}>
                 {menu.title}
               </span>
             </li>
           ))}
         </ul>
       </div>
 
      {/* parte separada da sidebarr */}
       <div className="pb-4">
         <li
           title={!open ? "Logout" : ""}
           className="flex items-center gap-4 cursor-pointer text-red-400 text-sm p-2 rounded-md duration-200 hover:bg-red-500 hover:text-white"
           onClick={() => toast.success('Logout')}
         >
           <span className="text-xl">
             <IoLogOut />
           </span>
           <span className={`text-base duration-200 ${!open && "hidden"}`}>
             Logout
           </span>
         </li>
       </div>
     </div>
     <div className="lg:hidden sm:flex">
     <div className={ `w-screen h-20 p-5 pt-8 flex flex-col justify-items-start ${open ? "w-screen" : "w-20"} duration-300 relative `} style={{ background: 'linear-gradient(to right, #0F0F0F, #171717, #1E1E1E)'}}>
     <img
             src="./logo.png"
             className={'w-20 justify-start'}
             alt="Logo"
           />
     </div>
     </div>
    </section>
   );
 }
 
 
=======
'use client'
import { useState, useEffect } from "react";
import ChatBox from '../Components/Chatbot/Chatbot'


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

      <main className=" h-screen bg-gradient-to-r from-gray-300 to-gray-400 overflow-hidden px-4 md:px-10 flex items-center justify-center">

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
              src="/Aluno.png"
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
        <section className="hidden lg:flex flex-1 flex-row items-center justify-between px-10 gap-10">
          {/* Div do texto à esquerda */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
            <h1 className="text-5xl mb-10 font-bold text-black">
              Bem-vindo ao V-MAP
            </h1>
            <h2 className="mt-6 text-2xl text-black">
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
  );
}
>>>>>>> faa0eff2f31766a34185a488327f2722088d40d2
