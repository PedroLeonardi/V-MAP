'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import dynamic from 'next/dynamic';

// Importa o componente de mapa desabilitando SSR
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function MapWrapper() {

  // const rotaAtual = 1; // ou 2, dependendo da rota atual
  const logEnabledRef = useRef(false);
  const [rotaAtual, setRotaAtual] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(1);


  useEffect(() => {

    
    const rotaAtualChange = async () =>{

      const saved = await localStorage.getItem('rotaAtual');
      if (saved !== null) setRotaAtual(Number(saved));
      
      const savedIndex = localStorage.getItem(`currentIndex_rota_${saved ?? 0}`);
      if (savedIndex !== null) setSelectedIndex(Number(savedIndex));
    }
    rotaAtualChange()
  }, []);

  useEffect(() => {
    localStorage.setItem('rotaAtual', rotaAtual.toString());
     window.dispatchEvent(new Event('rotaAtualChanged'));
    
  }, [rotaAtual]);

  // axios.get('http://localhost:3001/aluno/cpf/000.000.000-00')

  useEffect(() => {
    localStorage.setItem(`currentIndex_rota_${rotaAtual}`, selectedIndex);
  }, [selectedIndex, rotaAtual]);
  //  Lê do localStorage depois que o componente monta no navegador
  // useEffect(() => {
  //   const saved = localStorage.getItem(`currentIndex_rota_${rotaAtual}`);
  //   if (saved !== null) {
  //     setSelectedIndex(Number(saved));
  //   }
  // }, [rotaAtual]);

  // //  Salva o selectedIndex sempre que mudar
  // useEffect(() => {
  //   localStorage.setItem(`currentIndex_rota_${rotaAtual}`, selectedIndex);
  // }, [selectedIndex, rotaAtual]);

  // Salva no localStorage quando mudar
  const handleNext = () => {
    logEnabledRef.current = true; //  ativa envio do log
    setSelectedIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    logEnabledRef.current = true; //  ativa envio do log
    setSelectedIndex(prev => Math.max(prev - 1, 0));
  };


  const handleChangeRota = () => {
    const novaRota = rotaAtual === 1 ? 2 : 1;
    setRotaAtual(novaRota);
    setSelectedIndex(0); // opcional: reiniciar a posição da nova rota
  };
  return ( 
    <>
    <div className="flex justify-center mb-4">
        <button
          onClick={handleChangeRota}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Alternar para Rota {rotaAtual === 1 ? 2 : 1}
        </button>
      </div>
<div className="grid grid-cols-[1fr_700px_1fr] gap-4 items-center h-full">
  <button onClick={handlePrevious}>Mais</button>
  <MapComponent selectedIndex={selectedIndex} logEnabledRef={logEnabledRef} />
  <button onClick={handleNext}>Menos</button>
</div>
    
    </>
  )
}
