import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalContatos(shouldFetch) {
  const [totalContatos, setTotalContatos] = useState(0);

  useEffect(() => {
    const fetchTotalContatos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/contato');
        setTotalContatos(response.data.length);
      } catch (err) {
        console.error("Erro ao buscar total de Contatos", err);
      }
    };

    if (shouldFetch) {
      fetchTotalContatos();
    }
  }, [shouldFetch]);

  return totalContatos;
}