"use client"
import { useState } from "react";
import { BsArrowLeftCircle, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaSchool } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";




export default function Header() {
    const [open, setOpen] = useState(true);

    const menus = [
        { title: 'Dashboard' },
        { title: 'Alunose', icon: <FaGraduationCap /> },
        { title: 'Percurso', icon: <FaLocationDot /> },
        { title: 'Escolas', icon: <FaSchool /> },
        { title: 'ChatBox', icon: <IoChatboxEllipses /> },
        { title: 'Suporte', icon: <MdOutlineSupportAgent /> },
        { title: 'Logout', icon: <IoLogOut /> },
    ]

    return (
        <>

            <nav>
                <div className={`bg-gradient-to-r from-gray-950 to-gray-900 h-screen p-5 pt-8 ${open ? "w-72" : "md:w-30 w-25"} relative duration-300`}>
                    <BsArrowLeftCircle
                        className={`bg-black text-white text-3xl rounded-full absolute right-1 top-5 border border-purple-950 cursor-pointer ${!open && "rotate-180"}`}
                        onClick={() => setOpen(!open)}
                    />

                    <div className={`inline-flex items-center ${open ? 'border-b-2 border-gray-700' : ''}`}>
                        <img
                            className={`md:w-20 w-15 mr-1 md:mr-2 duration-300 ${open ? 'rotate-[360deg]' : ''}`}
                            src="./logo.png"
                            alt="Logo"
                        />
                        <h1 className={`text-white origin-left font-extrabold text-2xl duration-300 ${!open && 'scale-0'}`}>
                            DASHBOARD
                        </h1>
                    </div>

                    <div className={`flex items-center rounded-md bg-gray-700 mt-6 ${!open ? 'px-2.5' : 'px-4'} py-2`}>
                        <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && 'mr-2'}`} />
                        <input
                            type={"search"}
                            placeholder="Search"
                            className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && 'hidden'}`}
                        />
                    </div>

                    <ul className="pt-2">
                        {menus.map((menu, index) => (
                            <li
                                key={index}
                                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-400 duration-200 hover:text-black rounded-md ${menu.spacing ? 'mt-9' : 'mt-2'}`}
                            >
                                <span className="text-2xl block float-left">{menu.icon ? menu.icon : <RiDashboardFill />}</span>
                                <span className={`text-base font-bold duration-300 ${!open && 'hidden'}`}>
                                    {menu.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </nav>

        </>


    )
}