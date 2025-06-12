import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalResponsaveis() {
  const [totalResponsaveis, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/responsavel');
      setTotal(response.data.length);

    } catch (error) {
      console.log("Erro ao buscar total de responsavel", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { totalResponsaveis, refetchResponsaveis: fetchData };
}
