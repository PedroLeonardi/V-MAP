'use client';
import { useState } from "react";
import { toast } from 'sonner';
import axios from 'axios';

// icons
import { FaLocationDot } from "react-icons/fa6";
import { PiStudentBold, PiPlusCircleBold, PiPencilSimpleBold, PiTrashBold, PiListChecksBold } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { IoBusSharp } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { IoIosMail } from "react-icons/io";
import { TbNumber } from "react-icons/tb";

// components
import DashboardCard from '../Components/DashboardCard/Card';
import ProtegendoRota from '../Components/ProtegendoRota/ProtectRoute';
import ChatBox from '../Components/Chatbot/Chatbot'
import Header from "../Components/Header/Header";

// modals
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
import ModalRelatorioAdm from '../Components/Modals/ModalRelatorioAdm';
import ModalExcluirAdm from '../Components/Modals/ModalExcluirAdm';
import ModalCadastroMotorista from '../Components/Modals/ModalCadastroMotorista';
import ModalRelatorioMotorista from '../Components/Modals/ModalRelatorioMotorista';
import ModalExcluirMotorista from '../Components/Modals/ModalExcluirMotorista';
import ModalUpdateMotorista from '../Components/Modals/ModalUpdateMotorista';
import ModalContatoAlunos from '../Components/Modals/ModalContato';
import ModalRelatorioVeiculo from '../Components/Modals/ModalRelatorioVeiculo';
import ModalRelatorioRotas from '../Components/Modals/ModalRelatorioRota';
import ModalHistoricoAdm from "../Components/Modals/ModalHistoricoAdm";

// hooks
import useFetchTotalAlunos from '../Hooks/TotalAlunos';
import useFetchTotalResponsaveis from '../Hooks/TotalResponsavel';
import useFetchTotalContatos from '../Hooks/TotalContatos';
import useFetchTotalAdm from '../Hooks/TotalAdm';
import useFetchTotalMotorista from "../Hooks/TotalMotoristas";
import useFetchTotalVeiculo from "../Hooks/TotalVeiculos";
import useFetchTotalRotas from "../Hooks/TotalRotas";
import Footer from "../Components/Footer/Footer";

const menu = [
  { nome: 'Administradores', icon: <MdPeopleAlt size={18} />, sectionId: 'Administradores' },
  { nome: 'Responsáveis', icon: <MdPeopleAlt size={18} />, sectionId: 'Responsáveis' },
  { nome: 'Alunos', icon: <PiStudentBold size={18} />, sectionId: 'Alunos' },
  { nome: 'Motoristas', icon: <HiUser size={18} />, sectionId: 'Motoristas' },
  { nome: 'Veículos', icon: <IoBusSharp size={18} />, sectionId: 'Veículos' },
  { nome: 'Percursos', icon: <FaLocationDot size={18} />, sectionId: 'Percursos' },
  { nome: 'Contatos', icon: <IoIosMail size={18} />, sectionId: 'Contatos' },
];

const cardBaseStyle = "bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg hover:shadow-sky-700/20 transition-all duration-200 flex flex-col min-h-[180px] sm:min-h-[200px]";
const cardActionStyle = "cursor-pointer hover:border-sky-500 active:bg-slate-700/70";
const cardIconColor = "text-sky-400";
const cardIconSize = 30;
const cardTitleStyle = "font-semibold text-slate-100 text-base sm:text-lg mb-1 mt-2";
const cardDescriptionStyle = "text-slate-400 text-xs sm:text-sm flex-grow";
const cardValueStyle = `font-bold text-2xl sm:text-3xl mb-1 ${cardIconColor}`;

