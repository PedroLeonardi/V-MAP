'use client';
import { useState, useEffect } from 'react';
import { FaLocationDot, FaChartBar } from "react-icons/fa6";
import { PiStudentBold, PiPlusCircleBold, PiPencilSimpleBold, PiTrashBold, PiUsersThreeBold, PiListChecksBold } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { IoBusSharp } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import DashboardCard from '../Components/DashboardCard/Dashboard';
import useFetchTotalAlunos from '../Hooks/TotalAlunos';
import useFetchResponsaveis from '../Hooks/TotalResponsavel';
import axios from 'axios';

// Import modals
import ModalCadastro from '../Components/Modals/ModalCadastroAluno';
import ModalRelatorioAlunos from '../Components/Modals/ModalRelatorioAlunos';
import ModalUpdateAluno from '../Components/Modals/ModalUpdateAluno';
import ModalExcluirAluno from '../Components/Modals/ModalExcluirAluno';
import ModalCadastroResponsavel from '../Components/Modals/ModalCadastroResponsavel';
import ModalUpdateResponsavel from '../Components/Modals/ModalUpdateResponsavel';
import ModalRelatorioResponsaveis from '../Components/Modals/ModalRelatorioResponsavel';
import ModalExcluirResponsavel from '../Components/Modals/ModalExcluirResponsavel';
import ModalCadastroAdmin from '../Components/Modals/ModalCadastroAdm';
import ModalUpdateAdmin from '../Components/Modals/ModalUpdateAdm';

const menu = [
  { nome: 'Administração', icon: <FiSettings size={18} /> },
  { nome: 'Rotas', icon: <FaLocationDot size={18} /> },
  { nome: 'Alunos', icon: <PiStudentBold size={18} /> },
  { nome: 'Responsáveis', icon: <MdPeopleAlt size={18} /> },
  { nome: 'Veículos', icon: <IoBusSharp size={18} /> },
  { nome: 'Motoristas', icon: <HiUser size={18} /> },
];

export default function PageAdmin() {
  const [abaAtiva, setAbaAtiva] = useState('Alunos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalRelatorioAlunos, setShowModalRelatorioAlunos] = useState(false);
  const [showModalUpdateAluno, setShowModalUpdateAluno] = useState(false);
  const [showModalExcluirAluno, setShowModalExcluirAluno] = useState(false);

  const [showModalCadastroResponsavel, setShowModalCadastroResponsavel] = useState(false);
  const [showModalUpdateResponsavel, setShowModalUpdateResponsavel] = useState(false);
  const [showModalRelatorioResponsaveis, setShowModalRelatorioResponsaveis] = useState(false);
  const [showModalExcluirResponsavel, setShowModalExcluirResponsavel] = useState(false);

  const [showModalCadastroAdmin, setShowModalCadastroAdmin] = useState(false);
  const [showModalUpdateAdmin, setShowModalUpdateAdmin] = useState(false);

  const [responsaveis, setResponsaveis] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState(0);

  const { totalAlunos } = useFetchTotalAlunos();
  const { totalResponsaveis } = useFetchResponsaveis();

  const handleUpdateResponsavelSucesso = async () => {
    try {
      const response = await axios.get('http://localhost:3001/responsaveis');
      setResponsaveis(response.data);
    } catch (err) {
      console.error("Erro ao buscar responsáveis", err);
    }
    setShowModalUpdateResponsavel(false);
  };

  const handleExcluirResponsavelSucesso = async () => {
    try {
      const response = await axios.get('http://localhost:3001/responsaveis');
      setResponsaveis(response.data);
    } catch (err) {
      console.error("Erro ao buscar responsáveis", err);
    }
    setShowModalExcluirResponsavel(false);
  };

  return (
    <div className='min-h-screen bg-slate-900 text-gray-100 p-4 sm:p-8 font-sans'>
      <header className="mb-8">
        <h1 className='font-bold text-3xl sm:text-4xl text-white'>Painel de Coordenação</h1>
        <p className="text-slate-400 mt-1">Gerencie rotas, alunos, responsáveis e mais.</p>
      </header>

      <nav className='mb-10 pb-4 border-b border-slate-700'>
        <ul className='flex flex-wrap gap-3 sm:gap-5'>
          {menu.map((item) => (
            <li key={item.nome}>
              <button
                onClick={() => setAbaAtiva(item.nome)}
                className={`flex items-center gap-2 p-3 px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-in-out ${abaAtiva === item.nome ? 'bg-blue-900 text-white shadow-md scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
              >
                {item.icon} {item.nome}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section>
        {abaAtiva === 'Administração' ? (
          <>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-6'>Gerenciamento de Administradores</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Cadastrar Administrador"
                description="Adicionar um novo administrador ao sistema."
                onClick={() => setShowModalCadastroAdmin(true)}
                color="text-blue-700"
                action
              />
              <DashboardCard
                icon={<PiUsersThreeBold size={30} />}
                title="Total de Administradores"
                value={totalAdmins}
                description="Número atual de administradores cadastrados."
                color="text-blue-700"
              />
            </div>
            <ModalCadastroAdmin isVisible={showModalCadastroAdmin} onClose={() => setShowModalCadastroAdmin(false)} />
            <ModalUpdateAdmin isVisible={showModalUpdateAdmin} onClose={() => setShowModalUpdateAdmin(false)} />
          </>
        ) : abaAtiva === 'Alunos' ? (
          <>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-6'>Gerenciamento de Alunos</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              <DashboardCard
                icon={<PiStudentBold size={30} />}
                title="Total de Alunos"
                value={totalAlunos}
                description="Número atual de alunos cadastrados."
                color="text-blue-700"
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
                onClick={() => setShowModalRelatorioAlunos(true)}
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
            <ModalCadastro isVisible={showModalCadastro} onClose={() => setShowModalCadastro(false)} />
            <ModalRelatorioAlunos isVisible={showModalRelatorioAlunos} onClose={() => setShowModalRelatorioAlunos(false)} />
            <ModalUpdateAluno isVisible={showModalUpdateAluno} onClose={() => setShowModalUpdateAluno(false)} />
            <ModalExcluirAluno isVisible={showModalExcluirAluno} onClose={() => setShowModalExcluirAluno(false)} />
          </>
        ) : abaAtiva === 'Responsáveis' ? (
          <>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-6'>Gerenciamento de Responsáveis</h2>
            <DashboardCard
              icon={<PiUsersThreeBold size={30} />}
              title="Total de Responsáveis"
              value={totalResponsaveis}
              description="Número atual de responsáveis cadastrados."
              color="text-blue-700"
            />
            <ModalCadastroResponsavel isVisible={showModalCadastroResponsavel} onClose={() => setShowModalCadastroResponsavel(false)} />
            <ModalRelatorioResponsaveis isVisible={showModalRelatorioResponsaveis} onClose={() => setShowModalRelatorioResponsaveis(false)} responsaveis={responsaveis} />
            <ModalUpdateResponsavel isVisible={showModalUpdateResponsavel} onClose={() => setShowModalUpdateResponsavel(false)} />
            <ModalExcluirResponsavel isVisible={showModalExcluirResponsavel} onClose={() => setShowModalExcluirResponsavel(false)} />
          </>
        ) : (
          <div className='text-slate-400 p-8 text-center'>Seção ainda em desenvolvimento.</div>
        )}
      </section>
    </div>
  );
}
