import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalAdm() {
  const [totalAdm, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin');
      setTotal(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar total de administradores", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { totalAdm, refetchAdm: fetchData };
}
