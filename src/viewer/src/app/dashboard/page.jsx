'use client';

import { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { FaLocationDot, FaChartBar } from "react-icons/fa6";
import { PiStudentBold, PiPlusCircleBold, PiPencilSimpleBold, PiTrashBold, PiUsersThreeBold, PiListChecksBold } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { IoBusSharp } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import ModalCadastro from '../Components/Modals/ModalCadastro';
import ModalRelatorioAlunos from '../Components/Modals/ModalRelatorioAlunos';
import ModalUpdateAluno from '../Components/Modals/ModalUpdateAluno';
import ModalExcluirAluno from '../Components/Modals/ModalExcluirAluno';
import axios from 'axios';
import DashboardCard from '../Components/DashboardCard/Dashboard';

// menus "sessões"
const menu = [
    { nome: 'Rotas', icon: <FaLocationDot size={18} /> },
    { nome: 'Alunos', icon: <PiStudentBold size={18} /> },
    { nome: 'Responsáveis', icon: <MdPeopleAlt size={18} /> },
    { nome: 'Veículos', icon: <IoBusSharp size={18} /> },
    { nome: 'Motoristas', icon: <HiUser size={18} /> },
];

export default function PageAdmin() {
    const [abaAtiva, setAbaAtiva] = useState('Alunos');
    const [searchTerm, setSearchTerm] = useState('');
    const [totalAlunos, setTotalAlunos] = useState(0);
    const [responsaveis, setResponsaveis] = useState([]);

    const [showModalCadastro, setShowModalCadastro] = useState(false);
    const [showModalRelatorio, setShowModalRelatorio] = useState(false);
    const [showModalUpdateAluno, setShowModalUpdateAluno] = useState(false);
    const [showModalExcluirAluno, setShowModalExcluirAluno] = useState(false);

    useEffect(() => {
        const fetchTotalAlunos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/aluno/total');
                setTotalAlunos(response.data.total);
            } catch (err) {
                console.error("Erro ao buscar total de alunos", err);
            }
        };

        const fetchResponsaveis = async () => {
            try {
                const response = await axios.get('http://localhost:3001/responsaveis');
                setResponsaveis(response.data);
            } catch (err) {
                console.error("Erro ao buscar responsáveis", err);
            }
        };

        if (abaAtiva === 'Alunos') {
            fetchTotalAlunos();
        } else if (abaAtiva === 'Responsáveis') {
            fetchResponsaveis();
        }
    }, [abaAtiva]);

    const handleAlunoCadastrado = () => {
        setTotalAlunos(prev => prev + 1);
        setShowModalCadastro(true);
    };

    const handleAlunoExcluido = () => {
        setTotalAlunos(prev => prev - 1);
        setShowModalExcluirAluno(false);
    };

    return (
        <div className='min-h-screen bg-slate-900 text-gray-100 p-4 sm:p-8 font-sans'>
            {/* Cabeçalho */}
            <header className="mb-8">
                <h1 className='font-bold text-3xl sm:text-4xl text-white'>
                    Painel de Coordenação
                </h1>
                <p className="text-slate-400 mt-1">Gerencie rotas, alunos, responsáveis e mais.</p>
            </header>

            {/* nav sessões */}
            <nav className='mb-10 pb-4 border-b border-slate-700'>
                <ul className='flex flex-wrap gap-3 sm:gap-5'>
                    {menu.map((item) => (
                        <li key={item.nome}>
                            <button
                                onClick={() => setAbaAtiva(item.nome)}
                                className={`flex items-center gap-2 p-3 px-4 rounded-lg
                                    text-sm sm:text-base font-medium
                                    transition-all duration-200 ease-in-out
                                    ${abaAtiva === item.nome
                                        ? 'bg-blue-900 text-white shadow-md scale-105'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`}
                            >
                                {item.icon} {item.nome}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* conteúdo de cada aba */}
            <section>
                {abaAtiva === 'Alunos' ? (
                    <>
                        <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
                            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200'>
                                Gerenciamento de Alunos
                            </h2>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            <DashboardCard
                        

                            />
                            <DashboardCard
                                icon={<PiPlusCircleBold size={30} />}
                                title="Cadastrar Aluno"
                                description="Adicionar um novo estudante ao sistema."
                                onClick={() => setShowModalCadastro(true)}
                                color="text-blue-700"
                                action
                            />
                            <DashboardCard
                                icon={<PiListChecksBold size={30} />}
                                title="Relatório de Alunos"
                                description="Visualizar lista completa de alunos."
                                onClick={() => setShowModalRelatorio(true)}
                                color="text-blue-700"
                                action
                            />
                            <DashboardCard
                                icon={<PiPencilSimpleBold size={30} />}
                                title="Atualizar Cadastro"
                                description="Editar informações de um aluno existente."
                                onClick={() => setShowModalUpdateAluno(true)}
                                color="text-blue-700"
                                action
                            />
                            <DashboardCard
                                icon={<PiTrashBold size={30} />}
                                title="Excluir Aluno"
                                description="Remover um aluno do sistema."
                                onClick={() => setShowModalExcluirAluno(true)}
                                color="text-red-400"
                                action
                            />
                            <DashboardCard
                                icon={<FaChartBar size={30} />}
                                title="Histórico do Aluno"
                                description="Consultar registros e atividades."
                                color="text-blue-700"
                                action
                            />
                        </div>

                        {/* Modals */}
                        <ModalCadastro
                            isVisible={showModalCadastro}
                            onClose={() => setShowModalCadastro(false)}
                            onSuccess={handleAlunoCadastrado}
                        />
                        <ModalRelatorioAlunos
                            isVisible={showModalRelatorio}
                            onClose={() => setShowModalRelatorio(false)}
                        />
                        <ModalUpdateAluno
                            isVisible={showModalUpdateAluno}
                            onClose={() => setShowModalUpdateAluno(false)}
                        />
                        <ModalExcluirAluno
                            isVisible={showModalExcluirAluno}
                            onClose={() => setShowModalExcluirAluno(false)}
                            onSuccess={handleAlunoExcluido}
                        />
                    </>
                ) : abaAtiva === 'Responsáveis' ? (
                    <>
                        <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
                            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200'>
                                Gerenciamento de Responsáveis
                            </h2>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            <DashboardCard
                                icon={<PiUsersThreeBold size={30} />}
                                title="Total de Responsáveis"
                                value={totalAlunos}
                                color="text-blue-700"
                            />

                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-10 bg-slate-800 rounded-xl shadow-lg min-h-[300px]">
                        <div className="text-6xl mb-4 text-blue-500">
                            {menu.find(m => m.nome === abaAtiva)?.icon}
                        </div>
                        <h2 className="text-3xl font-semibold text-slate-200 mb-2">
                            {abaAtiva}
                        </h2>
                        <p className="text-slate-400">
                            Conteúdo da aba <span className="font-medium">{abaAtiva}</span> será exibido aqui.
                        </p>
                        <p className="text-sm text-slate-500 mt-4">
                            (Em desenvolvimento)
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
