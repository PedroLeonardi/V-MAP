'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import dynamic from 'next/dynamic';

// Importa o componente de mapa desabilitando SSR
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function MapWrapper() {

  // const rotaAtual = 1; // ou 2, dependendo da rota atual
  const logEnabledRef = useRef(false);
  const [rotaAtual, setRotaAtual] = useState(1);

  const [selectedIndex, setSelectedIndex] = useState('');


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
    
     window.dispatchEvent(new Event('rotaAtualChanged'));
     
  }, [rotaAtual]);

  


  return ( 
    <>
    <div className="flex justify-center mb-4">

      </div>
<div className="flex items-center h-full w-full">

  <MapComponent selectedIndex={selectedIndex} logEnabledRef={logEnabledRef} />
  

</div>
    
    </>
  )
}
