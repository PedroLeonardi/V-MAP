'use client'
import { use, useEffect, useState } from 'react';
import DashboardCard from '../Components/DashboardCard/Dashboard';
import { CiViewList } from "react-icons/ci";
import axios from 'axios';
import ModalContatoAlunos from '../Components/Modals/ModalContato';
import useFetchTotalContatos from '../Hooks/TotalContatos'

export default function contato() {
    // const [countContatos, setCountContatos] = useState(0)
    const [dataContatos, setDataContatos] = useState([])
    const [statusUseEffect, setStatusUseEffect] = useState([])
    const [showModalRelatorioContatos, setShowModalRelatorioContatos] = useState(false);


    useEffect(() => {
        const readContatos = async () => {
            try {
                const responseCount = await axios.get('http://localhost:3001/contato/0')
                setCountContatos(responseCount.data.mensagem.length)
            } catch (err) {
                console.error("Erro ao acessar a rota de contatos: ", err)
            } //============================================================================================POSSIVELMENTE REDUZIR
            try {
                const responseData = await axios.get('http://localhost:3001/contato/0')
                setDataContatos(responseData.data.mensagem)
            } catch (err) {
                console.error("Erro ao acessar a rota de contatos: ", err)
            }
        }
        readContatos()
    }, [statusUseEffect])

    const changeStatus = async (id_mensagem_suporte) => {
        try {
            axios.put(`http://localhost:3001/contato/${id_mensagem_suporte}`).then(response => {console.log(response.data)})
            setStatusUseEffect([])
        } catch (err) {
            console.error("Houve um erro ao ataulizar o status: ", err)
        }
    }

    return (
        <>
            <div className='grid grid-cols-4 grid-start-2'>

                <div></div>
                <DashboardCard
                    icon={<CiViewList size={30} />}
                    title=""
                    description="Mensagens não respondidas"
                    value={countContatos}
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
            {console.log(dataContatos)}
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
                            {dataContatos.map((contato) => {

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
    )

}