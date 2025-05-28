import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalAlunos(shouldFetch) {
  const [totalAlunos, setTotalAlunos] = useState(0);

  useEffect(() => {
    const fetchTotalAlunos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/aluno');
        setTotalAlunos(response.data.length);
      } catch (err) {
        console.error("Erro ao buscar total de alunos", err);
      }
    };

    if (shouldFetch) {
      fetchTotalAlunos();
    }
  }, [shouldFetch]);

  return totalAlunos;
}
