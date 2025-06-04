'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importa o componente de mapa desabilitando SSR
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function MapWrapper() {

  const rotaAtual = 1; // ou 2, dependendo da rota atual

  const [selectedIndex, setSelectedIndex] = useState(0);

  // ✅ Lê do localStorage depois que o componente monta no navegador
  useEffect(() => {
    const saved = localStorage.getItem(`currentIndex_rota_${rotaAtual}`);
    if (saved !== null) {
      setSelectedIndex(Number(saved));
    }
  }, [rotaAtual]);

  // ✅ Salva o selectedIndex sempre que mudar
  useEffect(() => {
    localStorage.setItem(`currentIndex_rota_${rotaAtual}`, selectedIndex);
  }, [selectedIndex, rotaAtual]);

  // Salva no localStorage quando mudar

  return ( 
    <>
    <div className='mb-10'>
        <button onClick={() => setSelectedIndex(selectedIndex+1)}>mais</button>
        <button onClick={() => setSelectedIndex(selectedIndex-1)}>menos</button>

    </div>
  <MapComponent selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
    </>
  )
}
