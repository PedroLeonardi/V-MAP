export default function DashAluno() {
    return (
        <main className="h-screen bg-gradient-to-r from-gray-300 to-gray-400">
            <div className="text-black">
                <h1 className="pt-20 pl-20 text-7xl"> Bem vindo ao V-MAP</h1>
                <p className="pt-10 pl-20 text-xl">O V-MAP é um sistema feito para as escolas de Monte Azul Paulista que ajuda a <br />
                rastrear os ônibus escolares em tempo real. Com ele, a escola, os alunos e os<br /> 
                responsáveis conseguem ver onde o ônibus está, acompanhar o trajeto e ter mais<br /> 
                segurança no dia a dia. Tudo isso de forma simples, rápida e confiável.</p>
            </div>
            <div>
                <img className="pt-5 w-280 position-fixed" src="/Aluno.png" alt="aluno"></img>
            </div>
        </main>
    )
}
