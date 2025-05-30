'use client';
// imports
import { useState } from "react";
import { toast } from 'sonner';
import { BsArrowLeftCircle, BsSearch } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { IoLogOut, IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";



export default function SidebarResponsavel() {
    // função para dashboard
  const [open, setOpen] = useState(false);
  const [menuAtivo, setMenuAtivo] = useState("Dashboard");

  // map items
  const menus = [
    { title: "Dashboard", icon: <RiDashboardFill /> },
    { title: "Minhas informações", icon: <FaGraduationCap /> },
    { title: "ChatBox", icon: <IoChatboxEllipses /> , spacing: true },
    { title: "Suporte", icon: <MdOutlineSupportAgent /> },
  ];

  return (

    <div className={`bg-gradient-to-r from-gray-950 to-gray-900 h-screen p-5 pt-8 flex flex-col justify-between ${open ? "w-72" : "w-20"} duration-300 relative`}>
      <BsArrowLeftCircle
        className={`text-white text-3xl bg-black rounded-full absolute -right-3 top-9 border border-gray-800 cursor-pointer ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      
      <div>
        <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
          <img
            src="./logo.png"
            className={`w-10 duration-300 ${open && "rotate-[360deg]"}`}
            alt="Logo"
          />
          <h1 className={`text-white text-xl font-extrabold origin-left duration-200 ${!open && "scale-0"}`}>DASHBOARD</h1>
        </div>
   
        {/* menus */}
        <ul className="pt-6">
          {menus.map((menu, index) => (
            <li
              key={index}
              title={!open ? menu.title : ""}
              onClick={() => setMenuAtivo(menu.title)}
              className={`flex items-center gap-4 cursor-pointer text-gray-300 text-sm p-2 rounded-md duration-200 hover:bg-gray-700 hover:text-white ${
                menu.spacing ? "mt-6" : "mt-2"
              } ${menuAtivo === menu.title ? "bg-gray-600 text-white font-bold" : ""}`}
            >
              <span className="text-xl">{menu.icon}</span>
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
  );
}
