import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalAlunos() {
  const [totalContato, setTotal] = useState(0);
  const [dataContato, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contato/0');
      setTotal(response.data.length);
      setData(response.data.mensagem)
    } catch (error) {
      console.error("Erro ao buscar total de mensagens", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { dataContato, totalContato, refetchContato: fetchData };
}
