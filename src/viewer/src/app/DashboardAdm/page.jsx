'use client';
import { useState } from "react";
import { toast } from 'sonner';
import axios from 'axios';

// icons
import { FaLocationDot, FaChartBar } from "react-icons/fa6";
import { PiStudentBold, PiPlusCircleBold, PiPencilSimpleBold, PiTrashBold, PiListChecksBold } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { IoBusSharp } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { TbNumber } from "react-icons/tb";

// componentes
import DashboardCard from '../Components/DashboardCard/Dashboard';
import ProtegendoRota from '../Components/ProtegendoRota/ProtectRoute'

// modais
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

// hooks
import useFetchTotalAlunos from '../Hooks/TotalAlunos'
import useFetchTotalResponsaveis from '../Hooks/TotalResponsavel'
import useFetchTotalContatos from '../Hooks/TotalContatos'
import useFetchTotalAdm from '../Hooks/TotalAdm'

const menu = [
  { nome: 'Administradores', icon: <MdPeopleAlt size={18} /> },
  { nome: 'Responsáveis', icon: <MdPeopleAlt size={18} /> },
  { nome: 'Alunos', icon: <PiStudentBold size={18} /> },
  { nome: 'Motoristas', icon: <HiUser size={18} /> },
  { nome: 'Veículos', icon: <IoBusSharp size={18} /> },
  { nome: 'Rotas', icon: <FaLocationDot size={18} /> },
  { nome: 'Contatos', icon: <IoIosMail size={18} /> },
];

