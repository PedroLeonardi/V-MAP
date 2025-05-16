export default function Header() {
    return (
        <>
            <nav className="flex">
                {/* Sidebar */}
                <div className="bg-black text-white h-screen md:w-80 fixed left-0 top-0 items-center">
                    <div className="m-4 flex flex-col items-center">
                        <h1 className="text-3xl font-extrabold">DASHBOARD</h1>
                        <div className="w-full border-b border-2 border-white-500 my-2"></div>

                        <ul className="flex flex-col mt-5 text-2xl font-extrabold gap-6 w-full px-4">
                            <li className="flex items-center gap-2">
                                <img
                                    alt="Ícone Aluno"
                                    className="w-6 h-6"  
                                />
                                <a href="#" className="hover:text-gray-300 transition-colors">Aluno</a>
                            </li>                            <li><a href="#" className="hover:text-gray-300 transition-colors">Rotas</a></li>
                        </ul>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="ml-0 md:ml-80 flex-1 p-4"> 
                    Conteúdo principal aqui
                </div>
            </nav>




        </>
    )
}