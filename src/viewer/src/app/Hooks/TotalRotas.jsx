import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalRotas() {
  const [totalRotas, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/rota');
      setTotal(response.data.length);
    } catch (error) {
      console.log("Erro ao buscar total de rotas", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { totalRotas, refetchRotas: fetchData };
}
