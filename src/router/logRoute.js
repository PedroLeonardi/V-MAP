import express from "express";
import log from '../controllers/logController.js';
const router = express.Router();

router.post('/onibus', log.sendLonOnibus)
router.post('/aluno', log.sendLogAluno)
router.get('/alunoAll/', log.readLogAlunos)
router.get('/aluno/:cpf', log.readLogAlunosByCpf)
router.get('/alunoLast/:cpf', log.readLogAlunosLast)



export default router