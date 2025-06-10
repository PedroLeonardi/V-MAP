'use client';
// imports
import { useState } from "react";
import Link from 'next/link';
import { toast } from 'sonner';
import { BsArrowLeftCircle } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDirectionsBus } from "react-icons/md";

export default function SidebarAluno() {
  const [open, setOpen] = useState(false);
  const [menuAtivo, setMenuAtivo] = useState("./");

  const menus = [
    { title: "Dashboard", icon: <RiDashboardFill />, link: "./dashboardAluno" },
    { title: "Minhas informações", icon: <FaGraduationCap />, link: "./alunoPerf" },
    { title: "Rota", icon: <MdDirectionsBus />, link: "./rotaAluno" },
  ];

  return (
    <div
      className={`
        hidden sm:flex
        ${open ? "w-100" : "w-20"}
        p-5 pt-8
        flex-col justify-between
        duration-300
        z-50
        relative md:absolute lg:relative
        top-0 left-0
        h-full
      `}  style={{ background: 'linear-gradient(to right, #122e5d, #1c3a6b, #1c3a6b  , #1a4283, #1a4283, #2051a1' }}
    >
      <BsArrowLeftCircle
        className={`
          text-white text-3xl bg-black rounded-full absolute -right-3 top-9 border border-gray-800 cursor-pointer
          transition-transform
          ${open ? "rotate-180" : "rotate-360"}
        `}
        onClick={() => setOpen(!open)}
      />

      <div>
        <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
          <img src="./logo.png" className="w-12" alt="Logo" />
          <h1 className={`text-white text-2xl font-extrabold origin-left duration-200 ml-4 ${!open && "scale-0"}`}>
            DASHBOARD
          </h1>
        </div>

        <ul className="pt-6">
          {menus.map((menu, index) => (
            <li key={index} className="mt-2">
              <Link
                href={menu.link}
                title={!open ? menu.title : ""}
                onClick={() => setMenuAtivo(menu.link)}
                className={`
                  flex items-center gap-4 cursor-pointer
                  text-white-300 text-sm p-2 rounded-md
                  duration-200 hover:bg-gray-700 hover:text-white
                  ${menuAtivo === menu.link ? "bg-gray-600 text-white font-bold" : ""}
                `}
              >
                <span className="text-xl text-white">{menu.icon}</span>
                <span className={`text-base duration-200 text-white ${!open && "hidden"}`}>{menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-4">
        <li
          title={!open ? "Logout" : ""}
          className="flex items-center gap-4 cursor-pointer text-red-400 text-sm p-2 rounded-md duration-200 hover:bg-red-500 hover:text-white"
          onClick={() => toast.success('Logout')}
        >
          <span className="text-xl"><IoLogOut /></span>
          <span className={`text-base duration-200 ${!open && "hidden"}`}>Logout</span>
        </li>
      </div>
    </div>
  );
}
