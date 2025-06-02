import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalVeiculo() {
  const [totalVeiculos, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/veiculo');
      setTotal(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar total de veiculo", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { totalVeiculos, refetchVeiculos: fetchData };
}