export default function PageAdmin() {
  const [abaAtiva, setAbaAtiva] = useState('Administradores');

  // modal states
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
  const [showModalRelatorioAdmin, setShowModalRelatorioAdmin] = useState(false);
  const [showModalExcluirAdmin, setShowModalExcluirAdmin] = useState(false);
  const [showModalCadastroMotorista, setShowModalCadastroMotorista] = useState(false);
  const [showModalRelatorioMotorista, setShowModalRelatorioMotorista] = useState(false);
  const [showModalExcluirMotorista, setShowModalExcluirMotorista] = useState(false);
  const [showModalUpdateMotorista, setShowModalUpdateMotorista] = useState(false);
  const [showModalRelatorioContatos, setShowModalRelatorioContatos] = useState(false);
  const [showModalRelatorioVeiculos, setShowModalRelatorioVeiculos] = useState(false);
  const [showModalRelatorioRotas, setShowModalRelatorioRotas] = useState(false);
  const [showModalHistorico, setShowModalHistorico] = useState(false);

  // data hooks
  const { totalAlunos, refetchAlunos } = useFetchTotalAlunos();
  const { totalResponsaveis, refetchResponsaveis } = useFetchTotalResponsaveis();
  const { totalAdm, refetchAdm } = useFetchTotalAdm();
  const { totalMotorista, refetchMotoristas } = useFetchTotalMotorista();
  const { totalVeiculo, refetchVeiculos } = useFetchTotalVeiculo();
  const { totalRotas, refetchRotas } = useFetchTotalRotas();
  const { dataContato, totalContato, refetchContato } = useFetchTotalContatos();

  // data handlers
  const handleAluno = async () => { await refetchAlunos(); };
  const handleResponsaveis = async () => { await refetchResponsaveis(); };
  const handleAdm = async () => { await refetchAdm(); };
  const handleMotorista = async () => { await refetchMotoristas(); };
  const handleVeiculo = async () => { await refetchVeiculos(); };
  const handleRota = async () => { await refetchRotas(); };
  const handleContato = async () => { await refetchContato(); };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const changeStatus = async (id_mensagem_suporte) => {
    try {
      await axios.put(`http://localhost:3001/contato/${id_mensagem_suporte}`);
      toast.success("Status da mensagem alterado!");
      await sleep(300);
      await handleContato();
    } catch (err) {
      toast.error("Erro ao alterar status.");
      console.log("Houve um erro ao atualizar o status: ", err);
    }
  };

  return (
    <ProtegendoRota requiredRole='admin'>
      <div className="sm:hidden">
        <Header />
      </div>

      <div className="flex min-h-screen w-full bg-slate-900">
        <div className="hidden md:block">
          <Sidebar />
        </div>


        <div className='flex-1 min-h-screen text-slate-300 p-4 sm:p-6 lg:p-8 font-sans overflow-y-auto'>
          <header className="mb-8">
            <h1 className='font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white underline underline-offset-6 font-mono'>Painel de Coordenação</h1>
          </header>

          <nav className='mb-10 pb-4 border-b border-slate-700'>
            <ul className='flex flex-wrap gap-2 sm:gap-3 md:gap-4'>
              {menu.map((item) => (
                <li key={item.sectionId}>
                  <button
                    onClick={() => setAbaAtiva(item.sectionId)}
                    className={`group flex items-center gap-x-2 py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg text-xs sm:text-sm font-extrabold transition-all duration-150 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer
                    ${abaAtiva === item.sectionId
                        ? 'bg-sky-600 text-white shadow-sm shadow-sky-700/40'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                  >
                    <span className={`text-lg ${abaAtiva === item.sectionId ? 'text-white' : 'text-slate-400 group-hover:text-sky-400 transition-colors'}`}>
                      {item.icon}
                    </span>
                    {item.nome}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <section>
            {abaAtiva === 'Administradores' && (
              <>
                <h2 className='text-xl sm:text-2xl font-bold text-sky-400 mb-6 sm:mb-8 border-b-2 md:w-110'>Gerenciamento de Administradores</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 ">
                  <DashboardCard
                    cardStyle={cardBaseStyle} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle} valueStyle={cardValueStyle}
                    icon={<TbNumber size={cardIconSize} />}
                    title="Total de Admins"
                    description="Número atual de administradores ativos no sistema."
                    value={totalAdm}
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiPlusCircleBold size={cardIconSize} />}
                    title="Novo Administrador"
                    description="Clique para adicionar um novo perfil de administrador."
                    onClick={() => setShowModalCadastroAdmin(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiListChecksBold size={cardIconSize} />}
                    title="Listar Administradores"
                    description="Acesse o relatório completo de administradores."
                    onClick={() => setShowModalRelatorioAdmin(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiPencilSimpleBold size={cardIconSize} />}
                    title="Editar Admin"
                    description="Modifique informações de um administrador existente."
                    onClick={() => setShowModalUpdateAdmin(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle} hover:border-red-500 group`} iconColor="text-red-400 group-hover:text-red-500" titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiTrashBold size={cardIconSize} />}
                    title="Excluir Admin"
                    description="Remova um administrador do sistema (ação irreversível)."
                    onClick={() => setShowModalExcluirAdmin(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle} hover:border-red-500 group`} iconColor="text-red-400 group-hover:text-red-500" titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiTrashBold size={cardIconSize} />}
                    title="Historico"
                    description="Visualize o historico de alterações"
                    onClick={() => setShowModalHistorico(true)}
                    action
                  />
                </div>
                <ModalCadastroAdmin isVisible={showModalCadastroAdmin} onClose={() => setShowModalCadastroAdmin(false)} onSuccess={handleAdm} />
                <ModalUpdateAdmin isVisible={showModalUpdateAdmin} onClose={() => setShowModalUpdateAdmin(false)} />
                <ModalRelatorioAdm isVisible={showModalRelatorioAdmin} onClose={() => setShowModalRelatorioAdmin(false)} />
                <ModalExcluirAdm isVisible={showModalExcluirAdmin} onClose={() => setShowModalExcluirAdmin(false)} onSuccess={handleAdm} />
                <ModalHistoricoAdm isVisible={showModalHistorico} onClose={() => setShowModalHistorico(false)} />
              </>
            )}
            {abaAtiva === 'Alunos' && (
              <>
                <h2 className='text-xl sm:text-2xl font-bold text-sky-400 mb-6 sm:mb-8 border-b-2 md:w-85'>Gerenciamento de Alunos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 ">
                  <DashboardCard
                    cardStyle={cardBaseStyle} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle} valueStyle={cardValueStyle}
                    icon={<TbNumber size={cardIconSize} />}
                    title="Total de Alunos"
                    description="Número de alunos atualmente matriculados."
                    value={totalAlunos}
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiPlusCircleBold size={cardIconSize} />}
                    title="Cadastrar Aluno"
                    description="Adicione um novo estudante ao sistema."
                    onClick={() => setShowModalCadastro(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiListChecksBold size={cardIconSize} />}
                    title="Listar Alunos"
                    description="Consulte a lista completa de alunos."
                    onClick={() => setShowModalRelatorioAlunos(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiPencilSimpleBold size={cardIconSize} />}
                    title="Editar Aluno"
                    description="Atualize os dados cadastrais de um aluno."
                    onClick={() => setShowModalUpdateAluno(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle} hover:border-red-500 group`} iconColor="text-red-400 group-hover:text-red-500" titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiTrashBold size={cardIconSize} />}
                    title="Excluir Aluno"
                    description="Remova um aluno do sistema (cuidado!)."
                    onClick={() => setShowModalExcluirAluno(true)}
                    action
                  />
                </div>
                <ModalCadastro isVisible={showModalCadastro} onClose={() => setShowModalCadastro(false)} onSuccess={handleAluno} />
                <ModalRelatorioAlunos isVisible={showModalRelatorioAlunos} onClose={() => setShowModalRelatorioAlunos(false)} />
                <ModalUpdateAluno isVisible={showModalUpdateAluno} onClose={() => setShowModalUpdateAluno(false)} />
                <ModalExcluirAluno isVisible={showModalExcluirAluno} onClose={() => setShowModalExcluirAluno(false)} onSuccess={handleAluno} />
              </>
            )}

            {abaAtiva === 'Responsáveis' && (
              <>
                <h2 className='text-xl sm:text-2xl font-bold text-sky-400 mb-6 sm:mb-8 border-b-2 md:w-105'>Gerenciamento de Responsáveis</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 ">
                  <DashboardCard
                    cardStyle={cardBaseStyle} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle} valueStyle={cardValueStyle}
                    icon={<TbNumber size={cardIconSize} />}
                    title="Total de Responsáveis"
                    description="Número de responsáveis com cadastro ativo."
                    value={totalResponsaveis}
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiPlusCircleBold size={cardIconSize} />}
                    title="Novo Responsável"
                    description="Cadastre um novo responsável por aluno."
                    onClick={() => setShowModalCadastroResponsavel(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiListChecksBold size={cardIconSize} />}
                    title="Listar Responsáveis"
                    description="Visualize todos os responsáveis cadastrados."
                    onClick={() => setShowModalRelatorioResponsaveis(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiPencilSimpleBold size={cardIconSize} />}
                    title="Editar Responsável"
                    description="Atualize as informações de um responsável."
                    onClick={() => setShowModalUpdateResponsavel(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle} hover:border-red-500 group`} iconColor="text-red-400 group-hover:text-red-500" titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiTrashBold size={cardIconSize} />}
                    title="Excluir Responsável"
                    description="Remova o cadastro de um responsável."
                    onClick={() => setShowModalExcluirResponsavel(true)}
                    action
                  />
                </div>
                <ModalCadastroResponsavel isVisible={showModalCadastroResponsavel} onClose={() => setShowModalCadastroResponsavel(false)} onSuccess={handleResponsaveis} />
                <ModalRelatorioResponsaveis isVisible={showModalRelatorioResponsaveis} onClose={() => setShowModalRelatorioResponsaveis(false)} />
                <ModalUpdateResponsavel isVisible={showModalUpdateResponsavel} onClose={() => setShowModalUpdateResponsavel(false)} />
                <ModalExcluirResponsavel isVisible={showModalExcluirResponsavel} onClose={() => setShowModalExcluirResponsavel(false)} onSuccess={handleResponsaveis} />
              </>
            )}

            {abaAtiva === 'Motoristas' && (
              <>
                <h2 className='text-xl sm:text-2xl font-bold text-sky-400 mb-6 sm:mb-8 border-b-2 md:w-95'>Gerenciamento de Motoristas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 ">
                  <DashboardCard
                    cardStyle={cardBaseStyle} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle} valueStyle={cardValueStyle}
                    icon={<TbNumber size={cardIconSize} />}
                    title="Total de Motoristas"
                    description="Quantidade de motoristas registrados na frota."
                    value={totalMotorista}
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiPlusCircleBold size={cardIconSize} />}
                    title="Novo Motorista"
                    description="Adicione um novo motorista à equipe."
                    onClick={() => setShowModalCadastroMotorista(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiListChecksBold size={cardIconSize} />}
                    title="Listar Motoristas"
                    description="Consulte os dados de todos os motoristas."
                    onClick={() => setShowModalRelatorioMotorista(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiPencilSimpleBold size={cardIconSize} />}
                    title="Editar Motorista"
                    description="Atualize o cadastro de um motorista."
                    onClick={() => setShowModalUpdateMotorista(true)}
                    action
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle} hover:border-red-500 group`} iconColor="text-red-400 group-hover:text-red-500" titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiTrashBold size={cardIconSize} />}
                    title="Excluir Motorista"
                    description="Remova um motorista da equipe."
                    onClick={() => setShowModalExcluirMotorista(true)}
                    action
                  />
                </div>
                <ModalCadastroMotorista isVisible={showModalCadastroMotorista} onClose={() => setShowModalCadastroMotorista(false)} onSuccess={handleMotorista} />
                <ModalRelatorioMotorista isVisible={showModalRelatorioMotorista} onClose={() => setShowModalRelatorioMotorista(false)} />
                <ModalUpdateMotorista isVisible={showModalUpdateMotorista} onClose={() => setShowModalUpdateMotorista(false)} />
                <ModalExcluirMotorista isVisible={showModalExcluirMotorista} onClose={() => setShowModalExcluirMotorista(false)} onSuccess={handleMotorista} />
              </>
            )}

            {abaAtiva === 'Veículos' && (
              <>
                <h2 className='text-xl sm:text-2xl font-bold text-sky-400 mb-6 sm:mb-8 border-b-2 md:w-88'>Gerenciamento de Veículos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 ">
                  <DashboardCard
                    cardStyle={cardBaseStyle} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle} valueStyle={cardValueStyle}
                    icon={<TbNumber size={cardIconSize} />}
                    title="Total de Veículos"
                    description="Frota total de veículos disponíveis."
                    value={totalVeiculo}
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiListChecksBold size={cardIconSize} />}
                    title="Listar Veículos"
                    description="Acesse o inventário completo de veículos."
                    onClick={() => setShowModalRelatorioVeiculos(true)}
                    action
                  />

                </div>
                <ModalRelatorioVeiculo isVisible={showModalRelatorioVeiculos} onClose={() => setShowModalRelatorioVeiculos(false)} onSuccess={handleVeiculo} />
              </>
            )}

            {abaAtiva === 'Percursos' && (
              <>
                <h2 className='text-xl sm:text-2xl font-bold text-sky-400 mb-6 sm:mb-8 border-b-2 md:w-90'>Gerenciamento de Percursos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 ">
                  <DashboardCard
                    cardStyle={cardBaseStyle} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle} valueStyle={cardValueStyle}
                    icon={<TbNumber size={cardIconSize} />}
                    title="Total de Percursos"
                    description="Número de rotas de transporte definidas."
                    value={totalRotas}
                  />
                  <DashboardCard
                    cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                    icon={<PiListChecksBold size={cardIconSize} />}
                    title="Listar Percursos"
                    description="Visualize todas as rotas e seus detalhes."
                    onClick={() => setShowModalRelatorioRotas(true)}
                    action
                  />
                  {/* Cards de Cadastrar, Editar, Excluir Rota podem ser adicionados aqui */}
                </div>
                <ModalRelatorioRotas isVisible={showModalRelatorioRotas} onClose={() => setShowModalRelatorioRotas(false)} />
              </>
            )}

            {abaAtiva === 'Contatos' && (
              <>
                <h2 className='text-xl sm:text-2xl font-bold text-sky-400 mb-6 sm:mb-8 border-b-2 md:w-80'>Central de Atendimento</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 items-stretch'>
                  <div className="flex">
                    <DashboardCard
                      cardStyle={`${cardBaseStyle} w-full`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle} valueStyle={cardValueStyle}
                      icon={<TbNumber size={cardIconSize} />}
                      title="Mensagens Pendentes"
                      description="Número de contatos aguardando sua resposta."
                      value={totalContato}
                    />
                  </div>
                  <div className="flex">
                    <DashboardCard
                      cardStyle={`${cardBaseStyle} ${cardActionStyle} w-full`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                      icon={<PiListChecksBold size={cardIconSize} />}
                      title="Ver Todas as Mensagens"
                      description="Acesse o histórico completo de contatos."
                      onClick={() => setShowModalRelatorioContatos(true)}
                      action
                    />
                  </div>
                </div>

                <ModalContatoAlunos isVisible={showModalRelatorioContatos} onClose={() => setShowModalRelatorioContatos(false)} />

                <div className="bg-slate-800/90 border border-slate-700 rounded-xl shadow-lg overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-slate-300">
                    <thead className="bg-slate-700/60 text-slate-400 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 sm:px-5 border-b border-slate-600 font-semibold">Nome</th>
                        <th className="px-4 py-3 sm:px-5 border-b border-slate-600 font-semibold">Email</th>
                        <th className="px-4 py-3 sm:px-5 border-b border-slate-600 font-semibold">Mensagem</th>
                        <th className="px-4 py-3 sm:px-5 border-b border-slate-600 font-semibold text-center">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(dataContato) && dataContato.length > 0 ? (
                        dataContato.map((contato) => (
                          <tr key={contato.id_mensagem_suporte} className="hover:bg-slate-700/70 border-b border-slate-700 last:border-b-0 transition-colors duration-150">
                            <td className="px-4 py-3 sm:px-5 whitespace-nowrap">{contato.nome}</td>
                            <td className="px-4 py-3 sm:px-5 whitespace-nowrap">{contato.email}</td>
                            <td className="px-4 py-3 sm:px-5 max-w-xs sm:max-w-sm md:max-w-md truncate" title={contato.mensagem}>{contato.mensagem}</td>
                            <td className="px-4 py-3 sm:px-5 whitespace-nowrap text-center">
                              <button
                                onClick={() => changeStatus(contato.id_mensagem_suporte)}
                                className='bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 
                                           text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md 
                                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500
                                           transition-all duration-150 ease-in-out text-xs sm:text-sm transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg'
                              >
                                Marcar como Lido
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-8 sm:py-10 text-slate-500">
                            Nenhuma mensagem pendente no momento.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </div>
        <ChatBox />
      </div>
    </ProtegendoRota>
  );
}