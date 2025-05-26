import DashboardCard from '../Components/DashboardCard/Dashboard';
import { CiViewList } from "react-icons/ci";

export default function contato() {
    return (
        <>
            <div className='grid grid-cols-4 grid-start-2'>

                <div></div>
                <DashboardCard
                    icon={<CiViewList size={30} />}
                    title=""
                    description="Adicionar um novo estudante ao sistema."
                    value={1}
                    // onClick={() => setShowModalCadastro(true)}
                    color="text-blue-700"
                    
                    />
            
                <DashboardCard
                    // icon={<PiListChecksBold size={30} />}
                    title="Relatório de Alunos"
                    description="Visualizar lista completa de alunos."
                    // onClick={() => setShowModalRelatorio(true)}
                    color="text-blue-700"
                    action
                />
            </div>
        </>
    )
}