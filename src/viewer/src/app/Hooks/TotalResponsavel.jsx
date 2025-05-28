import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchResponsaveis(shouldFetch) {
  const [responsaveis, setResponsaveis] = useState([]);

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const response = await axios.get('http://localhost:3001/responsavel');
        setResponsaveis(response.data);
      } catch (err) {
        console.error("Erro ao buscar responsáveis", err);
      }
    };

    if (shouldFetch) {
      fetchResponsaveis();
    }
  }, [shouldFetch]);

  return [responsaveis, setResponsaveis];
}
