'use client';

export default function ModalForm({ modalRef, onClose, onSubmit, formData, setFormData }) {
  function formatarCPF(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length <= 3) return valor;
    if (valor.length <= 6) return valor.replace(/(\d{3})(\d)/, '$1.$2');
    if (valor.length <= 9) return valor.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }
    return (
        <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-gray-900 rounded-lg p-6 w-full max-w-md relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl font-bold cursor-pointer"
                    aria-label="Fechar modal"
                    type="button"
                >
                    ×
                </button>
                <h2 className="text-white text-xl mb-4 font-semibold">Atualizar dados</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nome" className="text-gray-300 block mb-1">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="text-gray-300 block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="cpf" className="text-gray-300 block mb-1">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            value={formData.cpf}
                            onChange={(e) => setFormData({ ...formData, cpf: formatarCPF(e.target.value) })}
                            maxLength={14} 
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                    </div>

                    <div>
                        <label htmlFor="mensagem" className="text-gray-300 block mb-1">Mensagem</label>
                        <textarea
                            id="mensagem"
                            value={formData.mensagem}
                            onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                            rows={3}
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition cursor-pointer"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
