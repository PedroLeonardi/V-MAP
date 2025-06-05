'use client'

import axios from 'axios';
import MapWrapper from '../Components/MapaRota/MapWrapper';
import { use, useEffect, useState } from 'react';




export default function MapPage() {
  
  const [acaoAluno, setAcaoAluno] = useState('subir')
  const [cpf_user, setCpf_user] = useState('')
  const [coordenada, setCoordenada] = useState('')

  
  
useEffect(()=> {

  setCpf_user(localStorage.getItem("cpf_User"))
  let local = JSON.parse(localStorage.getItem('currentLocation'));
  setCoordenada(local)

  
}, [])

    const inverterAcao = () =>{
      if(acaoAluno=== 'subir'){setAcaoAluno('descer')} else if (acaoAluno=== 'descer'){setAcaoAluno('subir')}

  
    }

    const sendLog = async () => {
      axios.post('http://localhost:3001/log/aluno', {
        cpf_user: cpf_user,
        id_rota_onibus: 1,
        evento: acaoAluno,
        lat: coordenada[0],
        lgt: coordenada[1]
      })
      .then(response=> console.log(response))
      .catch(err => console.error('Houve um erro ao enviar o Log (Front)',err))
    }
  
  
  return (
    <main>
      <h1>Mapa Aluno </h1>
      <button onClick={ ()=> {sendLog(), inverterAcao()}} >Clique aqui para salvar o log</button>
      <div className='h-100 w-[50%]'>
      <MapWrapper />
      </div>
    </main>
  );
}