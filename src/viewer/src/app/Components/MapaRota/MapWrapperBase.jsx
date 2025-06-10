'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function MapWrapper({ logEnabledRef, children }) {
  const [rotaAtual, setRotaAtual] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0); 

  useEffect(() => {
    const loadMapStateFromLocalStorage = () => {
      const savedRota = localStorage.getItem('rotaAtual');
      let currentRota = 1; 
      if (savedRota !== null) {
        currentRota = Number(savedRota);
      }
      setRotaAtual(currentRota); 

      const savedIndex = localStorage.getItem(`currentIndex_rota_${currentRota}`);
      if (savedIndex !== null) {
        setSelectedIndex(Number(savedIndex));
      }
    };
    loadMapStateFromLocalStorage();
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
    setSelectedIndex(0);
  };

  return (
    <>
      <MapComponent selectedIndex={selectedIndex} logEnabledRef={logEnabledRef} />
      {children && (
        <div className="flex justify-between w-full mt-4 max-w-5xl md:max-w-6xl lg:max-w-7xl">
          {children({ handlePrevious, handleNext })}
        </div>
      )}
    </>
  );
}