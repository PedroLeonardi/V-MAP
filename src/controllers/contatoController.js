import contato from "../models/contatoModels.js"

const sendMensage = async (req,res)=>{
    try {
        await contato.create(req.body.mensagem)
        res.status(201).json({mensagem: "Mensagem enviado com sucesso"})
    } catch (err) {
        res.status(500).json({mensagem:"Não foi possivel enviar a mensagem"})
        console.error("Houve um erro ao envair a mensagem: ",err)
    }
}

const readMensage = async (req,res )=> {
    try {
        const data = await contato.getAll()
        res.status(200).json({mensagem: data })
    } catch (err) {
        console.error("Houve um erro ao exibir as mensagens: ", err)
        res.status(500).json({mensagem: "Houve um erro ao exibir as mensagens"})
    }
}

const readMensageByStatus = async (req,res)=> {
    try {
        const data = await contato.getAllByStatus(req.params.status)
        res.status(200).json({mensagem: data})
    } catch (err) {
        console.error("Houve um erro ao exibir as mensagens: ", err)
        res.status(500).json({mensagem: "Houve um erro ao exibir as mensagens"})
    }
}

const updateMensageStatus = async (req,res)=> {
    try {
        const data = await contato.update(req.params.id)
        res.status(200).json({mensagem: "Status alterado"})
    } catch (err) {
        console.error("Houve um erro ao exibir as mensagens: ", err)
        res.status(500).json({mensagem: "Houve um erro ao exibir as mensagens"})
    }
}

export default {readMensage, sendMensage, readMensageByStatus, updateMensageStatus};