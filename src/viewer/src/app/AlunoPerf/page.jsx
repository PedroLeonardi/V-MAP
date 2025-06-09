export default function alunoPerf() {
    return (
        <main className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-500 flex items-center justify-center p-4">
            <div
                className="bg-opacity-10 backdrop-blur-md rounded-xl p-6 w-full max-w-3xl shadow-xl h-145 sm:h-110 -mt-15 sm:-mt-0"
                style={{ background: 'linear-gradient(to right, #1E1E1E, #1E1E1E, #595959, #595959, #848484)' }}
            >
                <h1 className="text-white text-2xl font-bold mb-4 text-center sm:hidden">Minhas informações</h1>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                    <img
                        className="w-24 h-24 block sm:hidden md:block md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full object-cover"
                        src="/Perfil.png"
                        alt="Perfil"
                    />
                    <form className="flex-1 w-full max-w-md sm:max-w-sm md:max-w-md">
                        <div className="mb-4">
                            <label className="block text-white text-base sm:text-lg font-semibold mb-1" htmlFor="nome">
                                Nome do aluno
                            </label>
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Ex: João Silva"
                                defaultValue="João Silva"
                                readOnly
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-base sm:text-lg font-semibold mb-1" htmlFor="descricaoAluno">
                                Descrição do aluno
                            </label>
                            <textarea
                                id="descricaoAluno"
                                name="descricaoAluno"
                                placeholder="Ex: Aluno dedicado e participativo"
                                defaultValue="Aluno dedicado, participativo, gosta de matemática e robótica."
                                readOnly
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-base sm:text-lg font-semibold mb-1" htmlFor="descricaoEscola">
                                Descrição da escola
                            </label>
                            <textarea
                                id="descricaoEscola"
                                name="descricaoEscola"
                                placeholder="Ex: Escola Municipal do Saber"
                                defaultValue="Escola Municipal do Saber, localizada em São Paulo, com foco em inovação e inclusão."
                                readOnly
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="mt-4 bg-gradient-to-r from-gray-600 to-gray-800 hover:invert text-white px-4 py-2 rounded text-base sm:text-lg transition cursor-pointer"
                            >
                                Mudar dados?
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
