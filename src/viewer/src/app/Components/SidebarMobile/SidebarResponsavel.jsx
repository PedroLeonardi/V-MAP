'use client';
// imports
import { useState } from "react";
import Link from 'next/link'
import { toast } from 'sonner';
import { BsArrowLeftCircle } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";
import { IoLogOut, IoChatboxEllipses } from "react-icons/io5";
import { MdDirectionsBus } from "react-icons/md";

export default function SidebarAluno() {
  const [menuAtivo, setMenuAtivo] = useState("./");

   const menus = [
        { icon: <RiDashboardFill />, link: "./dashboardResponsavel" },
        { icon: <PiStudentFill />, link: "./alunoLog" },
        { icon: <IoPerson />, link: "./responsavelPerf" },
        { icon: <MdDirectionsBus />, link: "./rotaResponsavel" },
    ];

  return (
    <div
      className={`
        fixed bottom-0 left-0 w-full h-15
        bg-gradient-to-r from-gray-950 to-gray-900
        text-white
        flex justify-around items-center
        py-2 px-30
        md:hidden
        z-50
      `}
    >
      {menus.map((menu, index) => (
        <Link
          key={index}
          href={menu.link}
          onClick={() => setMenuAtivo(menu.link)}
          className={`
            flex flex-col items-center justify-center 
            text-[30px] 
            ${menuAtivo === menu.link ? "text-white font-bold" : "text-gray-400"}
          `}
        >
          <span className="text-[25px]">{menu.icon}</span>
          <span>{menu.title}</span>
        </Link>
      ))}
      <button
        onClick={() => toast.success('Logout')}
        className="flex flex-col items-center justify-center text-md text-red-400 hover:text-white absolute ml-60"
      >
        <span className="text-[25px]"><IoLogOut /></span>
      </button>
    </div>
  );
}
