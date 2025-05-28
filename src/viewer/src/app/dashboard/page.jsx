'use client';
import { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { FaLocationDot, FaChartBar } from "react-icons/fa6";
import { PiStudentBold, PiPlusCircleBold, PiPencilSimpleBold, PiTrashBold, PiUsersThreeBold, PiListChecksBold } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { IoBusSharp } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import DashboardCard from '../Components/DashboardCard/Dashboard';
import useFetchTotalAlunos from '../Hooks/TotalAlunos';
import useFetchResponsaveis from '../Hooks/TotalResponsavel';

// import modals
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

import axios from 'axios';

// menus "sessões"
const menu = [
  { nome: 'Administração', icon: <FiSettings size={18} /> },
  { nome: 'Rotas', icon: <FaLocationDot size={18} /> },
  { nome: 'Alunos', icon: <PiStudentBold size={18} /> },
  { nome: 'Responsáveis', icon: <MdPeopleAlt size={18} /> },
  { nome: 'Veículos', icon: <IoBusSharp size={18} /> },
  { nome: 'Motoristas', icon: <HiUser size={18} /> },
];


export default function PageAdmin() {

  // abas
  const [abaAtiva, setAbaAtiva] = useState('Alunos');
  const [searchTerm, setSearchTerm] = useState('')

  // const dos modals
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalRelatorioAlunos, setShowModalRelatorioAlunos] = useState(false);
  const [showModalRelatorioResponsaveis, setShowModalRelatorioResponsaveis] = useState(false);
  const [showModalUpdateAluno, setShowModalUpdateAluno] = useState(false);
  const [showModalExcluirAluno, setShowModalExcluirAluno] = useState(false);
  const [showModalCadastroResponsavel, setShowModalCadastroResponsavel] = useState(false);
  const [showModalUpdateResponsavel, setShowModalUpdateResponsavel] = useState(false);
  const [showModalExcluirResponsavel, setShowModalExcluirResponsavel] = useState(false);
  const [showModalCadastroAdmin, setShowModalCadastroAdmin] = useState(false);
  const [showModalUpdateAdmin, setShowModalUpdateAdmin] = useState(false);

  const totalAlunos = useFetchTotalAlunos(abaAtiva === 'Alunos');
  const [responsaveis, setResponsaveis] = useFetchResponsaveis(abaAtiva === 'Responsáveis');


  // FETCH ALUNOS
  const handleAlunoCadastrado = async () => {
    try {
      const response = await axios.get('http://localhost:3001/aluno/total');
      setTotalAlunos(response.data.total);
    } catch (error) {
      console.error("Erro ao atualizar total de alunos após cadastro", error);
    } finally {
      setShowModalCadastro(false);
    }
  };

  const handleAlunoExcluido = () => {
    setTotalAlunos(prev => prev - 1);
    setShowModalExcluirAluno(false);
  };

  // ------------------------------------------------------------------------ // 

  // RESPONSAVÉIS

  // CADASTRO RES
  const handleCadastroResponsavelSucesso = () => {
    const fetchResponsaveis = async () => {
      try {
        const response = await axios.get('http://localhost:3001/responsaveis');
        setResponsaveis(response.data);
      } catch (err) {
        console.error("Erro ao buscar responsáveis", err);
      }
    };
    fetchResponsaveis();
    setShowModalCadastroResponsavel(false);
  };

  // UPDATE RES
  const handleUpdateResponsavelSucesso = () => {
    const fetchResponsaveis = async () => {
      try {
        const response = await axios.get('http://localhost:3001/responsaveis');
        setResponsaveis(response.data);
      } catch (err) {
        console.error("Erro ao buscar responsáveis", err);
      }
    };
    fetchResponsaveis();
    setShowModalUpdateResponsavel(false);
  };

  // EXCLUIR RES
  const handleExcluirResponsavelSucesso = () => {
    const fetchResponsaveis = async () => {
      try {
        const response = await axios.get('http://localhost:3001/responsaveis');
        setResponsaveis(response.data);
      } catch (err) {
        console.error("Erro ao buscar responsáveis", err);
      }
    };
    fetchResponsaveis();
    setShowModalExcluirResponsavel(false);
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
        {abaAtiva === 'Administração' ? (
          <>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200'>
                Gerenciamento de Administradores
              </h2>
            </div>

            {/* CADASTRO */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Cadastrar Administrador"
                description="Adicionar um novo administrador ao sistema."
                onClick={() => setShowModalCadastroAdmin(true)}
                color="text-blue-700"
                action
              />

              {/* ATUALIZAR CADASTRO */}
              <DashboardCard
                icon={<PiPencilSimpleBold size={30} />}
                title="Atualizar Cadastro"
                description="Editar informações de um administrador."
                onClick={() => setShowModalUpdateAdmin(true)}
                color="text-blue-700"
                action
              />

              {/* REMOVER ADM */}
              <DashboardCard
                icon={<PiTrashBold size={30} />}
                title="Remover Administrador"
                description="Excluir um administrador do sistema."
                color="text-red-400"
                action
              />

              {/* RELATORIO ADM */}
              <DashboardCard
                icon={<PiListChecksBold size={30} />}
                title="Relatório de Administradores"
                description="Visualizar lista completa de administradores."
                color="text-blue-700"
                action
              />

              {/* TOTAL ADM */}
              <DashboardCard
                icon={<PiUsersThreeBold size={30} />}
                title="Total de Administradores"
                value={totalAdmins}
                description="Número atual de administradores cadastrados."
                color="text-blue-700"
              />

            </div>

            {/* Modal de Cadastro de Admin */}
            <ModalCadastroAdmin
              isVisible={showModalCadastroAdmin}
              onClose={() => setShowModalCadastroAdmin(false)}
              onSuccess={handleCadastroAdminSucesso}
            />
            <ModalUpdateAdmin
              isVisible={showModalUpdateAdmin}
              onClose={() => setShowModalUpdateAdmin(false)}
              onSuccess={handleUpdateAdminSucesso}
            />
          </>

          //  SESSAO ALUNOS
        ) : abaAtiva === 'Alunos' ? (
          <>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200'>
                Gerenciamento de Alunos
              </h2>
            </div>

            {/* TOTAL ALUNOS */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              <DashboardCard
                icon={<PiStudentBold size={30} />}
                title="Total de Alunos"
                value={totalAlunos}
                description="Número atual de alunos cadastrados."
                color="text-blue-700"
              />

              {/* CADASTRAR ALUNO */}
              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Cadastrar Aluno"
                description="Adicionar um novo estudante ao sistema."
                onClick={() => setShowModalCadastro(true)}
                color="text-blue-700"
                action
              />

              {/* RELATORIO ALUNOS */}
              <DashboardCard
                icon={<PiListChecksBold size={30} />}
                title="Relatório de Alunos"
                description="Visualizar lista completa de alunos."
                onClick={() => setShowModalRelatorioAlunos(true)}
                color="text-blue-700"
                action
              />

              {/* ATUALIZAR CADASTRO */}
              <DashboardCard
                icon={<PiPencilSimpleBold size={30} />}
                title="Atualizar Cadastro"
                description="Editar informações de um aluno existente."
                onClick={() => setShowModalUpdateAluno(true)}
                color="text-blue-700"
                action
              />

              {/* EXCLUIR ALUNO */}
              <DashboardCard
                icon={<PiTrashBold size={30} />}
                title="Excluir Aluno"
                description="Remover um aluno do sistema."
                onClick={() => setShowModalExcluirAluno(true)}
                color="text-red-400"
                action
              />

              {/* HISTÓRICO DE ALUNO */}
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
              isVisible={showModalRelatorioAlunos}
              onClose={() => setShowModalRelatorioAlunos(false)}
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

          // SESSÃO RESPONSAVÉIS
        ) : abaAtiva === 'Responsáveis' ? (
          <>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200'>
                Gerenciamento de Responsáveis
              </h2>
            </div>

            {/* TOTAL RESPONSAVEIS */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              <DashboardCard
                icon={<MdPeopleAlt size={30} />}
                title="Total de Responsáveis"
                value={responsaveis.length}
                description="Número atual de responsáveis cadastrados."
                color="text-blue-700"
              />

              {/* CADASTRAR RESPONSAVL */}
              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Cadastrar Responsável"
                description="Adicionar um novo responsável ao sistema."
                onClick={() => setShowModalCadastroResponsavel(true)}
                color="text-blue-700"
                action
              />

              {/* RELATORIO DE RESPONSAVEIS */}
              <DashboardCard
                icon={<PiListChecksBold size={30} />}
                title="Relatório de Responsáveis"
                description="Visualizar lista completa de responsáveis."
                onClick={() => setShowModalRelatorioResponsaveis(true)}
                color="text-blue-700"
                action
              />

              {/* ATUALIZAR CADASTRO */}
              <DashboardCard
                icon={<PiPencilSimpleBold size={30} />}
                title="Atualizar Cadastro"
                description="Editar informações de um responsável existente."
                onClick={() => setShowModalUpdateResponsavel(true)}
                color="text-blue-700"
                action
              />

              {/* EXCLUIR TOTAL */}
              <DashboardCard
                icon={<PiTrashBold size={30} />}
                title="Excluir Responsável"
                description="Remover um responsável do sistema."
                onClick={() => setShowModalExcluirResponsavel(true)}
                color="text-red-400"
                action
              />
            </div>

            {/* Modals */}
            <ModalCadastroResponsavel
              isVisible={showModalCadastroResponsavel}
              onClose={() => setShowModalCadastroResponsavel(false)}
              onSuccess={handleCadastroResponsavelSucesso}
            />
            <ModalRelatorioResponsaveis
              isVisible={showModalRelatorioResponsaveis}
              onClose={() => setShowModalRelatorioResponsaveis(false)}
              responsaveis={responsaveis}
            />
            <ModalUpdateResponsavel
              isVisible={showModalUpdateResponsavel}
              onClose={() => setShowModalUpdateResponsavel(false)}
              onSuccess={handleUpdateResponsavelSucesso}
            />
            <ModalExcluirResponsavel
              isVisible={showModalExcluirResponsavel}
              onClose={() => setShowModalExcluirResponsavel(false)}
              onSuccess={handleExcluirResponsavelSucesso}
            />
          </>
        ) : (
          <div className='text-slate-400 p-8 text-center'>
            Seção ainda em desenvolvimento.
          </div>
        )}
      </section>
    </div>
  );
}