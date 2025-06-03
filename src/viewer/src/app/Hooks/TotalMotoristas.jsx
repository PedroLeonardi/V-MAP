import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalMotorista() {
  const [totalMotorista, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/motorista');
      setTotal(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar total de motorista", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { totalMotorista, refetchMotoristas: fetchData };
}
