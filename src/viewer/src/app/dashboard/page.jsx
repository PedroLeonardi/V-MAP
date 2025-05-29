'use client';
import { useEffect, useState } from 'react';

//modulos
import axios from 'axios';


// icons
import { FaLocationDot, FaChartBar } from "react-icons/fa6";
import { PiStudentBold, PiPlusCircleBold, PiPencilSimpleBold, PiTrashBold, PiListChecksBold } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { IoBusSharp } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";

//card
import DashboardCard from '../Components/DashboardCard/Dashboard';

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
import ModalContatoAlunos from '../Components/Modals/ModalContato';

// Fetch com banco de dados Dinamico
import useFetchTotalAlunos from '../Hooks/TotalAlunos'
import useFetchTotalResponsaveis from '../Hooks/TotalResponsavel'
import useFetchTotalContatos from '../Hooks/TotalContatos'


// menus "sessões"
const menu = [
  { nome: 'Administração', icon: <FiSettings size={18} /> },
  { nome: 'Rotas', icon: <FaLocationDot size={18} /> },
  { nome: 'Alunos', icon: <PiStudentBold size={18} /> },
  { nome: 'Responsáveis', icon: <MdPeopleAlt size={18} /> },
  { nome: 'Veículos', icon: <IoBusSharp size={18} /> },
  { nome: 'Motoristas', icon: <HiUser size={18} /> },
  { nome: 'Contatos', icon: <IoIosMail size={18} /> },
];

