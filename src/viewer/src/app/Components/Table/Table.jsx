'use client'
import { useState, useEffect } from "react"
import axios from "axios";

export default function tabela({rota}) {

    const [dataTabela, setDataTabela] = useState([])
        async function lerBDTabela () {
            try {
                const response = await axios.get(`http://localhost:3001/${rota}`)
                setDataTabela(response.data)
                console.log(response.data)
                return []
            } catch (err) {
                console.error(err)
                return []
            }
        }   
    useEffect (()=> {
        lerBDTabela()
    },[])
      
    if (dataTabela.length === 0) return <p>Sem dataTabela.</p>;

    const colunas = Object.keys(dataTabela[0]); // Pega as chaves do primeiro item
  
    return (

        <>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${colunas.length}, minmax(0, 1fr))` }}>
        {/* cabeçalho */}
        {colunas.map((coluna) => (
          <div key={`header-${coluna}`} className="font-bold border p-1">
            {coluna}
          </div>
        ))}
      
        {/* linhas */}
        {dataTabela.map((item, i) => (
            <div key={i} className="contents">
            {colunas.map((coluna) => (
                <div key={`${i}-${coluna}`} className="border p-1">
                {item[coluna]}
              </div>
            ))}
          </div>
        ))}
      </div>
        </>
    );
}