export default function PageAdmin() {
  // estados para abas e modais
  const [abaAtiva, setAbaAtiva] = useState('Administradores');
  
  // estados para modais
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

  // dados dos hooks
  const { totalAlunos, refetchAlunos } = useFetchTotalAlunos();
  const { totalResponsaveis, refetchResponsaveis } = useFetchTotalResponsaveis();
  const { totalAdm, refetchAdm } = useFetchTotalAdm();
  const { dataContato, totalContato, refetchContato } = useFetchTotalContatos();

  // handlers para atualização de dados
  const handleAluno = async () => {
    await refetchAlunos();
  };

  const handleResponsaveis = async () => {
    await refetchResponsaveis();
  };

  const handleAdm = async () => {
    await refetchAdm();
  };

  const handleContato = async () => {
    await refetchContato();
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const changeStatus = async (id_mensagem_suporte) => {
    try {
      await axios.put(`http://localhost:3001/contato/${id_mensagem_suporte}`);
      await sleep(500);
      await handleContato();
    } catch (err) {
      console.error("Houve um erro ao atualizar o status: ", err);
    }
  };

  return (
    <ProtegendoRota requiredRole='admin'>
      <div className='min-h-screen bg-slate-900 text-gray-100 p-4 sm:p-8 font-sans'>
   
        <header className="mb-8">
          <h1 className='font-bold text-3xl sm:text-4xl text-white'>Painel de Coordenação</h1>
          <p className="text-slate-400 mt-1">Gerenciamento de rotas, alunos, responsáveis e mais.</p>
        </header>

        <nav className='mb-10 pb-4 border-b border-slate-700'>
          <ul className='flex flex-wrap gap-3 sm:gap-5'>
            {menu.map((item) => (
              <li key={item.nome}>
                <button
                  onClick={() => setAbaAtiva(item.nome)}
                  className={`flex items-center gap-2 p-3 px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer
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

       <section>
        
          {abaAtiva === 'Administradores' && (
            <>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-8'>Gerenciamento de Administradores</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <DashboardCard
                  icon={<TbNumber size={30} />}
                  title="Total Administradores"
                  description="Total de administradores cadastrados."
                  value={totalAdm}
                  color="text-blue-700"
                />
                <DashboardCard
                  icon={<PiPlusCircleBold size={30} />}
                  title="Cadastrar Administrador"
                  description="Adicionar um novo administrador ao sistema."
                  onClick={() => setShowModalCadastroAdmin(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiPencilSimpleBold size={30} />}
                  title="Atualizar Cadastro"
                  description="Editar informações de um administrador."
                  onClick={() => setShowModalUpdateAdmin(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiTrashBold size={30} />}
                  title="Remover Administrador"
                  description="Excluir um administrador do sistema."
                  onClick={() => setShowModalExcluirAdmin(true)}
                  color="text-red-400"
                  action
                />
              </div>

              <ModalCadastroAdmin
                isVisible={showModalCadastroAdmin}
                onClose={() => setShowModalCadastroAdmin(false)}
                onSuccess={handleAdm}
              />
              <ModalUpdateAdmin
                isVisible={showModalUpdateAdmin}
                onClose={() => setShowModalUpdateAdmin(false)}
              />
              <ModalRelatorioAdm
                isVisible={showModalRelatorioAdmin}
                onClose={() => setShowModalRelatorioAdmin(false)}
              />
              <ModalExcluirAdm
                isVisible={showModalExcluirAdmin}
                onClose={() => setShowModalExcluirAdmin(false)}
                onSuccess={handleAdm}
              />
            </>
          )}

          {/* Seção Alunos */}
          {abaAtiva === 'Alunos' && (
            <>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-8'>Gerenciamento de Alunos</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <DashboardCard
                  icon={<TbNumber size={30} />}
                  title="Total de Alunos"
                  value={totalAlunos}
                  description="Número total de alunos cadastrados."
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
              </div>

              <ModalCadastro
                isVisible={showModalCadastro}
                onClose={() => setShowModalCadastro(false)}
                onSuccess={handleAluno}
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
                onSuccess={handleAluno}
              />
            </>
          )}

      
          {abaAtiva === 'Responsáveis' && (
            <>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-8'>Gerenciamento de Responsáveis</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <DashboardCard
                  icon={<TbNumber size={30} />}
                  title="Total de Responsáveis"
                  description="Número total de responsáveis cadastrados."
                  value={totalResponsaveis}
                  color="text-blue-700"
                />
                <DashboardCard
                  icon={<PiPlusCircleBold size={30} />}
                  title="Cadastrar Responsável"
                  description="Adicionar um novo responsável ao sistema."
                  onClick={() => setShowModalCadastroResponsavel(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiListChecksBold size={30} />}
                  title="Relatório de Responsáveis"
                  description="Visualizar lista completa de responsáveis."
                  onClick={() => setShowModalRelatorioResponsaveis(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiPencilSimpleBold size={30} />}
                  title="Atualizar Responsável"
                  description="Editar dados de um responsável existente."
                  onClick={() => setShowModalUpdateResponsavel(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiTrashBold size={30} />}
                  title="Excluir Responsável"
                  description="Remover um responsável do sistema."
                  onClick={() => setShowModalExcluirResponsavel(true)}
                  color="text-red-400"
                  action
                />
              </div>

              <ModalCadastroResponsavel
                isVisible={showModalCadastroResponsavel}
                onClose={() => setShowModalCadastroResponsavel(false)}
                onSuccess={handleResponsaveis}
              />
              <ModalRelatorioResponsaveis
                isVisible={showModalRelatorioResponsaveis}
                onClose={() => setShowModalRelatorioResponsaveis(false)}
              />
              <ModalUpdateResponsavel
                isVisible={showModalUpdateResponsavel}
                onClose={() => setShowModalUpdateResponsavel(false)}
              />
              <ModalExcluirResponsavel
                isVisible={showModalExcluirResponsavel}
                onClose={() => setShowModalExcluirResponsavel(false)}
                onSuccess={handleResponsaveis}
              />
            </>
          )}
          {abaAtiva === 'Motoristas' && (
            <>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-8'>Gerenciamento de Motoristas</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <DashboardCard
                  icon={<PiPlusCircleBold size={30} />}
                  title="Cadastrar Motorista"
                  description="Adicionar um novo motorista ao sistema."
                  onClick={() => setShowModalCadastroMotorista(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiListChecksBold size={30} />}
                  title="Relatório de Motoristas"
                  description="Visualizar lista completa de motoristas."
                  onClick={() => setShowModalRelatorioMotorista(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiPencilSimpleBold size={30} />}
                  title="Atualizar Motorista"
                  description="Editar dados de um motorista existente."
                  onClick={() => setShowModalUpdateMotorista(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiTrashBold size={30} />}
                  title="Excluir Motorista"
                  description="Remover um motorista do sistema."
                  onClick={() => setShowModalExcluirMotorista(true)}
                  color="text-red-400"
                  action
                />
              </div>

              <ModalCadastroMotorista
                isVisible={showModalCadastroMotorista}
                onClose={() => setShowModalCadastroMotorista(false)}
              />
              <ModalRelatorioMotorista
                isVisible={showModalRelatorioMotorista}
                onClose={() => setShowModalRelatorioMotorista(false)}
              />
              <ModalUpdateMotorista
                isVisible={showModalUpdateMotorista}
                onClose={() => setShowModalUpdateMotorista(false)}
              />
              <ModalExcluirMotorista
                isVisible={showModalExcluirMotorista}
                onClose={() => setShowModalExcluirMotorista(false)}
              />
            </>
          )}

          {abaAtiva === 'Veículos' && (
            <>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-8'>Gerenciamento de Veículos</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <DashboardCard
                  icon={<PiPlusCircleBold size={30} />}
                  title="Cadastrar Veículo"
                  description="Adicionar um novo veículo ao sistema."
                  onClick={() => setShowModalCadastroResponsavel(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiListChecksBold size={30} />}
                  title="Relatório de Veículos"
                  description="Visualizar lista completa de veículos."
                  onClick={() => setShowModalRelatorioResponsaveis(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiPencilSimpleBold size={30} />}
                  title="Atualizar Veículo"
                  description="Editar dados de um veículo existente."
                  onClick={() => setShowModalUpdateResponsavel(true)}
                  color="text-blue-700"
                  action
                />
                <DashboardCard
                  icon={<PiTrashBold size={30} />}
                  title="Excluir Veículo"
                  description="Remover um veículo do sistema."
                  onClick={() => setShowModalExcluirResponsavel(true)}
                  color="text-red-400"
                  action
                />
              </div>
            </>
          )}

          {abaAtiva === 'Contatos' && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <DashboardCard
                  icon={<TbNumber size={30} />}
                  title="Mensagens Pendentes"
                  value={totalContato}
                  description="Mensagens não respondidas"
                  color="text-blue-700"
                />
                <DashboardCard
                  icon={<PiListChecksBold size={30} />}
                  title="Relatório de Mensagens"
                  description="Visualizar mensagens já respondidas e pendentes"
                  onClick={() => setShowModalRelatorioContatos(true)}
                  color="text-blue-700"
                  action
                />
              </div>

              <ModalContatoAlunos
                isVisible={showModalRelatorioContatos}
                onClose={() => setShowModalRelatorioContatos(false)}
              />

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-white border border-gray-600">
                  <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-2 border border-gray-600">NOME</th>
                      <th className="px-4 py-2 border border-gray-600">EMAIL</th>
                      <th className="px-4 py-2 border border-gray-600">MENSAGEM</th>
                      <th className="px-4 py-2 border border-gray-600">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(dataContato) &&
                      dataContato.map((contato) => (
                        <tr key={contato.id_mensagem_suporte} className="hover:bg-gray-700">
                          <td className="px-4 py-2 border border-gray-600">{contato.nome}</td>
                          <td className="px-4 py-2 border border-gray-600">{contato.email}</td>
                          <td className="px-4 py-2 border border-gray-600">{contato.mensagem}</td>
                          <td className="px-4 py-2 border border-gray-600">
                            <button 
                              onClick={async () => { 
                                await changeStatus(contato.id_mensagem_suporte); 
                              }} 
                              className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors'
                            >
                              Responder
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>
    </ProtegendoRota>
  );
}