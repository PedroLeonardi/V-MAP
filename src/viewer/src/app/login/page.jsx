'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function login() {
  const [doc, setDoc] = useState('');

  function handleDocChange(e) {
    let value = e.target.value.replace(/\D/g, ''); //bloqueia (ou exclui) o que nao for numero

    if (value.length <= 11) {
      // Defini o que seria um cpf, que é 11 digitos no maximo CPF: 000.000.000-00
      //aqui atribui as diferenças, a cada 3 numeros ele gera um ponto e no fim o traço
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      setDoc(value.slice(0, 14)); // aqui eu limito pro tamanho máximo do cpf (contando os pontos e traços)
    } else {
      //Um else pro cpnj, dessa forma se o numero digitado passar do maximo do cpf ele "entende" que seria um cnpj e começa a tratar como tal
      //Então aqui ele vai separar os digitos por pontos e barra como um cnpj
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      setDoc(value.slice(0, 18)); // aqui eu limito ao tamanho máximo do cnpj (contando os pontos, traços e barra)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/login/bg-login.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>

      {/* Camada de sobreposição com degradê */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/70 to-blue-900/70 z-0" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
     <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0">
        <Link href="/"><img src="/login/logo-2.png" alt="Logo" className="w-60 h-40 md:w-90 md:h-55 sm:w-75 sm:h-50" /></Link>
    </div>

         <div className="bg-black/50 border border-gray-300 rounded-xl p-6 sm:p-8 w-full max-w-sm text-white shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">CPF/CNPJ</label>
              <input
                type="text"
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                value={doc}
                onChange={handleDocChange}
                maxLength={18}
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-transparent placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-[#5c83ff]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Senha</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c83ff]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-md bg-[#3a5dbf] hover:bg-[#2d50a0] transition text-white font-bold border border-gray-300 cursor-pointer"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}