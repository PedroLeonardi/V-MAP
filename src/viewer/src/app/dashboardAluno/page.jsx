export default function DashAluno() {
    return (
        <main className="h-screen lg:h-screen bg-gradient-to-r from-gray-300 to-gray-400 overflow-hidden">
            <div className="hidden md:block text-black">
                <h1 className="pt-20 pl-20 text-xl md:text-4xl lg:text-7xl"> Bem vindo ao V-MAP</h1>
                <p className="pt-10 pl-20 flex md:text-lg lg:text-xl">O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a <br />
                rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os<br /> 
                responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais<br /> 
                segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.</p>
            </div>
            <div>
                <img className=" hidden md:flex md:pt-10 lg:pt-10 w-280 fixed" src="/Aluno.png" alt="aluno"></img>
            </div>
            <div className="block md:hidden lg:hidden text-black">
                <h1 className="pt-20 pl-1 text-md text-center"> Bem vindo ao V-MAP</h1>
                <p className="pt-10  pl-12 pr-12 flex text-sm text-center px-2">O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a <br />
                rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os<br /> 
                responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais<br /> 
                segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.</p>
            </div>
            <div>
                <img className=" block md:hidden lg:hiddden pt-65 w-[10%] fixed" src="/Aluno-2.png" alt="aluno"></img>
            </div>
        </main>
    )
}
