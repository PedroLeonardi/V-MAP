'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { BsArrowLeftCircle } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogOut, IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [menuAtivo, setMenuAtivo] = useState("Dashboard");
  const router = useRouter();

  const menus = [
    { title: "Dashboard", icon: <RiDashboardFill /> },
    { title: "ChatBox", icon: <IoChatboxEllipses />, spacing: true },
    { title: "Suporte", icon: <MdOutlineSupportAgent /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout realizado com sucesso!!!');
    setTimeout(() => {
      router.push('/login');
    }, 200);
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 h-screen p-5 pt-8 flex flex-col justify-between ${open ? "w-72" : "w-20"} duration-300 relative shadow-2xl`}>
      {/* botão de toggle */}
      <BsArrowLeftCircle
        className={`text-white text-3xl bg-gray-800 rounded-full absolute -right-3 top-9 border-2 border-gray-700 cursor-pointer hover:bg-gray-700 hover:scale-110 transition-all ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      <div>
        {/* logo e título */}
        <div className="flex items-center gap-3 pb-6 border-b border-gray-700">
          <img
            src="./logo.png"
            className={`w-10 h-10 object-contain duration-500 ${open && "rotate-[360deg]"}`}
            alt="Logo"
          />
          <h1 className={`text-white text-2xl font-bold duration-200 ${!open && "scale-0"}`}>DASHBOARD</h1>
        </div>

        {/* Menus */}
        <ul className="pt-2">
          {menus.map((menu, index) => (
            <li
              key={index}
              title={!open ? menu.title : ""}
              onClick={() => setMenuAtivo(menu.title)}
              className={`flex items-center gap-4 cursor-pointer text-sm p-3 rounded-lg transition-all hover:bg-blue-900 hover:pl-4 ${menu.spacing ? "mt-4" : "mt-1"
                } ${menuAtivo === menu.title
                  ? "bg-blue-900 text-white border-l-4 border-blue-500 pl-4 font-semibold"
                  : "text-gray-300"
                }`}
            >
              <span className={`text-xl ${menuAtivo === menu.title ? "text-blue-600" : "text-gray-400"}`}>
                {menu.icon}
              </span>
              <span className={`text-base transition-all ${!open && "hidden"}`}>
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section */}
      <div className="pb-4 border-t border-gray-700 pt-4">
        {/* Logout */}
        <div
          title={!open ? "Logout" : ""}
          className="flex items-center gap-4 cursor-pointer text-sm p-3 rounded-lg transition-all hover:bg-red-500/20 hover:text-red-400 group"
          onClick={handleLogout}
        >
          <span className="text-xl text-red-400 group-hover:scale-110 transition-transform">
            <IoLogOut />
          </span>
          <span className={`text-base transition-all ${!open && "hidden"}`}>
            Sair
          </span>
        </div>
      </div>
    </div>
  );
}
