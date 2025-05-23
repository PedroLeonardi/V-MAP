'use client';

import { useState } from 'react';
import { BsArrowLeftCircle, BsSearch } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { IoBusSharp } from "react-icons/io5";
import { HiUser } from "react-icons/hi";

const menu = [
    { nome: 'Rotas', icon: <FaLocationDot /> },
    { nome: 'Alunos', icon: <PiStudentBold /> },
    { nome: 'Responsáveis', icon: <MdPeopleAlt /> },
    { nome: 'Veículos', icon: <IoBusSharp /> },
    { nome: 'Motoristas', icon: <HiUser /> },
];

export default function PageAdmin() {
    const [abaAtiva, setAbaAtiva] = useState('Rotas');

    return (
        <div className='m-10'>
            <nav>
                <ul className='flex gap-8 font-extrabold font-mono text-[19px]'>
                    {menu.map((item, index) => (
                        <li key={index} className='flex'>
                            <button
                                onClick={() => setAbaAtiva(item.nome)}
                                className={`flex p-3 gap-1 opacity-60 hover:opacity-100 rounded-2xl hover:bg-gray-800 duration-300 hover:shadow-2xs shadow-gray-600 ${abaAtiva === item.nome ? 'opacity-100 bg-gray-800' : ''
                                    }`}
                            >
                                {item.icon} {item.nome}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <section className='mt-5'>
                <h1 className='font-mono font-bold text-3xl mb-4'>Painel de Coordenação</h1>

                {abaAtiva === 'Alunos' && (
                    <>
                    <form className='w-[300px] relative'>
                    <div className='relatuve'>
                       
                        <input type="search" placeholder='Procurando aluno...' className='w-full p-4 rounded-full bg-slate-800' />
                    <button className='absolute right-5  top-5'><BsSearch/></button>
                    </div>
                    </form>
                    {/* total alunos */}
                    <div className='flex justify-center gap-8 mt-5'>

                    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white w-60 p-4 shadow-lg border border-blue-300 rounded-2xl hover:scale-105 duration-300 ease-in cursor-pointer ">
                        <div className="flex items-center gap-3 text-lg font-semibold mb-2">
                            <PiStudentBold className="text-2xl text-white" />
                            <h1 className="text-white">Total de Alunos</h1>
                        </div>
                        <span className="text-3xl font-bold text-white">0</span>
                    </div>

                    {/* cadastrar aluno */}
                    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white w-60 p-4 shadow-lg border border-blue-300 rounded-2xl hover:scale-103 duration-300 ease-in cursor-pointer ">
                        <div className="flex items-center gap-3 text-lg font-semibold mb-2">
                            <PiStudentBold className="text-2xl text-white" />
                            <h1 className="text-white">Cadastrar aluno</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white w-60 p-4 shadow-lg border border-blue-300 rounded-2xl hover:scale-103 duration-300 ease-in cursor-pointer ">
                        <div className="flex items-center gap-3 text-lg font-semibold mb-2">
                            <PiStudentBold className="text-2xl text-white" />
                            <h1 className="text-white">Atualizar aluno</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white w-60 p-4 shadow-lg border border-blue-300 rounded-2xl hover:scale-103 duration-300 ease-in cursor-pointer ">
                        <div className="flex items-center gap-3 text-lg font-semibold mb-2">
                            <PiStudentBold className="text-2xl text-white" />
                            <h1 className="text-white">Excluir aluno</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white w-60 p-4 shadow-lg border border-blue-300 rounded-2xl hover:scale-103 duration-300 ease-in cursor-pointer ">
                        <div className="flex items-center gap-3 text-lg font-semibold mb-2">
                            <PiStudentBold className="text-2xl text-white" />
                            <h1 className="text-white">Consultar aluno</h1>
                        </div>
                    </div>
                    </div>
                    </>

                )}

                {abaAtiva === 'Veículos' && (
                    <div className="text-xl font-semibold text-gray-700">Hello World na aba Veículos!</div>
                )}

                {abaAtiva === 'Rotas' && (
                    <div className="text-lg text-gray-600">Aqui vai o conteúdo da aba Rotas.</div>
                )}

                {abaAtiva === 'Responsáveis' && (
                    <div>Conteúdo da aba Responsáveis.</div>
                )}

                {abaAtiva === 'Motoristas' && (
                    <div>Conteúdo da aba Motoristas.</div>
                )}
            </section>
        </div>
    );
}
