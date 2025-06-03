import mapa from '../models/mapaModels.js';

const readCordenadas = async (req, res) => {
    try {
        const dataCordenadas = await mapa.readCordinates()
        res.status(200).json({mensagem:dataCordenadas})
    } catch (err) {
        res.status(500).json({mensagem:'Houve um erro ao buscar as cordenadas'})
        console.error("Houve um erro ao ler as mensagem: ", err)
    }
}

export default {readCordenadas}