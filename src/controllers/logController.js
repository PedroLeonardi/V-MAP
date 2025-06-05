import log from "../Models/logModels.js"

const sendLonOnibus = async (req,res)=>{
    try {
        await log.createLogOnibus(req.body)
        res.status(201).json({mensagem: "LOG enviado com sucesso"})
    } catch (err) {
        res.status(500).json({mensagem:"Não foi possivel enviar a LOG"})
        console.error("Houve um erro ao LOG a mensagem: ",err)
    }
}

const sendLogAluno = async (req, res) =>{
    try {
        await log.createLogAluno(req.body)
        res.status(201).json({mensagem: "LOG enviado com sucesso"})
    } catch (err) {
        res.status(500).json({mensagem:"Não foi possivel enviar a LOG"})
        console.error("Houve um erro ao LOG a mensagem: ",err)
    }
}

export default {sendLonOnibus, sendLogAluno}