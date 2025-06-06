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
    <div></div>
<div className="grid grid-cols-[1fr_700px_1fr] gap-4 items-center h-full">
  <button onClick={() => setSelectedIndex(prev => prev + 1)}>Mais</button>
  <MapComponent selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
  <button onClick={() => setSelectedIndex(prev => prev - 1)}>Menos</button>
</div>
    
    </>
  )
}
