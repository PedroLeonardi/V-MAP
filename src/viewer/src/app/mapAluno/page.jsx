'use client'

import MapWrapper from '../Components/MapaRota/MapWrapper';
import { useState } from 'react';




export default function MapPage() {
  
  const [acaoAluno, setAcaoAluno] = useState([])
  
  
  return (
    <main>
      <h1>Mapa Aluno </h1>
      
      <div className='h-100 w-[50%]'>
      <MapWrapper />
      </div>
    </main>
  );
}