export default function PageAdmin() {
  // set para navbar de sessões
  const [abaAtiva, setAbaAtiva] = useState('Alunos');

  // states dos modals
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
  const [showModalRelatorioContatos, setShowModalRelatorioContatos] = useState(false);

  

  const { totalAlunos, refetchAlunos } = useFetchTotalAlunos();
  
  const handleAluno = async () => {
    await refetchAlunos();
  };

  const {totalResponsaveis, refetchResponsaveis} = useFetchTotalResponsaveis();
  const handleResponsveis = async () => {
    await refetchResponsaveis();
  };

  const { dataContato, totalContato, refetchContato} = useFetchTotalContatos();
  const handleContato = async () => {
    await refetchContato();
  };

// -================================================================================================================================
  const changeStatus = async (id_mensagem_suporte) => {
    try {
        axios.put(`http://localhost:3001/contato/${id_mensagem_suporte}`).then(response => {console.log(response.data)})
    } catch (err) {
        console.error("Houve um erro ao ataulizar o status: ", err)
    }
}

// ==================================================================================================================================
  // const handle

  // useEffect(()=>{
  //   setNumberAlunos()
  // },[numberAlunos])

  return (
    <div className='min-h-screen bg-slate-900 text-gray-100 p-4 sm:p-8 font-sans'>

      {/* meu header */}
      <header className="mb-8">
        <h1 className='font-bold text-3xl sm:text-4xl text-white'>Painel de Coordenação</h1>
        <p className="text-slate-400 mt-1">Gerenciamento de rotas, alunos, responsáveis e mais.</p>
      </header>

      {/* minha nav de sessões */}
      <nav className='mb-10 pb-4 border-b border-slate-700'>
        <ul className='flex flex-wrap gap-3 sm:gap-5'>
          {menu.map((item) => (
            <li key={item.nome}>
              <button
                onClick={() => setAbaAtiva(item.nome)}
                className={`flex items-center gap-2 p-3 px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200
                  ${abaAtiva === item.nome
                    // aq sao meus sets 
                    ? 'bg-blue-900 text-white shadow-md scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
              >{item.icon} {item.nome}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* enfim aq estou começando a mexer nas sessões */}
      <section>
        {abaAtiva === 'Administração' && (
          <>

            {/* titulo de cada sessão */}
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-8'>Gerenciamento de Administradores</h2>

            {/* div para abrigar meus cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

              {/* card cadastro adm */}
              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Cadastrar Administrador"
                description="Adicionar um novo administrador ao sistema."
                onClick={() => setShowModalCadastroAdmin(true)}
                color="text-blue-700"
                action
              />

              {/* card atualizar cadastro */}
              <DashboardCard
                icon={<PiPencilSimpleBold size={30} />}
                title="Atualizar Cadastro"
                description="Editar informações de um administrador."
                onClick={() => setShowModalUpdateAdmin(true)}
                color="text-blue-700"
                action
              />

              {/* remover adm */}
              <DashboardCard
                icon={<PiTrashBold size={30} />}
                title="Remover Administrador"
                description="Excluir um administrador do sistema."
                color="text-red-400"
                action
              />

              {/* relatorio adm */}
              <DashboardCard
                icon={<PiListChecksBold size={30} />}
                title="Relatório de Administradores"
                description="Visualizar lista completa de administradores."
                onClick={() => setShowModalRelatorioAdmin(true)}
                color="text-blue-700"
                action
              />
            </div>

            {/* modals para cada card
            nao é necessariamente importante */}
            <ModalCadastroAdmin
              isVisible={showModalCadastroAdmin}
              onClose={() => setShowModalCadastroAdmin(false)}

            />
            <ModalUpdateAdmin
              isVisible={showModalUpdateAdmin}
              onClose={() => setShowModalUpdateAdmin(false)}
            />
            <ModalRelatorioAdm
              isVisible={showModalRelatorioAdmin}
              onClose={() => setShowModalRelatorioAdmin(false)}
            />
          </>
        )}

        {abaAtiva === 'Alunos' && (
          <>

            {/* titulo da sessao */}
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-8'>Gerenciamento de Alunos</h2>

            {/* div para meus cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

              {/* cadastrar aluno */}

              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Alunos Totais"
                value = {totalAlunos}
                description="numero total de alunos cadastrados."
                // onClick={() => setShowModalCadastro(true)}
                color="text-blue-700"
                action
              />


              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Cadastrar Aluno"
                description="Adicionar um novo estudante ao sistema."
                onClick={() => setShowModalCadastro(true)}
                color="text-blue-700"
                action
              />

              {/* table dos alunos */}
              <DashboardCard
                icon={<PiListChecksBold size={30} />}
                title="Relatório de Alunos"
                description="Visualizar lista completa de alunos."
                onClick={() => setShowModalRelatorioAlunos(true)}
                color="text-blue-700"
                action
              />
              {/* atualizar cadastro */}
              <DashboardCard
                icon={<PiPencilSimpleBold size={30} />}
                title="Atualizar Cadastro"
                description="Editar informações de um aluno existente."
                onClick={() => setShowModalUpdateAluno(true)}
                color="text-blue-700"
                action
              />

              {/* delete aluno */}
              <DashboardCard
                icon={<PiTrashBold size={30} />}
                title="Excluir Aluno"
                description="Remover um aluno do sistema."
                onClick={() => setShowModalExcluirAluno(true)}
                color="text-red-400"
                action
              />



            </div>

            {/*  modals*/}
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
              
            />
          </>
        )}

        {abaAtiva === 'Responsáveis' && (
          <>

            {/* titulo da sessao */}
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-200 mb-8'>Gerenciamento de Responsáveis</h2>
            {/* div para cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

              {/* Card para visualizar total responsaveis */}
              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Total de Responsaveis"
                value = {totalResponsaveis}
                description="Numero total de responsaveis cadastrados."
                // onClick={() => setShowModalCadastroResponsavel(true)}
                color="text-blue-700"
                action
              />

              {/* card cadastrar funcionario */}
              <DashboardCard
                icon={<PiPlusCircleBold size={30} />}
                title="Cadastrar Responsável"
                description="Adicionar um novo responsável ao sistema."
                onClick={() => setShowModalCadastroResponsavel(true)}
                color="text-blue-700"
                action
              />

              {/* table de responsaveis */}
              <DashboardCard
                icon={<PiListChecksBold size={30} />}
                title="Relatório de Responsáveis"
                description="Visualizar lista completa de responsáveis."
                onClick={() => setShowModalRelatorioResponsaveis(true)}
                color="text-blue-700"
                action
              />

              {/* update responsavel */}
              <DashboardCard
                icon={<PiPencilSimpleBold size={30} />}
                title="Atualizar Responsável"
                description="Editar dados de um responsável existente."
                onClick={() => setShowModalUpdateResponsavel(true)}
                color="text-blue-700"
                action
              />

              {/* delete responsavel */}
              <DashboardCard
                icon={<PiTrashBold size={30} />}
                title="Excluir Responsável"
                description="Remover um responsável do sistema."
                onClick={() => setShowModalExcluirResponsavel(true)}
                color="text-red-400"
                action
              />
            </div>

            {/* modals para ativação */}
            <ModalCadastroResponsavel
              isVisible={showModalCadastroResponsavel}
              onClose={() => setShowModalCadastroResponsavel(false)}
              onSuccess={handleResponsveis}
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
              onSuccess={handleResponsveis}
            />
          </>
        )}

        {abaAtiva === 'Contatos' && (


                  <>
                      <div className='grid grid-cols-4 grid-start-2'>
          
                          <div></div>
                          <DashboardCard
                              icon={<FiSettings size={30} />}
                              title=""
                              description="Mensagens não respondidas"
                              value={totalContato}
                              // onClick={() => setShowModalCadastro(true)}
                              color="text-blue-700"
          
                          />
          
                          <DashboardCard
                              // icon={<PiListChecksBold size={30} />}
                              title="Relatório de Mensagens"
                              description="Visualizar mensagens já respondidas e ainda pendentes"
                              onClick={() => setShowModalRelatorioContatos(true)}
                              color="text-blue-700"
                              action
                          />
                      </div>
                  
                      <ModalContatoAlunos
                          isVisible={showModalRelatorioContatos}
                          onClose={() => setShowModalRelatorioContatos(false)}
                      />
                      {console.log(dataContato)}
                      <div>
                      <div className="overflow-x-auto w-[85%] ">
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
                                      dataContato.map((contato) => {
          
                                          return (
                                              <tr key={contato.id_mensagem_suporte} className="hover:bg-gray-700">
                                                  <td className="px-4 py-2 border border-gray-600">{contato.nome}</td>
                                                  <td className="px-4 py-2 border border-gray-600">{contato.email}</td>
                                                  <td className="px-4 py-2 border border-gray-600">{contato.mensagem}</td>
                                                  <td className="px-4 py-2 border border-gray-600"><button onClick={() => {changeStatus(contato.id_mensagem_suporte)}} className='bg-red-500'>Responder</button></td>
                                              </tr>
                                          );
                                      })}
                              
          
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </>
        )}
      </section>
    </div>
  );
}
