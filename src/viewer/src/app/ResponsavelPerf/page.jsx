export default function ResponsavelPerf() {
    return (
        <main className="bg-gradient-to-r from-gray-900 to-gray-500 h-screen">
            <div className=""><img className="w-190 pt-30 pl-20" src="/Perfil.png" alt="Perfil" /></div>
            <div><h1 className="absolute ml-170 -mt-80 text-white text-6xl">Nome do Resposavel</h1></div>
            <div><h2 className="absolute ml-170 -mt-55 text-white text-5xl">Descrição do responsavel</h2></div>
            <div><h3 className="absolute ml-170 -mt-35 text-white text-3xl">Descrição dos alunos</h3></div>
            <div><button className="absolute ml-170 -mt-15 rounded bg-gradient-to-r from-gray-600 to-gray-800 cursor-pointer hover:invert w-60"><p className="text-white text-2xl ">Mudar dados?</p></button></div>
        </main>
    )
}