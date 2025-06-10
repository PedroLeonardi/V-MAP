import log from "../models/logModels.js"

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

const readLogAlunos = async (req, res) =>{
    try {
        const data = await log.readLogAlunos()
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({mensagem:"Não foi possivel ler a LOG"})
        console.error("Houve um erro ao ler o LOG da mensagem: ",err)
    }
}

const readLogAlunosLast = async (req, res) =>{
    try {
        const data = await log.readLogAlunosLast(req.params.cpf)

        if(!data)
            {
            res.status(404).json({mensagem: 'log com cpf do aluno não encontrado'})
            return
        }
        res.status(200).json( data)
    } catch (err) {
        res.status(500).json({mensagem:"Não foi possivel ler a LOG"})
        console.error("Houve um erro ao ler o LOG da mensagem: ",err)
    }
}

const readLogAlunosByCpf = async (req, res) =>{
    try {
        const data = await log.readLogAlunosByCpf(req.params.cpf)

        if(!data)
            {
            res.status(404).json({mensagem: 'log com cpf do aluno não encontrado'})
            return
        }
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({mensagem:"Não foi possivel ler a LOG"})
        console.error("Houve um erro ao ler o LOG da mensagem: ",err)
    }
}

const readLogAdmin = async (req, res) =>{
    try {
        const data = await log.readLogAdmim()
        if (!data) {return res.status(404).json({menssagem:'Não existe Logs'})}
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({mensagem:"Não foi possivel ler a LOG"})
        console.error("Houve um erro ao ler o LOG da mensagem: ",err)
    }
}

const readViewResponsavel = async (req, res) =>{
    try {
        const data = await log.readViewResponsavel(req.params.cpf)
        if (!data) {return res.status(404).json({menssagem:'Não existe Logs'})}
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({mensagem:"Não foi possivel ler a LOG"})
        console.error("Houve um erro ao ler o LOG da mensagem: ",err)
    }
}


export default {sendLonOnibus, sendLogAluno, readLogAlunos, readLogAlunosLast, readLogAlunosByCpf, readLogAdmin, readViewResponsavel}
