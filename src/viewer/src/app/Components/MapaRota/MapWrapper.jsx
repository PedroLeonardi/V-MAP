'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Importa o componente de mapa desabilitando SSR
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function MapWrapper() {
    const [selectedIndex, setSelectedIndex] = useState(0)
  return ( 
    <>
    <div className='mb-10'>
        <button onClick={() => setSelectedIndex(selectedIndex+1)}>mais</button>
        <button onClick={() => setSelectedIndex(selectedIndex-1)}>menos</button>

    </div>
  <MapComponent selectedIndex={selectedIndex} />
    </>
  )
}
