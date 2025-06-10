'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function MapWrapper() {
  const logEnabledRef = useRef(false);
  const [rotaAtual, setRotaAtual] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(1);

  useEffect(() => {
    const rotaAtualChange = async () => {
      const saved = await localStorage.getItem('rotaAtual');
      if (saved !== null) {
        const rotaSalva = Number(saved);
        setRotaAtual(rotaSalva);
        const savedIndex = localStorage.getItem(`currentIndex_rota_${rotaSalva}`);
        if (savedIndex !== null) {
          setSelectedIndex(Number(savedIndex));
        }
      }
    };
    rotaAtualChange();
  }, []);

  useEffect(() => {
    localStorage.setItem('rotaAtual', rotaAtual.toString());
    window.dispatchEvent(new Event('rotaAtualChanged'));
  }, [rotaAtual]);

  useEffect(() => {
    localStorage.setItem(`currentIndex_rota_${rotaAtual}`, selectedIndex);
  }, [selectedIndex, rotaAtual]);

  const handleNext = () => {
    logEnabledRef.current = true;
    setSelectedIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    logEnabledRef.current = true;
    setSelectedIndex(prev => Math.max(prev - 1, 0));
  };

  const handleChangeRota = () => {
    const novaRota = rotaAtual === 1 ? 2 : 1;
    setRotaAtual(novaRota);
    setSelectedIndex(1); 
  };

  return (
   
    <div className="relative w-full h-full">
     
      <MapComponent selectedIndex={selectedIndex} logEnabledRef={logEnabledRef} />

     
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={handleChangeRota}
          className="bg-slate-900/70 backdrop-blur-sm border border-slate-600 text-slate-200 font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-sky-500 hover:border-sky-500 transition-colors duration-200"
        >
          Alternar para Rota {rotaAtual === 1 ? 2 : 1}
        </button>
      </div>
     
    </div>
  );
}