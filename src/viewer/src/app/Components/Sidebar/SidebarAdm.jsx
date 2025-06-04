'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { BsArrowLeftCircle } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogOut, IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function Sidebar() {
  const [mostrar, setMostrar] = useState(false); // controla se a sidebar está expandida ou contraída
  const [abaAtiva, setAbaAtiva] = useState("Dashboard"); // controla qual aba está ativa
  const router = useRouter();

  // cores e estilos reutilizáveis com base na paleta do layout
  const corFundo = "bg-slate-800";
  const corBorda = "border-slate-700";
  const textoNormal = "text-slate-300";
  const textoHover = "text-white";
  const textoDestaque = "text-sky-400";
  const fundoAtivo = "bg-sky-600/90";
  const textoAtivo = "text-white";
  const iconeNormal = "text-slate-400";
  const iconeAtivo = "text-white";
  const iconeHover = "text-sky-400";

  const itensMenu = [
    { title: "Dashboard", icon: <RiDashboardFill /> },
    { title: "ChatBox", icon: <IoChatboxEllipses />, spacing: true },
    { title: "Suporte", icon: <MdOutlineSupportAgent /> },
  ];

  // função de logout limpa o token e redireciona para login
  const logout = () => {
    localStorage.removeItem('token');
    toast.success('Logout realizado com sucesso!');
    setTimeout(() => {
      router.push('/login');
    }, 300);
  };

  const sombraCustom = "shadow-[3px_3px_0px_#1e293b]"; // sombra customizada para destacar a sidebar

  return (
    <div className={`relative ${corFundo} h-screen p-5 pt-10 flex flex-col justify-between ${mostrar ? "w-90" : "w-20"} duration-300 border-r ${corBorda} ${sombraCustom}`}>
      {/* botão de expandir/recolher a sidebar */}
      <BsArrowLeftCircle className={`absolute cursor-pointer -right-3.5 top-9 z-10 text-3xl ${textoDestaque} bg-slate-900 rounded-full border-2 ${corBorda} hover:bg-slate-700 hover:text-sky-300 hover:scale-105 active:scale-100 transition-all duration-200 rotate-180 ${!mostrar && "rotate-360"}`} onClick={() => setMostrar(!mostrar)} />
      
      <div>
        {/* logo e nome do painel */}
        <div className={`flex items-center gap-x-3 pb-5 mb-5 border-b ${corBorda}`}>
          <img src="./logo.png" className={`w-10 h-10 object-contain rounded-full bg-slate-700 p-0.5 border-2 border-sky-500 transition-all duration-500 ${!mostrar && "w-10 h-10"}`} alt="Logo Plataforma" />
          <h1 className={`text-white text-4xl ml-2 font-bold uppercase tracking-wider transition-all duration-300 ease-out ${!mostrar && "opacity-0 scale-0 w-0"}`}>painel</h1>
        </div>

        {/* menu lateral com abas */}
        <ul className="pt-2">
          {itensMenu.map((item, index) => (
            <li key={index} title={!mostrar ? item.title : ""} onClick={() => setAbaAtiva(item.title)} className={`group flex items-center gap-x-3.5 cursor-pointer p-2.5 rounded-md ${textoNormal} text-sm font-medium transition-all duration-150 ease-in-out hover:bg-slate-700/70 ${abaAtiva !== item.title && `hover:${textoHover}`} ${item.spacing ? "mt-4 mb-1" : "my-1"} ${abaAtiva === item.title ? `${fundoAtivo} ${textoAtivo} font-semibold shadow-sm shadow-sky-800/50` : ""}`}>
              {/* ícone do item */}
              <span className={`text-xl transition-colors duration-150 ${abaAtiva === item.title ? iconeAtivo : iconeNormal} group-hover:${iconeHover}`}>{item.icon}</span>
              {/* texto do item */}
              <span className={`text-base whitespace-nowrap transition-opacity duration-200 ${!mostrar && "opacity-0 scale-0 w-0 h-0 absolute"}`}>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* botão de logout */}
      <div className={`pb-3 border-t ${corBorda} pt-4 mt-6`}>
        <div title={!mostrar ? "Sair" : ""} onClick={logout} className="group flex items-center gap-x-3.5 cursor-pointer p-2.5 rounded-md text-red-400 text-sm font-medium transition-all duration-150 ease-in-out hover:bg-red-700/30 hover:text-red-300">
          <span className="text-xl text-red-500 group-hover:text-red-400 transition-colors duration-150"><IoLogOut /></span>
          <span className={`text-base whitespace-nowrap transition-opacity duration-200 ${!mostrar && "opacity-0 scale-0 w-0 h-0 absolute"}`}>sair</span>
        </div>
      </div>
    </div>
  );
}
