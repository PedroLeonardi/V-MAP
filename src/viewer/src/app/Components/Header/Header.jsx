"use client";
import { toast } from "sonner";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot, FaSchool } from "react-icons/fa6";
import { IoLogOut, IoChatboxEllipses, IoBus } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";

const menu = [
  { title: "Dashboard", icon: <RiDashboardFill /> },
  { title: "Alunos", icon: <FaGraduationCap /> },
  { title: "Responsáveis", icon: <HiUserGroup /> },
  { title: "Rotas", icon: <FaLocationDot /> },
  { title: "Motoristas", icon: <AiFillEnvironment /> },
  { title: "Veículos", icon: <IoBus /> },
  { title: "ChatBox", icon: <IoChatboxEllipses />, spacing: true },
  { title: "Suporte", icon: <MdOutlineSupportAgent /> },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuAtivo, setMenuAtivo] = useState("Dashboard");

    // toasttt
  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <header className="bg-gradient-to-r from-gray-950 to-gray-900 text-white px-5 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* div logo e titulo */}
        <div className="flex items-center gap-6">
          <img className="w-[90px]" src="./logo.png" alt="Logo" />
          <h1 className="text-xl font-bold hidden sm:block">DASHBOARD</h1>
        </div>

       {/* menu hamburguer */}
        <div className="lg:hidden">
          <button onClick={() => setOpen(!open)} className="text-3xl">
            <BsList />
          </button>
        </div>
       
      </div>

      {/* dropdownzinho */}
      {open && (
        <div className="lg:hidden mt-4 bg-gray-900 border border-gray-700 rounded-md shadow-md py-4 px-4 space-y-3">
          {menu.map((item) => (
            <button
              key={item.title}
              onClick={() => {
                setMenuAtivo(item.title);
                setOpen(false);
              }}
              className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md hover:bg-gray-800 duration-200 ${
                menuAtivo === item.title ? "bg-gray-800 font-bold" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </button>
          ))}
          <hr className="border-gray-600 my-2" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-white hover:bg-red-500 px-2 py-2 rounded-md duration-200 w-full"
          >
            <IoLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
}
