"use client"
import { useState } from "react";
import { BsArrowLeftCircle, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

export default function Header() {
    const [open, setOpen] = useState(true);

    const menus = [
        { title: 'Dashboard' }, 
        { title: 'Alunos' },
        { title: 'Percurso' },
        { title: 'Escolas' },
        { title: 'Logout' },
    ]

    return (
        <nav className="flex">
            <div className={`bg-gray-950 h-screen p-5 pt-8 ${open ? "w-72" : "w-30"} relative duration-300`}>
                <BsArrowLeftCircle
                    className={`bg-black text-white text-3xl rounded-full absolute right-3 top-9 border border-purple-950 cursor-pointer ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                
                <div className="inline-flex items-center">
                    <AiFillEnvironment className={`
                        bg-orange-600 
                        text-white  // Added text color
                        text-3xl 
                        rounded 
                        cursor-pointer 
                        mr-2 
                        duration-500 
                        ${open ? 'rotate-[360deg]' : ''}
                    `}/>
                    <h1 className={`text-white origin-left font-extrabold text-2xl duration-300 ${!open && 'scale-0'}`}>
                        DASHBOARD
                    </h1>
                </div>

                <div className={`flex items-center rounded-md bg-gray-700 mt-6 ${!open ? 'px-2.5' : 'px-4'} py-2`}>
                    <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && 'mr-2'}`}/>
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
                            <span className="text-2xl block float-left"><RiDashboardFill/></span>
                            <span className={`text-base font-bold duration-300 ${!open && 'hidden'}`}>
                                {menu.title}
                                </span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}