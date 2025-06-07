'use client';
// imports
import { useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { toast } from 'sonner';
import { RiDashboardFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { MdDirectionsBus } from "react-icons/md";
import { IoLogOut, IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import ChatBox from "../Components/Chatbot/Chatbot";
import RotaProtegidaAdm from "../Components/ProtegendoRota/ProtectRoute";


export default function DashAluno() {
  // função para dashboard
  const [open, setOpen] = useState(true);
  const [menuAtivo, setMenuAtivo] = useState("Dashboard");

  // map items
  const menus = [
    { title: "Minhas informações", icon: <FaGraduationCap /> },
    { title: "Rota", icon: <MdDirectionsBus /> }
  ];

  return (
    <RotaProtegidaAdm requiredRole="aluno">

      <section>
        <div className={`hidden lg:flex h-screen p-5 pt-8 flex flex-col justify-between ${open ? "w-100" : "w-20"} duration-300 relative `} style={{ background: 'linear-gradient(to right, #0F0F0F, #171717, #1E1E1E)' }}>
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
                  className={`flex items-center gap-4 cursor-pointer text-gray-300 text-sm p-2 rounded-md duration-200 hover:bg-gray-700 hover:text-white  ${menu.spacing ? "mt-6" : "mt-2"
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
          <div className={`w-screen h-20 p-5 pt-8 flex flex-col justify-items-start ${open ? "w-screen" : "w-20"} duration-300 relative `} style={{ background: 'linear-gradient(to right, #0F0F0F, #171717, #1E1E1E)' }}>
            <img
              src="./logo.png"
              className={'w-20 justify-start'}
              alt="Logo"
            />
          </div>
        </div>
      <ChatBox/>
      </section>
    </RotaProtegidaAdm>
  );
}

