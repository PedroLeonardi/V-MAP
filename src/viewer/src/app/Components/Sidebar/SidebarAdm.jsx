'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { BsArrowLeftCircle } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogOut, IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [menuAtivo, setMenuAtivo] = useState("Dashboard");
  const router = useRouter();

  // Cores baseadas na paleta do login
  const sidebarBgColor = "bg-slate-800";
  const borderColor = "border-slate-700";
  const textColorBase = "text-slate-300";
  const textColorHover = "text-white";
  const highlightColor = "text-sky-400"; // Usado no toggle e logo
  const activeBgColor = "bg-sky-600/90"; // Um pouco de transparência para integrar
  const activeTextColor = "text-white";
  const iconColorBase = "text-slate-400";
  const iconColorActive = "text-white"; // Ícone ativo no fundo sky
  const iconColorHover = "text-sky-400"; // Ícone em hover

  const menus = [
    { title: "Dashboard", icon: <RiDashboardFill /> },
    { title: "ChatBox", icon: <IoChatboxEllipses />, spacing: true },
    { title: "Suporte", icon: <MdOutlineSupportAgent /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout realizado com sucesso!');
    setTimeout(() => {
      router.push('/login');
    }, 300);
  };

  const customShadow = "shadow-[3px_3px_0px_#1e293b]"; // slate-800, um pouco mais sutil

  return (
    <div className={`relative ${sidebarBgColor} h-screen p-5 pt-8 flex flex-col justify-between 
                   ${open ? "w-72" : "w-20"} duration-300 
                   border-r ${borderColor} ${customShadow}`}> {/* Borda mais fina */}

      <BsArrowLeftCircle
        className={`absolute cursor-pointer -right-3.5 top-9 z-10
                   text-3xl ${highlightColor} bg-slate-900 
                   rounded-full border-2 ${borderColor}
                   hover:bg-slate-700 hover:text-sky-300 hover:scale-105
                   active:scale-100 transition-all duration-200
                   ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      <div>
        <div className={`flex items-center gap-x-3 pb-5 mb-5 border-b ${borderColor}`}>
          <img
            src="./logo.png"
            className={`w-10 h-10 object-contain rounded-full bg-slate-700 p-0.5 border-2 border-sky-500
                       transition-all duration-500 ${open ? "rotate-[360deg]" : "mx-auto"}
                       ${!open && "w-10 h-10"}`}
            alt="Logo Plataforma"
          />
          <h1
            className={`text-white text-xl font-bold uppercase tracking-wider
                       transition-all duration-300 ease-out ${!open && "opacity-0 scale-0 w-0"}`}
          >
            Painel
          </h1>
        </div>

        <ul className="pt-1">
          {menus.map((menu, index) => (
            <li
              key={index}
              title={!open ? menu.title : ""}
              onClick={() => setMenuAtivo(menu.title)}
              className={`group flex items-center gap-x-3.5 cursor-pointer p-2.5 rounded-md
                         ${textColorBase} text-sm font-medium
                         transition-all duration-150 ease-in-out 
                         hover:bg-slate-700/70 ${menuAtivo !== menu.title && `hover:${textColorHover}`}
                         ${menu.spacing ? "mt-4 mb-1" : "my-1"} {/* Ajuste no espaçamento */}
                         ${menuAtivo === menu.title
                  ? `${activeBgColor} ${activeTextColor} font-semibold shadow-sm shadow-sky-800/50` // Sombra mais sutil no ativo
                  : ""
                }`}
            >
              <span className={`text-xl transition-colors duration-150 
                              ${menuAtivo === menu.title ? iconColorActive : iconColorBase}
                              group-hover:${iconColorHover}`}>
                {menu.icon}
              </span>
              <span
                className={`text-base whitespace-nowrap 
                           transition-opacity duration-200 ${!open && "opacity-0 scale-0 w-0 h-0 absolute"}`}
              >
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`pb-3 border-t ${borderColor} pt-4 mt-6`}>
        <div
          title={!open ? "Sair" : ""}
          className={`group flex items-center gap-x-3.5 cursor-pointer p-2.5 rounded-md
                     text-red-400 text-sm font-medium
                     transition-all duration-150 ease-in-out
                     hover:bg-red-700/30 hover:text-red-300`}
          onClick={handleLogout}
        >
          <span className={`text-xl text-red-500 group-hover:text-red-400 transition-colors duration-150`}>
            <IoLogOut />
          </span>
          <span
            className={`text-base whitespace-nowrap transition-opacity duration-200 ${!open && "opacity-0 scale-0 w-0 h-0 absolute"}`}
          >
            Sair
          </span>
        </div>
      </div>
    </div>
  );
}