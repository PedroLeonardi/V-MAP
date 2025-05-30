import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalAlunos() {
  const [totalAlunos, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/aluno');
      setTotal(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar total de alunos", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { totalAlunos, refetchAlunos: fetchData };
}
