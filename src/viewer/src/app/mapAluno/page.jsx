'use client'

import axios from 'axios';
import MapWrapper from '../Components/MapaRota/MapWrapper';
import { use, useEffect, useState } from 'react';




export default function MapPage() {
  
  const [acaoAluno, setAcaoAluno] = useState('')
  const [cpf_user, setCpf_user] = useState('')
  const [coordenada, setCoordenada] = useState('')


  
useEffect(()=> {

  setCpf_user(localStorage.getItem("cpf_User"))
  let local = JSON.parse(localStorage.getItem('currentLocation'));
  setCoordenada(local)                                               
  
}, [])

  useEffect(() => {
    const fetchAcaoAluno = async () => {
      try {
        const response = await axios.get('http://localhost:3001/log/alunoLast/000.000.000-00');
        const acao = response.data.evento;
        if (acao === 'subir') {
          setAcaoAluno('descer');
        } else if (acao === 'descer') {
          setAcaoAluno('subir');
        }
      } catch (err) {
        console.log('Erro ao buscar ação do aluno:', err);
      }
    };

    fetchAcaoAluno();
  }, []);  useEffect(() => {
    const fetchAcaoAluno = async () => {
      try {
        const response = await axios.get('http://localhost:3001/log/alunoLast/000.000.000-00');
        const acao = response.data.evento;
        if (acao === 'subir') {
          setAcaoAluno('descer');
        } else if (acao === 'descer') {
          setAcaoAluno('subir');
        }
      } catch (err) {
        console.log('Erro ao buscar ação do aluno:', err);
      }
    };

    fetchAcaoAluno();
  }, []); 


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
      
      .catch(err => console.log('Houve um erro ao enviar o Log (Front)',err))
    }
  
  
  return (
    <main>
      <h1>Mapa Aluno </h1>
      <div className='h-100 mb-10 w-[50%]'>
      <MapWrapper />
      </div>
      <button className='bg-red-500 border' onClick={ ()=> {sendLog(), inverterAcao()}} >{acaoAluno}</button>
    </main>
  );
}