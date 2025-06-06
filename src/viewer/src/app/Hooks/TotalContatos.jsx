import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchTotalContatos() {
  const [totalContato, setTotal] = useState(0);
  const [dataContato, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contato/0');
      setTotal(response.data.mensagem.length);
      setData(response.data.mensagem)
    } catch (error) {
      console.log("Erro ao buscar total de mensagens", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { dataContato, totalContato, refetchContato: fetchData };
}
